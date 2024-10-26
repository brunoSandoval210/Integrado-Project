package com.integrador.back.services.impl;

import com.integrador.back.auth.AuthResponse;
import com.integrador.back.auth.JwtService;
import com.integrador.back.model.dtos.LoginRequest;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails user=userRepository.findByEmail(loginRequest.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .message("Las credenciales son correctas")
                .token(token)
                .build();
    }
}
