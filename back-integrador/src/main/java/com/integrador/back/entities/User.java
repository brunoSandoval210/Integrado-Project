package com.integrador.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario")
public class User{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "usuario_id")
    private Long id;

    @Size(max = 45)
    @Column(name = "nombre")
    private String name;

    @Size(max = 45)
    @Column(name = "apellido")
    private String lastname;

    @Size(max = 45)
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Size(max = 8)
    @Column(name = "dni", unique = true)
    private String dni;

    @ManyToOne()
    @JsonIgnoreProperties({"users"})
    @JoinColumn(name = "rol_id")
    private Role role;

    //@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
    @JsonIgnoreProperties({"users"})
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "usuario_especializacion",
            joinColumns = {@JoinColumn(name = "usuario_id")},
            inverseJoinColumns = {@JoinColumn(name = "especializacion_id")},
            uniqueConstraints = {@UniqueConstraint(columnNames = {"usuario_id", "especializacion_id"})}
    )
    private List<Specialization> specializations;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String username;

    @Column(name = "numero_colegiatura", nullable = true)
    private String numberTuition;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    private List<Schedule> schedules;

    @OneToOne(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    private MedicalHistory medicalHistory;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    private List<Appointment> appointments;

//    @Column(name = "fecha_creacion")
//    private Timestamp dateCreation;
//
//    @Column(name = "fecha_actualizacion")
//    private Timestamp dateUpdate;
//
//    @Column(name = "status")
//    private Integer status;

    public User(String name, String lastname, String email, String dni, String password, String numberTuition, List<Specialization> specializations, Role role) {
    }
}
