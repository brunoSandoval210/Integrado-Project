package com.integrador.back.repositories;

import com.integrador.back.model.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT U FROM User U " +
            "WHERE (:roleId IS NULL OR U.role.id = :roleId)")
    Page<User> findAll(Pageable pageable,
                       @Param("roleId") Long roleId);

    Page<User> findAllByStatus(int status, Pageable pageable);

    Optional<User> findByEmail(String email);

    //Busca un usuario por su DNI
    Optional<User> findByDni(String dni);

    @Modifying
    @Query(value = "UPDATE usuario "
            + "SET "
            + "status = 1 "
            + "WHERE usuario_id like :dni", nativeQuery = true)
    void toggleStatusByDni(String dni);

    boolean existsByDniAndStatus(String dni, int status);

    boolean existsByEmail(String email);

    boolean existsByDni(String dni);

    boolean existsByNameAndLastnameAndEmailAndDni(String name, String lastname, String email, String dni);

    @Modifying
    @Query("UPDATE User u SET u.password = :password WHERE u.id = :userId")
    @Transactional
    void updatePassword(String password, Long userId);
}
