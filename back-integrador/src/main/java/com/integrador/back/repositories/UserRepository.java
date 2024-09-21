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
    //Busca un usuario por su rol
    Page<User> findByRole_Id(Long id, Pageable pageable);
    //Busca un usuario por su DNI
    Optional<User> findByDni(String dni);
    //Verificar si el usuario tiene un rol en particular
    boolean existsByRole_Id(Long id);
    //Verificar si existe un usuario con el mismo DNI
    boolean existsByDni(String dni);
    //Verificar si existe un usuario con el mismo email
    boolean existsByEmail(String email);
    //Cambiar status del usuario
}
