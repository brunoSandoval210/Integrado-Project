package com.integrador.back.model.dtos.filter;

import lombok.Data;

@Data
public class UserFilter {
    private Long id;
    private String lastNameAndLastname;
    private String email;
    private String dni;
}
