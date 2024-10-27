package com.integrador.back.model.dtos.user;

import lombok.Data;

@Data
public class AppointmentResponse {
    private Long id;
    private String statusAppointment;
    private ScheduleAppointmentResponse schedule;
    private String detalle;
}
