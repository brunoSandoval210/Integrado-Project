package com.integrador.back.repositories;

import com.integrador.back.model.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    //Busca un rol por su nombre
    Optional<Role> findByName(String name);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Role r JOIN r.users u " +
            "WHERE r.id = :id AND u.dni = :dni AND u.email = :email")
    boolean existsByIdAndUserDni(Long id, String dni, String email);
}
