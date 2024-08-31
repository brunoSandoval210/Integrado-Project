package com.integrador.back.services;

import com.integrador.back.dtos.IUser;
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
        return this.userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    @Override
    public User save(User user) {
        user.setRole(getRole(user));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Optional<User> update(UserUpdateDTO user, Long id) {
        Optional<User> userOptional=userRepository.findById(id);
        if(userOptional.isPresent()){
            //se inicializa el objeto userUpdate con el objeto userOptional
            User userUpdate=userOptional.get();
            userUpdate.setName(user.getName());
            userUpdate.setLastname(user.getLastname());
            userUpdate.setEmail(user.getEmail());
            userUpdate.setDni(user.getDni());
            userUpdate.setRole(getRole(user));
            //se retorna el objeto userUpdate
            return Optional.of(userRepository.save(userUpdate));
        }
        //se retorna un objeto vacio
        return Optional.empty();
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
