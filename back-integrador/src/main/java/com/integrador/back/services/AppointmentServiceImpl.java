package com.integrador.back.services;

import com.integrador.back.entities.Appointment;
import com.integrador.back.repositories.AppointmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    private AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public Page<Appointment> findAllByUserEmail(Pageable pageable, String email) {
        if(this.appointmentRepository.findAllByUser_Email(email,pageable).isEmpty()){
            throw new IllegalArgumentException("No hay citas registradas");
        }
        return appointmentRepository.findAllByUser_Email(email,pageable);
    }
}
