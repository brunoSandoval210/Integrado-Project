package com.integrador.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Duration;
import java.time.LocalTime;
import java.util.Date;

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

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_inicio")
    private Date dateStart;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha_fin")
    private Date dateEnd;

    @Column(name = "hora_inicio")
    private LocalTime hourStart;

    @Column(name = "hora_fin")
    private LocalTime hourEnd;

    @ManyToOne
    @JsonIgnoreProperties({"schedules"})
    @JoinColumn(name = "usuario_id")
    private User user;

    @OneToOne(mappedBy = "schedule")
    @JsonIgnoreProperties({"schedule"})
    private Appointment appointment;


    public int getDuration(){
        int duration=0;
        if(hourStart!=null && hourEnd!=null){
            duration=(int) Duration.between(hourStart,hourEnd).toMinutes();
        }
        return duration;
    }

}
