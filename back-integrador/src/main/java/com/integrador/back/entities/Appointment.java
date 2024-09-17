package com.integrador.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

import static jakarta.persistence.GenerationType.IDENTITY;
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "cita")
public class Appointment {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "cita_id")
    private Long id;

    @Column(name = "fecha_cita")
    private Timestamp dateAppointment;

    @Column(name = "estado_cita")
    private Integer statusAppointment;

    @JsonIgnoreProperties({"appointments"})
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    @OneToOne()
    @JoinColumn(name = "horario_id")
    @JsonIgnoreProperties({"appointment"})
    private Schedule schedule;

    @Column(name = "fecha_creacion")
    private Timestamp dateCreation;

    @Column(name = "fecha_actualizacion")
    private Timestamp dateUpdate;

    @Column(name = "status")
    private Integer status;
}
