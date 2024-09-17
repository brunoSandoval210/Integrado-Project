package com.integrador.back.services;

import com.integrador.back.dtos.UserCreateDTO;
import com.integrador.back.dtos.UserUpdateDTO;
import com.integrador.back.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {
    Page<User> findAll(Pageable pageable);
    Optional<User> findById(Long id);
    User save(UserCreateDTO user);
    Optional<User> update(UserUpdateDTO user, Long id);
    void deleteById(Long id);
    Page<User> findByRolId(Long id, Pageable pageable);
}

