package com.integrador.back.services;

import com.integrador.back.auth.AuthResponse;
import com.integrador.back.model.dtos.LoginRequest;
import com.integrador.back.model.dtos.PasswordUpdateRquest;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Map;

public interface AuthService {
    Map<String, String> recuperarContrasena(String email) throws IOException, MessagingException;
    ResponseEntity<?> cambiarContrasena(PasswordUpdateRquest passwordUpdate);
    AuthResponse login(LoginRequest loginRequest);
}
