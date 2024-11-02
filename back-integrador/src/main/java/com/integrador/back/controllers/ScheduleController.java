package com.integrador.back.controllers;

import com.integrador.back.model.dtos.schedule.ScheduleCreateRequest;
import com.integrador.back.model.dtos.schedule.ScheduleUpdateRequest;
import com.integrador.back.model.dtos.user.ScheduleAppointmentResponse;
import com.integrador.back.services.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/todos")
    public ResponseEntity<?> getSchedulesAll(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @RequestParam(required = false) LocalDate today,
                                             @RequestParam(required = false) LocalDate filterDay,
                                             @RequestParam(required = false) Long idUser,
                                             @RequestParam(required = false) Integer status,
                                             @RequestParam(required = false) String statusSchedule) {
        Pageable pageable = PageRequest.of(page, size);
        try {
            Page<ScheduleAppointmentResponse> schedules = scheduleService.getSchedulesAll(pageable, today, filterDay, idUser, status, statusSchedule);
            return ResponseEntity.status(HttpStatus.OK).body(schedules);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<?> saveSchedule(
            @Valid @RequestBody ScheduleCreateRequest scheduleCreateRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            Optional<ScheduleAppointmentResponse> scheduleResponse = scheduleService.saveSchedule(scheduleCreateRequest);
            if (scheduleResponse.isPresent()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(scheduleResponse.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo crear el horario");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(scheduleService.toggleStatus(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error inesperado: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@Valid @RequestBody ScheduleUpdateRequest scheduleUpdateRequest, @PathVariable Long id, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
        try {
            return ResponseEntity.status(HttpStatus.OK).body(scheduleService.updateSchedule(scheduleUpdateRequest, id).get());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + e.getMessage());
        }
    }
}
