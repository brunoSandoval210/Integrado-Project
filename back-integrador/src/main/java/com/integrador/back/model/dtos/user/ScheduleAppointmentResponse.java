package com.integrador.back.model.dtos.user;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleAppointmentResponse {
    private Long id;
    private LocalDate date;
    private LocalTime hourStart;
    private LocalTime hourEnd;
    private String statusSchedule;
    private String doctorName;
}
