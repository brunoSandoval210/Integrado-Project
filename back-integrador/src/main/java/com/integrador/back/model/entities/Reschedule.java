package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reprogramaciones")
public class Reschedule extends Maintenance{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reprogramacion_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cita_id", nullable = false)
    @JsonIgnoreProperties({"reschedules"})
    private Appointment appointment;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_anterior", nullable = false)
    private LocalDate previousDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "nueva_fecha", nullable = false)
    private LocalDate newDate;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "hora_inicio")
    private LocalTime hourStart;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "hora_fin")
    private LocalTime hourEnd;

    @Column(name = "motivo")
    private String reason;  // Motivo opcional de la reprogramación
}
