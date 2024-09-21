package com.integrador.back.controllers;

import com.integrador.back.dtos.ScheduleCreateDTO;
import com.integrador.back.entities.Schedule;
import com.integrador.back.services.ScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;


@RestController
@RequestMapping("/integrador/")
public class ScheduleController {
    private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("schedules/{page}")
    public ResponseEntity<?> findAll(@PathVariable Integer page){
        Pageable pageable = PageRequest.of(page, 10);
        Page<Schedule> schedules = scheduleService.findAll(pageable);
        if (schedules.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(schedules);
        } else {
            return ResponseEntity.ok(schedules);
        }
    }

    @PostMapping("schedule")
    public ResponseEntity<?> save (@RequestBody ScheduleCreateDTO schedule){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(scheduleService.save(schedule));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("schedule/{id}")
    public ResponseEntity<?>update(
            @PathVariable Long id,
            @RequestBody ScheduleCreateDTO schedule){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(scheduleService.update(schedule, id));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
