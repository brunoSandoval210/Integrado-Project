package com.integrador.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "horario")
public class Schedule {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "horario_id")
    private Long id;

    @Column(name = "fecha_inicio")
    private LocalDateTime dateStart;

    @Column(name = "fecha_fin")
    private LocalDateTime dateEnd;

    @ManyToOne
    @JsonIgnoreProperties({"schedules"})
    @JoinColumn(name = "usuario_id")
    private User user;

    @OneToOne(mappedBy = "schedule")
    @JsonIgnoreProperties({"schedule"})
    private Appointment appointment;

    @Column(name = "fecha_creacion")
    private Timestamp dateCreation;

    @Column(name = "fecha_actualizacion")
    private Timestamp dateUpdate;

    @Column(name = "status")
    private Integer status;

}
