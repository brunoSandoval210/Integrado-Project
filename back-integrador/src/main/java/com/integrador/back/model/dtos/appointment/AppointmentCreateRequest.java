package com.integrador.back.model.dtos.appointment;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentCreateRequest {
    private String statusAppointment;
    @NotNull(message = "El cliente es obligatorio")
    private Long userId;
    @NotNull(message = "El horario es obligatorio")
    private Long scheduleId;
}
