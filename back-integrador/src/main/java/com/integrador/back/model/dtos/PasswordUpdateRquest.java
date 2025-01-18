package com.integrador.back.model.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PasswordUpdateRquest {
    @NotNull(message = "La contraseña es requerida")
    @NotBlank(message = "La contraseña no puede tener espacios en blanco")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
    private String password;

    @NotNull(message = "Escriba la contraseña nuevamente")
    private String validPassword;

    @NotNull
    private String code;
}
