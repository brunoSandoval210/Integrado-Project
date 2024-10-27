package com.integrador.back.services.impl;

import com.integrador.back.model.entities.Appointment;
import com.integrador.back.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Override
    public Page<Appointment> findAllWithFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment) {

        return null;
    }
}
