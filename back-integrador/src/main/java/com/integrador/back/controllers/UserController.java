package com.integrador.back.controllers;

import com.integrador.back.model.dtos.user.UserCreateRequest;
import com.integrador.back.model.dtos.user.UserResponse;
import com.integrador.back.model.dtos.user.UserUpdateRequest;
import com.integrador.back.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateRequest user, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            Optional<UserResponse> savedUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser.get());
        } catch (IllegalArgumentException e) {
            // Devolver el mensaje de la excepción
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Manejar cualquier otra excepción inesperada
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateRequest user,@PathVariable Long id ,BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            Optional<UserResponse> updateUser = userService.updateUser(user,id);
            return ResponseEntity.status(HttpStatus.OK).body(updateUser.get());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        try {
            String status = userService.toggleStatus(id);
            return ResponseEntity.status(HttpStatus.OK).body(status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserResponse user = userService.getUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
    @GetMapping("/todos")
    public ResponseEntity<?> getAllUsers(@RequestParam Long roleId,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        try {
            Page<UserResponse> users = userService.getAllUsers(roleId, pageable);
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
}
