package com.integrador.back.dtos;

import com.integrador.back.entities.Role;
import com.integrador.back.entities.Specialization;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateDTO implements IUser{
    @NotEmpty(message = "El nombre no puede estar vacio")
    @Size(max = 45,message = "El nombre debe tener menos de 45 caracteres")
    private String name;

    @NotEmpty(message = "El apellido no puede estar vacio")
    @Size(max = 45,message = "El apellido debe tener menos de 45 caracteres")
    private String lastname;

    @NotEmpty(message = "El DNI no puede estar vacio")
    @Size(max = 8,message = "El DNI debe tener 8 digitos")
    private String dni;

    @NotEmpty(message = "El email no puede estar vacio")
    @Size(max = 45)
    @Email(message = "El email debe ser valido")
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacia")
    private String password;

    @Size(max = 9,message = "El numero de telefono debe tener 9 digitos")
    private String numberTuition;

    private List<Specialization> specializations;

    private boolean admin;
    private boolean doctor;
}
