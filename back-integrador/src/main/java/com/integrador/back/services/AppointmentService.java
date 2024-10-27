package com.integrador.back.services;

import com.integrador.back.model.entities.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {
    Page<Appointment> findAllWithFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment);
}
