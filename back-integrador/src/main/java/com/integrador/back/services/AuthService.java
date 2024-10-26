package com.integrador.back.services;

import com.integrador.back.auth.AuthResponse;
import com.integrador.back.model.dtos.LoginRequest;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
}
