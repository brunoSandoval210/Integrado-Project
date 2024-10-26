package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.back.model.enums.StatusScheduleEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "horario")
public class Schedule extends Maintenance{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "horario_id")
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha")
    private LocalDate date;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "hora_inicio")
    private LocalTime hourStart;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "hora_fin")
    private LocalTime hourEnd;

    @ManyToOne()
    @JsonIgnoreProperties({"schedules"})
    @JoinColumn(name = "usuario_id")
    private User user;

    @OneToOne(mappedBy = "schedule")
    @JsonIgnoreProperties({"schedule"})
    private Appointment appointment;

    @Enumerated(EnumType.STRING)
    private StatusScheduleEnum statusSchedule;
//    public int getDuration(){
//        int duration=0;
//        if(hourStart!=null && hourEnd!=null){
//            duration=(int) Duration.between(hourStart,hourEnd).toMinutes();
//        }
//        return duration;
//    }
}
