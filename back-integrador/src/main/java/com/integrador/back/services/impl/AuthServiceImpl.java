package com.integrador.back.services.impl;

import com.integrador.back.auth.AuthResponse;
import com.integrador.back.auth.JwtService;
import com.integrador.back.config.RandomCodeGenerator;
import com.integrador.back.model.dtos.LoginRequest;
import com.integrador.back.model.dtos.PasswordUpdateRquest;
import com.integrador.back.model.entities.HistoryRecuperation;
import com.integrador.back.model.entities.User;
import com.integrador.back.repositories.HistoryRecuperationRepository;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.services.AuthService;
import com.integrador.back.services.EmailService;
import com.integrador.back.validation.PasswordValid;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final HistoryRecuperationRepository historyRecuperationRepository;
    private final RandomCodeGenerator randomCodeGenerator;
    private final EmailService emailService;
    private final PasswordValid passwordValid;


    @Transactional
    @Override
    public Map<String, String> recuperarContrasena(String email) throws IOException, MessagingException {
        passwordValid.validUser(email);
        Optional<User> user = userRepository.findByEmail(email);
        String code = randomCodeGenerator.generateRandomCode(5);
        String token = jwtService.getToken(user.get());

        StringBuilder direccionRecuperar = new StringBuilder()
                .append("http://localhost:4200/recover-password?token=")
                .append(token);
        String content = stringHtml("src/main/resources/templates/EmailRecuperacion.html")
                .replace("/url/", direccionRecuperar.toString())
                .replace("{code}", code);

        HistoryRecuperation historyRecuperation = new HistoryRecuperation();
        historyRecuperation.setCode(code);
        historyRecuperation.setUser(user.get());
        historyRecuperationRepository.save(historyRecuperation);

        emailService.sendMail(email, "Recuperar contraseña", content);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Se ha enviado un correo a su dirección de correo electrónico");
        return response;
    }

    @Transactional
    @Override
    public Map<String, String> cambiarContrasena(PasswordUpdateRquest passwordUpdate) {
        String email = jwtService.getUsernameFromToken(passwordUpdate.getToken());
        Optional<User> userUpdatePassword = userRepository.findByEmail(email);
        HistoryRecuperation codeData = historyRecuperationRepository.findByCode(passwordUpdate.getCode());

        Map<String, String> response = new HashMap<>();
        if (codeData.getCode().equals(passwordUpdate.getCode())) {
            passwordValid.isValidPassword(
                    passwordUpdate.getPassword(), passwordUpdate.getValidPassword(), email);
            userRepository.updatePassword(
                    passwordEncoder.encode(passwordUpdate.getPassword()), userUpdatePassword.get().getId());
            response.put("message", "Se ha actualizado la contraseña");
        } else {
            response.put("message", "El código no es correcto");
        }
        return response;
    }

    @Transactional
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

    private static String stringHtml(String ruta) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader in = new BufferedReader(
                new FileReader(ruta));

        in.lines().forEach(line -> builder.append(line));
        in.close();

        return builder.toString();
    }
}
