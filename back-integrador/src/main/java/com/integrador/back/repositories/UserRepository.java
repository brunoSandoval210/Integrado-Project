package com.integrador.back.repositories;

import com.integrador.back.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    //Trae todos los usuarios paginados
    Page<User> findAll(Pageable pageable);
    //Busca un usuario por su nombre de usuario
    Optional<User> findByEmail(String email);
    //Busca un usuario por su nombre de usuario
    Optional<User> findByUsername(String username);
    //Busca un usuario por su DNI
    Optional<User> findByDni(String dni);
}
