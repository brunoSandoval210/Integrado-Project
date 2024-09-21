package com.integrador.back.services;

import com.integrador.back.entities.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {
    Page<Appointment> findAllByUserEmail(Pageable pageable,String email);
}
