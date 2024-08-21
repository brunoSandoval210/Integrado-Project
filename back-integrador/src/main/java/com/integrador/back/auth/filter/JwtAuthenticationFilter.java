package com.integrador.back.auth.filter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.integrador.back.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.integrador.back.auth.TokenConfig.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(
        AuthenticationManager authenticationManager
    ){
        this.authenticationManager=authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username=null;
        String password=null;
        try{
            //Se inicializa un objeto User con los datos del request
            User user=new ObjectMapper().readValue(request.getInputStream(), User.class);
            username=user.getUsername();
            password=user.getPassword();
        }catch (StreamReadException e){
            e.printStackTrace();
        }catch(DatabindException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }
        //Se crea un objeto UsernamePasswordAuthenticationToken con los datos del usuario
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username,password);
        //Se retorna la autenticación
        return this.authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        //Se obtiene el usuario autenticado
        org.springframework.security.core.userdetails.User user=(org.springframework.security.core.userdetails.User)authResult.getPrincipal();
        String username=user.getUsername();
        //Se obtienen los roles del usuario
        Collection<? extends GrantedAuthority>roles=authResult.getAuthorities();
        //Se verifica si el usuario es administrador
        boolean isAdmin=roles.stream().anyMatch(role->role.getAuthority().equals("ROLE_ADMIN"));
        //Se verifica si el usuario es doctor
        boolean isDoctor=roles.stream().anyMatch(role->role.getAuthority().equals("ROLE_DOCTOR"));
        //Se crean los claims del token
        Claims claims= Jwts
                .claims()
                        .add("authorities",new ObjectMapper().writeValueAsString(roles))
                        .add("username",username)
                        .add("isAdmin",isAdmin)
                        .add("isDoctor",isDoctor)
                        .build();
        //Se crea el token
        String jwt=Jwts.builder()
                .subject(username)
                .claims(claims)
                .signWith(SECRET_KEY)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+3600000))
                .compact();
        //Se agrega el token al header de la respuesta
        response.addHeader(HEADER_AUTHORIZATION,PREFIX_TOKEN+jwt);
        //Se crea un objeto body con el token, el username y un mensaje
        Map<String,String>body=new HashMap<>();
        body.put("token",jwt);
        body.put("username",username);
        body.put("message",String.format("Hola %s has iniciado sesion con exito",username));
        //Se escribe el body en la respuesta
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        //Se establece el tipo de contenido de la respuesta
        response.setContentType(CONTENT_TYPE);
        //Se establece el status de la respuesta
        response.setStatus(200);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        //Se crea un objeto body con un mensaje de error
        Map<String,String> body=new HashMap<>();
        //Se escribe el body en la respuesta
        body.put("message","Error en la autenticacion del usuario y password incorecto");
        //Se escribe el mensaje de error en el body
        body.put("error",failed.getMessage());
        //Se escribe el body en la respuesta
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        //Se establece el tipo de contenido de la respuesta
        response.setContentType(CONTENT_TYPE);
        //Se establece el status de la respuesta
        response.setStatus(401);
    }
}
