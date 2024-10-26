package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario")
@ToString
public class User extends Maintenance implements UserDetails{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "usuario_id")
    private Long id;

    @Size(max = 50)
    @Column(name = "nombre")
    private String name;

    @Size(max = 50)
    @Column(name = "apellido")
    private String lastname;

    @Size(max = 50)
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @Size(max = 100)
    @Column(name = "password")
    private String password;

    @Size(max = 8)
    @Column(name = "dni", unique = true)
    private String dni;

    @ManyToOne()
    @JsonIgnoreProperties({"users"})
    @JoinColumn(name = "rol_id")
    private Role role;

    @ManyToOne()
    @JoinColumn(name = "especializacion_id")
    @JsonIgnoreProperties({"users"})
    private Specialization specialization;


    @Size(max = 50)
    private String username;

    @Column(name = "numero_colegiatura")
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }

}
