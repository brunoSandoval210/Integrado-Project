package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.back.model.enums.StatusAppintmentEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cita")
public class Appointment extends Maintenance{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "cita_id")
    private Long id;

//    @JsonFormat(pattern = "yyyy-MM-dd")
//    @Column(name = "fecha_cita")
//    private LocalDate dateAppointment;

    private String statusAppointment;

    @JsonIgnoreProperties({"appointments"})
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    @OneToOne()
    @JoinColumn(name = "horario_id")
    @JsonIgnoreProperties({"appointment"})
    private Schedule schedule;

    @OneToMany(mappedBy = "appointment")
    @JsonIgnoreProperties({"appointment"})
    private List<Reschedule> reschedules;

    @OneToMany(mappedBy = "appointment")
    @JsonIgnoreProperties({"appointment"})
    private List<DetailsMedicalHistory> detailsMedicalHistory;
}
