package com.integrador.back.repositories;

import com.integrador.back.model.entities.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization,Long> {
    Optional<Specialization> findByName(String name);
    // Consulta personalizada para validar por nombre de especialización y DNI del usuario
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END " +
            "FROM Specialization s JOIN s.users u " +
            "WHERE s.id = :id AND u.dni = :dni AND u.email = :email")
    boolean existsByIdAndUserDni(@Param("id") Long name,
                                   @Param("dni") String dni,
                                   @Param("email") String email);
}
