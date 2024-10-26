package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "especializacion")
public class Specialization extends Maintenance{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "especializacion_id")
    private Long id;

    @Column(name = "nombre")
    private String name;

    @OneToMany(mappedBy = "specialization")
    @JsonIgnoreProperties({"specialization"})
    private List<User> users;
}
