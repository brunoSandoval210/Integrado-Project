package com.integrador.back.services;


import com.integrador.back.model.dtos.SpecializationResponse;
import com.integrador.back.model.dtos.user.UserCreateRequest;
import com.integrador.back.model.dtos.user.UserFilter;
import com.integrador.back.model.dtos.user.UserResponse;
import com.integrador.back.model.dtos.user.UserUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {
    Optional<UserResponse> saveUser (UserCreateRequest userCreate);
    Optional<UserResponse> updateUser (UserUpdateRequest userUpdate, Long id);
    Map<String, String> toggleStatus (Long id);
    UserResponse getUserById (Long id);
    Page<UserResponse> getAllUsers (Long roleId, Pageable pageable);
    Optional<List<SpecializationResponse>> getAllSpecializations(Integer status);
    UserResponse getUserByEmail(String email);
    ResponseEntity<List<UserFilter>> getUserFilterByDni(String dni);



}

