package com.integrador.back.services;


import com.integrador.back.model.dtos.schedule.ScheduleCreateRequest;
import com.integrador.back.model.dtos.schedule.ScheduleUpdateRequest;
import com.integrador.back.model.dtos.user.ScheduleAppointmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

public interface ScheduleService {
    Page<ScheduleAppointmentResponse> getSchedulesAll(
                                                Pageable pageable,
                                                LocalDateTime today,
                                                LocalDate filterDay,
                                                Long idUser,
                                                Integer status,
                                                String statusSchedule);

    Optional<ScheduleAppointmentResponse> saveSchedule(ScheduleCreateRequest scheduleCreateRequest);

    String toggleStatus(Long id);
    Optional<ScheduleAppointmentResponse> updateSchedule(ScheduleUpdateRequest scheduleUpdateRequest, Long id);
}
