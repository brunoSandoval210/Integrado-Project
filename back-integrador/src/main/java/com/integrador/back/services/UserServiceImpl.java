package com.integrador.back.services;

import com.integrador.back.dtos.IUser;
import com.integrador.back.dtos.UserCreateDTO;
import com.integrador.back.dtos.UserUpdateDTO;
import com.integrador.back.entities.Role;
import com.integrador.back.entities.User;
import com.integrador.back.repositories.RolRepository;
import com.integrador.back.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private RolRepository rolRepository;
    private PasswordEncoder passwordEncoder;

    //Se injecta las dependencias
    public UserServiceImpl(
            UserRepository userRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder
    ){
        this.userRepository=userRepository;
        this.rolRepository=rolRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Transactional(readOnly = true)
    @Override
    public Page<User> findAll(Pageable pageable) {
        if(this.userRepository.findAll().isEmpty()){
            throw new IllegalArgumentException("No hay usuarios registrados");
        }
        return this.userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    @Override
    public User save(UserCreateDTO user) {
        if(userRepository.existsByDni(user.getDni())){
            throw new IllegalArgumentException("El DNI ya esta registrado");
        }
        if(userRepository.existsByEmail(user.getEmail())){
            throw new IllegalArgumentException("El email ya esta registrado");
        }
        String password=passwordEncoder.encode(user.getPassword());
        User newUser = new User();
        mapDtoToUser(user, newUser);
        newUser.setPassword(password);
        return userRepository.save(newUser);
    }

    @Transactional
    @Override
    public Optional<User> update(UserUpdateDTO user, Long id) {
        Optional<User> userOptional=userRepository.findById(id);
        if(userOptional.isPresent()){
            //se obtiene el objeto user
            User userUpdate=userOptional.get();
            mapDtoToUser(user,userUpdate);
            //se retorna el objeto userUpdate
            return Optional.of(userRepository.save(userUpdate));
        }
        //se retorna un objeto vacio
        return Optional.empty();
    }

    @Transactional
    @Override
    public void deleteByDni(String dni) {
        if(userRepository.existsByDni(dni)){
            userRepository.deleteByDni(dni);
        } else{
            throw new IllegalArgumentException("El usuario no existe");
        }
    }

    @Transactional(readOnly = true)
    @Override
    public Page<User> findByRolId(Long id, Pageable pageable) {
        if(userRepository.findByRole_Id(id,pageable).isEmpty()){
            throw new IllegalArgumentException("No hay usuarios registrados con ese rol");
        }
        return userRepository.findByRole_Id(id,pageable);
    }

    private void mapDtoToUser(IUser userDTO, User user) {
        user.setName(userDTO.getName());
        user.setLastname(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setDni(userDTO.getDni());
        user.setNumberTuition(userDTO.getNumberTuition());
        user.setSpecializations(userDTO.getSpecializations());
        user.setRole(getRole(userDTO));
    }

    private Role getRole(IUser user) {
        String rolename = user.isAdmin() ? "ROLE_ADMIN" : user.isDoctor() ? "ROLE_DOCTOR" : "ROLE_USER";
        Optional<Role> optionalRole = rolRepository.findByName(rolename);
        return optionalRole.orElseGet(() -> {
            Role role = new Role();
            role.setName(rolename);
            return rolRepository.save(role);
        });
    }
}
