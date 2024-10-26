package com.integrador.back.validation.impl;

import com.integrador.back.model.dtos.user.UserCreateRequest;
import com.integrador.back.model.dtos.user.UserUpdateRequest;
import com.integrador.back.repositories.RoleRepository;
import com.integrador.back.repositories.SpecializationRepository;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.validation.UserValid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserValidation implements UserValid {

    private final UserRepository userRepository;
    private final SpecializationRepository specializationRepository;
    private final RoleRepository roleRepository;

    // Validación para actualización de usuarios en el módulo de mantenimiento
    @Override
    public void validUpdateUser(UserUpdateRequest userUpdate) {
        if (userRepository.existsByNameAndLastnameAndEmailAndDni(
                userUpdate.getName(), userUpdate.getLastname(),
                userUpdate.getEmail(), userUpdate.getDni())) {
            throw new IllegalArgumentException("El usuario ya está registrado");
        }
    }

    @Override
    public void validEmailAndDni(String email, String dni) {
        validateCommonFields(email, dni);
    }

    // Validación para registro de usuario en el login
    @Override
    public void validRegisterUser(UserCreateRequest userCreate) {
        validateCommonFields(userCreate.getEmail(), userCreate.getDni());
        validateSpecialization(userCreate.getSpecialization(), userCreate.getDni(), userCreate.getEmail());
        validateRole(userCreate.getRole(), userCreate.getDni(), userCreate.getEmail());
    }

    // Método reutilizable para validar campos comunes (name, lastname, email y dni)
    private void validateCommonFields(String email, String dni) {
        if (userRepository.existsByEmail(email) || userRepository.existsByDni(dni)) {
            throw new IllegalArgumentException("El email o DNI ya están registrados");
        }
    }

    // Validación de la especialización del usuario
    private void validateSpecialization(Long specializationId, String dni, String email) {
        if (specializationRepository.existsByIdAndUserDni(specializationId, dni, email)) {
            throw new IllegalArgumentException("El doctor ya está creado con esa especialización");
        }
    }

    // Validación del rol del usuario
    private void validateRole(Long roleid, String dni, String email) {
        if (roleRepository.existsByIdAndUserDni(roleid, dni, email)) {
            throw new IllegalArgumentException("El usuario ya tiene ese rol asignado");
        }
    }
}
