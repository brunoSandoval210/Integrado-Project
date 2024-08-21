package com.integrador.back.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UserUpdateDTO implements IUser{
    @NotEmpty
    @Size(max = 45)
    private String name;
    @Size(max = 45)
    private String lastname;
    @Size(max = 8)
    private String dni;
    @Size(max = 45)
    @Email
    private String email;
    private boolean admin;
    private boolean doctor;
}