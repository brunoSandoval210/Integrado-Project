package com.integrador.back.model.dtos.user;

import com.integrador.back.model.dtos.appointment.DetailsMedicalHistoryResponse;
import com.integrador.back.model.dtos.appointment.RescheduleResponse;
import com.integrador.back.model.dtos.filter.UserFilter;
import lombok.Data;

import java.util.List;

@Data
public class AppointmentResponse {
    private Long id;
    private String statusAppointment;
    private UserFilter user;
    private ScheduleAppointmentResponse schedule;
    private List<DetailsMedicalHistoryResponse> detailsMedicalHistory;
    private List<RescheduleResponse> reschedules;
}
