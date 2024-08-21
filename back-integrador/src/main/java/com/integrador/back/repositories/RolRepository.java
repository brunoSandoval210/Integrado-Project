package com.integrador.back.repositories;

import com.integrador.back.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Role,Long> {
    //Busca un rol por su nombre
    Optional<Role> findByName(String name);
}
