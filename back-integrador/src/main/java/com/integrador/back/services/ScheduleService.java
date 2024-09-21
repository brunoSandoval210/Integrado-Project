package com.integrador.back.services;

import com.integrador.back.dtos.ScheduleCreateDTO;
import com.integrador.back.entities.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalTime;
import java.util.Date;
import java.util.Optional;

public interface ScheduleService {
//    public Page<Schedule> getSchedules(Date dateStart, Optional<String> name, Pageable pageable);
    Page<Schedule> findAll (Pageable pageable);
    Schedule save(ScheduleCreateDTO schedule);
    Optional<Schedule>update(ScheduleCreateDTO schedule, Long id);
}
