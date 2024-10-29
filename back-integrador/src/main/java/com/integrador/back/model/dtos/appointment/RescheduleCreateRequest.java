package com.integrador.back.model.dtos.appointment;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RescheduleCreateRequest {

    private LocalDate previousDate;
    private LocalDate newDate;
    private LocalTime hourStart;
    private LocalTime hourEnd;
    private String reason;
    private Long appointmentId;
}
