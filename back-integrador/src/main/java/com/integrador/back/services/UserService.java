package com.integrador.back.services;


import com.integrador.back.model.dtos.user.UserCreateRequest;
import com.integrador.back.model.dtos.user.UserResponse;
import com.integrador.back.model.dtos.user.UserUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {
    Optional<UserResponse> saveUser (UserCreateRequest userCreate);
    Optional<UserResponse> updateUser (UserUpdateRequest userUpdate, Long id);
    String toggleStatus (Long id);
    UserResponse getUserById (Long id);
    Page<UserResponse> getAllUsers (Long roleId, Pageable pageable);

}

