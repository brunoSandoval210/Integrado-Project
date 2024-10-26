package com.integrador.back.model.dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
