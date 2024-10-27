package com.integrador.back.model.dtos.schedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleCreateRequest {
    @NotNull(message = "La fecha del horario es obligatoria")
    private LocalDate date;

    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime hourStart;

    @NotNull(message = "La hora de fin es obligatoria")
    private LocalTime hourEnd;

    @NotBlank(message = "El estado del horario es obligatorio")
    @Size(max = 50, message = "El estado del horario no puede tener más de 50 caracteres")
    private String statusSchedule;

    @NotNull(message = "El doctor es obligatorio")
    private Long doctorId;
}
