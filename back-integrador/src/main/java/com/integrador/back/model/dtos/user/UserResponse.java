package com.integrador.back.model.dtos.user;

import com.integrador.back.model.dtos.RoleResponse;
import com.integrador.back.model.dtos.SpecializationResponse;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String dni;
    private String numberTuition;
    private RoleResponse role;
    private SpecializationResponse specialization;
    private String status;
    private List<ScheduleResponse> schedules;
    private List<AppointmentResponse> appointments;
}
