package com.integrador.back.model.dtos.schedule;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleUpdateRequest {
    private LocalDate date;

    private LocalTime hourStart;

    private LocalTime hourEnd;

    @Size(max = 50, message = "El estado del horario no puede tener más de 50 caracteres")
    private String statusSchedule;

    private Long doctorId;

    private Integer status;
}
