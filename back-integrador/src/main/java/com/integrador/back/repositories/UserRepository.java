package com.integrador.back.repositories;

import com.integrador.back.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    //Trae todos los usuarios paginados
    @Query(value = "SELECT * FROM usuario WHERE status = 1",
            countQuery = "SELECT count(*) FROM usuario WHERE status = 1",
            nativeQuery = true)
    Page<User> findAll(Pageable pageable);
    //Busca un usuario por su nombre de usuario
    Optional<User> findByEmail(String email);
    //Busca un usuario por su rol
    Page<User> findByRole_Id(Long id, Pageable pageable);
    //Busca un usuario por su DNI
    Optional<User> findByDni(String dni);
    //Eliminar un usuario mediante dni
    @Modifying
    @Query(value = "update usuario " +
            "SET status = CASE " +
            "WHEN status = 1 THEN 0 " +
            "ELSE 1 " +
            "END " +
            "WHERE dni = ?1",
            nativeQuery = true)
    void deleteByDni(String dni);
    //Verificar si el usuario tiene un rol en particular
    boolean existsByRole_Id(Long id);
    //Verificar si existe un usuario con el mismo DNI
    boolean existsByDni(String dni);
    //Verificar si existe un usuario con el mismo email
    boolean existsByEmail(String email);
    //Cambiar status del usuario
}
