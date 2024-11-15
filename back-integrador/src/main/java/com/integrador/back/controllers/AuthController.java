package com.integrador.back.controllers;

import com.integrador.back.model.dtos.LoginRequest;
import com.integrador.back.model.dtos.PasswordUpdateRquest;
import com.integrador.back.services.AuthService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/recuperarContrasena/{email}")
    public ResponseEntity<?> recuperarContrasena(@PathVariable String email)
            throws MessagingException, IOException {

        return ResponseEntity.ok(authService.recuperarContrasena(email));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/cambiarContrasena")
    public ResponseEntity<?> cambiarContrasena(@RequestBody PasswordUpdateRquest password) {
        return ResponseEntity.ok(authService.cambiarContrasena(
                password));
    }
}
