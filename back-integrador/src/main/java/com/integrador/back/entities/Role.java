package com.integrador.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Role {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "rol_id")
    private Long id;

    @Column(name = "nombre")
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonIgnoreProperties({"role"})
    private List<User> users;

    @Column(name = "fecha_creacion")
    private Timestamp dateCreation;

    @Column(name = "fecha_actualizacion")
    private Timestamp dateUpdate;

    @Column(name = "status")
    private Integer status;
}