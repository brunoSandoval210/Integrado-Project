package com.integrador.back.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.back.auth.SimpleGrantedAuthorityJsonCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static com.integrador.back.auth.TokenConfig.*;

public class JwtValidationFilter extends BasicAuthenticationFilter {
    public JwtValidationFilter(
        AuthenticationManager authenticationManager
    ){
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        //Se obtiene el header de la petición
        String header=request.getHeader(HEADER_AUTHORIZATION);
        //Se verifica si el header es nulo o no comienza con el prefijo del token
        if(header == null || !header.startsWith(PREFIX_TOKEN)){
            chain.doFilter(request,response);
            return;
        }
        //Se obtiene el token de la petición
        String token=header.replace(PREFIX_TOKEN,"");
        //Se verifica si el token es valido
        try{
            Claims claims= Jwts
                            .parser()
                            .verifyWith(SECRET_KEY)
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();
            //Se obtiene el nombre de usuario
            String username=claims.getSubject();
            //Se obtienen los roles del usuario
            Object authoritiesClaims=claims.get("authorities");
            //Se obtienen los roles del usuario
            Collection<?extends GrantedAuthority>roles= Arrays.asList(new ObjectMapper()
                    .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                    .readValue(authoritiesClaims.toString().getBytes(),SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username,null,roles);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            chain.doFilter(request,response);
        } catch (JwtException e){
            Map<String,String> body=new HashMap<>();
            body.put("error",e.getMessage());
            body.put("message","El token no es valido");
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401);
            response.setContentType(CONTENT_TYPE);
        }
    }
}
