package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Role extends Maintenance{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "rol_id")
    private Long id;

    @Column(name = "nombre")
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonIgnoreProperties({"role"})
    private List<User> users;
}