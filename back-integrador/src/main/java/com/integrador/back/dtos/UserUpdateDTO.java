package com.integrador.back.dtos;

import com.integrador.back.entities.Specialization;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO implements IUser{
    @Size(max = 45,message = "El nombre debe tener menos de 45 caracteres")
    private String name;

    @Size(max = 45,message = "El apellido debe tener menos de 45 caracteres")
    private String lastname;

    @Size(max = 8,message = "El DNI debe tener 8 digitos")
    private String dni;

    @Size(max = 45)
    @Email(message = "El email debe ser valido")
    private String email;

    private String password;

    private List<Specialization> specializations;

    @Size(max = 9,message = "El numero de telefono debe tener 9 digitos")
    private String numberTuition;

    private boolean admin;
    private boolean doctor;
}