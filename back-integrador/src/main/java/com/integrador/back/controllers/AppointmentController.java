package com.integrador.back.controllers;

import com.integrador.back.model.dtos.appointment.AppointmentCreateRequest;
import com.integrador.back.model.dtos.appointment.RescheduleCreateRequest;
import com.integrador.back.services.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/confiltros")
    public ResponseEntity<?> getAppointmentsWithFilters(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long idUser,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) String statusAppointment
    ) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        try{
            return ResponseEntity.ok(appointmentService.findAllWithFilters(pageable, idUser, status, statusAppointment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error inesperado: " + e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> registerAppointment(@Valid @RequestBody AppointmentCreateRequest appointmentCreateRequest,  BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            List<String> errors= bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            return ResponseEntity.ok(appointmentService.saveAppointment(appointmentCreateRequest));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error inesperado: " + e.getMessage());
        }
    }

    @PostMapping("/reprogramar")
    public ResponseEntity<?> rescheduleAppointment(@Valid @RequestBody RescheduleCreateRequest rescheduleCreateRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            List<String> errors= bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            return ResponseEntity.ok(appointmentService.reprogrameAppointment(rescheduleCreateRequest));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error inesperado: " + e.getMessage());
        }
    }
}
