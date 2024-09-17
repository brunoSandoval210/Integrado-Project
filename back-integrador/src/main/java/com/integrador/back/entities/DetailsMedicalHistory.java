package com.integrador.back.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "detalle_historial_medico")
public class DetailsMedicalHistory {

    @Id
    @ManyToOne
    @JoinColumn(name = "historial_medico_id")
    private MedicalHistory medicalHistory;

    @Id
    @ManyToOne
    @JoinColumn(name = "cita_id")
    private Appointment apoointment;

    @Column(name = "detalle")
    private String detalle;

    @Column(name = "fecha_creacion")
    private Timestamp dateCreation;

    @Column(name = "fecha_actualizacion")
    private Timestamp dateUpdate;

    @Column(name = "status")
    private Integer status;
}
