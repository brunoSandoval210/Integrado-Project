package com.integrador.back.model.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @Size(max = 45,message = "El nombre debe tener menos de 45 caracteres")
    private String name;

    @Size(max = 45,message = "El apellido debe tener menos de 45 caracteres")
    private String lastname;

    @Size(max = 8,message = "El DNI debe tener 8 digitos")
    private String dni;

    @Size(max = 45)
    @Email(message = "El email debe ser valido")
    private String email;

    @Size(max = 9,message = "El numero de colegiatura debe tener 9 digitos")
    private String numberTuition;

    private Long role;

    private Long specialization;

    private Integer status;
}