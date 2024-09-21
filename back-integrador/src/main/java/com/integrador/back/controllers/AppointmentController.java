package com.integrador.back.controllers;


import com.integrador.back.entities.Appointment;
import com.integrador.back.services.AppointmentService;
import com.integrador.back.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/integrador/appointment/")
public class AppointmentController {

    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("{email}")
    public ResponseEntity<?> findAllByUserEmail(@PathVariable String email) {
        Pageable pageable = PageRequest.of(0, 10);
        try{
            Page<Appointment> appointments = appointmentService.findAllByUserEmail(pageable, email);
            return ResponseEntity.ok(appointments);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
