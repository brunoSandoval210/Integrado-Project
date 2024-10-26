package com.integrador.back.validation;

import com.integrador.back.model.dtos.user.UserCreateRequest;
import com.integrador.back.model.dtos.user.UserUpdateRequest;

public interface UserValid {
    void validUpdateUser(UserUpdateRequest userUpdate);
    void validEmailAndDni(String email, String dni);
    void validRegisterUser(UserCreateRequest userCreate);
}
