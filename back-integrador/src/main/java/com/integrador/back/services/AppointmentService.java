package com.integrador.back.services;

import com.integrador.back.model.dtos.appointment.AppointmentCreateRequest;
import com.integrador.back.model.dtos.appointment.RescheduleCreateRequest;
import com.integrador.back.model.dtos.user.AppointmentResponse;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface AppointmentService {
    Page<AppointmentResponse> findAllWithFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment);
    Optional<AppointmentResponse> saveAppointment(AppointmentCreateRequest appointmentCreateRequest) throws IOException,MessagingException;
    Optional<AppointmentResponse> reprogrameAppointment(RescheduleCreateRequest rescheduleCreateRequest);
}
