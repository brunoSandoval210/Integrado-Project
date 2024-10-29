package com.integrador.back.model.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.back.model.keys.DetailsMedicalHistoryId;
import jakarta.persistence.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "detalle_historial_medico")
public class DetailsMedicalHistory{

    @EmbeddedId
    private DetailsMedicalHistoryId id;

    @ManyToOne()
    @MapsId("medicalHistoryId")  // Vincula el ID embebido con la entidad MedicalHistory
    @JoinColumn(name = "historial_medico_id")
    @JsonIgnoreProperties({"detailsMedicalHistory"})
    private MedicalHistory medicalHistory;

    @ManyToOne()
    @MapsId("appointmentId")  // Vincula el ID embebido con la entidad Appointment
    @JoinColumn(name = "cita_id")
    @JsonIgnoreProperties({"detailsMedicalHistory"})
    private Appointment appointment;

    @Column(name = "detalle")
    private String detalle;
}
