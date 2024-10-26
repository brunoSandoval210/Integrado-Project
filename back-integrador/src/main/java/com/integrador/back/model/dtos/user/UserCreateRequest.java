package com.integrador.back.model.dtos.user;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {
    @NotEmpty(message = "El nombre no puede estar vacio")
    @NotNull(message = "El nombre no puede ser nulo")
    @Size(max = 45,message = "El nombre debe tener menos de 45 caracteres")
    private String name;

    @NotEmpty(message = "El apellido no puede estar vacio")
    @Size(max = 45,message = "El apellido debe tener menos de 45 caracteres")
    @NotNull(message = "El apellido no puede ser nulo")
    private String lastname;

    @NotEmpty(message = "El DNI no puede estar vacio")
    @Size(max = 8,message = "El DNI debe tener 8 digitos")
    @NotNull(message = "El DNI no puede ser nulo")
    private String dni;

    @NotEmpty(message = "El email no puede estar vacio")
    @Size(max = 45)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "El email debe ser valido")
    @NotNull(message = "El email no puede ser nulo")
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacia")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "La contraseña debe tener al menos una letra mayuscula, una letra minuscula y un numero")
    @NotNull(message = "La contraseña no puede ser nula")
    private String password;

    @Size(max = 9,message = "El numero de telefono debe tener 9 digitos")
    private String numberTuition;

    private Long role;

    private Long specialization;

    private Integer status;
}
