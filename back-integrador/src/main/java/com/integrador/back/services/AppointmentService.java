package com.integrador.back.services;

import com.integrador.back.model.dtos.appointment.AppointmentCreateRequest;
import com.integrador.back.model.dtos.appointment.RescheduleCreateRequest;
import com.integrador.back.model.dtos.user.AppointmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AppointmentService {
    Page<AppointmentResponse> findAllWithFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment);
    Optional<AppointmentResponse> saveAppointment(AppointmentCreateRequest appointmentCreateRequest);
    Optional<AppointmentResponse> reprogrameAppointment(RescheduleCreateRequest rescheduleCreateRequest);
}
