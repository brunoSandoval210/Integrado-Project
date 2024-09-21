package com.integrador.back.controllers;

import com.integrador.back.dtos.UserCreateDTO;
import com.integrador.back.dtos.UserUpdateDTO;
import com.integrador.back.entities.User;
import com.integrador.back.services.UserService;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("integrador/")
public class UserController {
    private UserService userService;

    public UserController(
            UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("users/{page}")
    public ResponseEntity<?> listPageable(@PathVariable Integer page){
        Pageable pageable= PageRequest.of(page,10);
        try{
            Page<User> users=userService.findAll(pageable);
            return ResponseEntity.ok(users);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("users/{roleId}/{page}")
    public ResponseEntity<?> listPageableClient(@PathVariable Long roleId,@PathVariable Integer page){
        Pageable pageable= PageRequest.of(page,10);
        try{
            Page<User> users=userService.findByRolId(roleId,pageable);
            return ResponseEntity.ok(users);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("user/{id}")
    public ResponseEntity<?> show(@PathVariable Long id){
        Optional<User> user=userService.findById(id);
        if(user.isPresent()){
            //Se retorna un 200 porque se encontro el usuario
            return ResponseEntity.status(HttpStatus.OK).body(user.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error","El usuario no se encontro por el id: "+id));
    }

    @PostMapping("user")
    public ResponseEntity<?> create(@Valid @RequestBody UserCreateDTO user, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        try {
            User newUser = userService.save(user);
            //Se retorna un 201 porque se creo el usuario
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserUpdateDTO user,
                                    @PathVariable Long id,
                                    BindingResult result){
        if(result.hasErrors()){
            return validation(result);
        }
        Optional<User>optionalUser=userService.update(user,id);
        if(optionalUser.isPresent()){
            //Se retorna un 200 porque se actualizo el usuario
            return ResponseEntity.status(HttpStatus.OK).body(optionalUser.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id){
        Optional<User> optionalUser=userService.findById(id);
        if(optionalUser.isPresent()){
            userService.deleteById(id);
            //Se retorna un 204 porque no hay contenido
            return ResponseEntity.status((HttpStatus.NO_CONTENT)).build();
        }
        //Se retorna un 404 porque no se encontro el usuario
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    private ResponseEntity<?> validation (BindingResult result){
        Map<String,String> errors=new HashMap<>();
        //Se recorre los errores y se guarda en un mapa
        result.getFieldErrors().forEach(error->{
            errors.put(error.getField(),
                    "El campo "+error.getField()+" "+error.getDefaultMessage());
        });
        //Se retorna un 400 porque hubo un error en la validacion
        return ResponseEntity.badRequest().body(errors);
    }
}