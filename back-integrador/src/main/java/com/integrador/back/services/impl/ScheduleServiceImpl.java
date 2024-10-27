package com.integrador.back.services.impl;

import com.integrador.back.model.dtos.schedule.ScheduleCreateRequest;
import com.integrador.back.model.dtos.schedule.ScheduleUpdateRequest;
import com.integrador.back.model.dtos.user.ScheduleAppointmentResponse;
import com.integrador.back.model.entities.Schedule;
import com.integrador.back.model.entities.User;
import com.integrador.back.repositories.ScheduleRepository;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.services.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Transactional(readOnly = true)
    @Override
    public Page<ScheduleAppointmentResponse> getSchedulesAll(Pageable pageable, LocalDateTime today, LocalDate filterDay, Long idUser, Integer status, String statusSchedule) {
        Page<Schedule> schedules = scheduleRepository.findSchedules(pageable, today, filterDay, idUser, status, statusSchedule);
        Page<ScheduleAppointmentResponse> schedulesResponse= schedules.map(schedule -> {
            ScheduleAppointmentResponse scheduleAppointmentResponse = modelMapper.map(schedule, ScheduleAppointmentResponse.class);
            scheduleAppointmentResponse.setDoctorName(
                    schedule.getUser().getName() + " " + schedule.getUser().getLastname());
            scheduleAppointmentResponse.setSpecialty(schedule.getUser().getSpecialization().getName());
            return scheduleAppointmentResponse;
        });
        return schedulesResponse;
    }

    @Transactional
    @Override
    public Optional<ScheduleAppointmentResponse> saveSchedule(ScheduleCreateRequest scheduleCreateRequest) {
        User user=userRepository.findById(scheduleCreateRequest.getDoctorId()).orElseThrow(
                ()->new IllegalArgumentException("No se encontró al doctor con id: "+scheduleCreateRequest.getDoctorId())
        );
        if (user.getRole().getId() == 2 && user.getStatus() == 1){
            throw new IllegalArgumentException("El usuario no es un doctor");
        }
        if (user.getStatus() ==1 && user.getSpecialization() !=null){
            if (scheduleRepository.existsByDateAndHourStartAndHourEndAndUser_Id(
                    scheduleCreateRequest.getDate(),
                    scheduleCreateRequest.getHourStart(),
                    scheduleCreateRequest.getHourEnd(),
                    scheduleCreateRequest.getDoctorId()
            )){
                throw new IllegalArgumentException("Ya existe un horario con la misma fecha y hora");
            }
            if (scheduleRepository.existsOverlappingSchedule(
                    scheduleCreateRequest.getDoctorId(),
                    scheduleCreateRequest.getDate(),
                    scheduleCreateRequest.getHourStart(),
                    scheduleCreateRequest.getHourEnd()
            )){
                throw new IllegalArgumentException("El horario se superpone con a la hora de otro horario");
            }
            if (scheduleCreateRequest.getDate().isBefore(LocalDate.now())){
                throw new IllegalArgumentException("La fecha no puede ser menor a la fecha actual");
            }
            if (scheduleCreateRequest.getHourStart().isAfter(scheduleCreateRequest.getHourEnd())){
                throw new IllegalArgumentException("La hora de inicio no puede ser mayor a la hora de fin");
            }
            Schedule schedule = modelMapper.map(scheduleCreateRequest, Schedule.class);
            schedule.setUser(user);
            schedule.setStatus(1);
            schedule = scheduleRepository.save(schedule);
            ScheduleAppointmentResponse scheduleResponse = modelMapper.map(schedule, ScheduleAppointmentResponse.class);
            scheduleResponse.setDoctorName(
                    schedule.getUser().getName() + " " + schedule.getUser().getLastname());
            scheduleResponse.setSpecialty(schedule.getUser().getSpecialization().getName());
            return Optional.ofNullable(scheduleResponse);
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public String toggleStatus(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el horario con el id: " + id));
        schedule.setStatus(schedule.getStatus() == 0?1:0 == 1?1:0);
        scheduleRepository.save(schedule);
        return schedule.getStatus()== 1? "Se activo el horaio": "Se elimino el horario";
    }

    @Transactional
    @Override
    public Optional<ScheduleAppointmentResponse> updateSchedule(ScheduleUpdateRequest scheduleUpdateRequest, Long id) {
        User user=userRepository.findById(scheduleUpdateRequest.getDoctorId()).orElseThrow(
                ()->new IllegalArgumentException("No se encontró al doctor con id: "+scheduleUpdateRequest.getDoctorId())
        );
        if (user.getRole().getId() == 2 && user.getStatus() == 1){
            throw new IllegalArgumentException("El usuario no es un doctor");
        }
        if (user.getStatus() ==1 && user.getSpecialization() !=null){
            if (scheduleRepository.existsByDateAndHourStartAndHourEndAndUser_Id(
                    scheduleUpdateRequest.getDate(),
                    scheduleUpdateRequest.getHourStart(),
                    scheduleUpdateRequest.getHourEnd(),
                    scheduleUpdateRequest.getDoctorId()
            )){
                throw new IllegalArgumentException("Ya existe un horario con la misma fecha y hora");
            }
            if (scheduleRepository.existsOverlappingSchedule(
                    scheduleUpdateRequest.getDoctorId(),
                    scheduleUpdateRequest.getDate(),
                    scheduleUpdateRequest.getHourStart(),
                    scheduleUpdateRequest.getHourEnd()
            )){
                throw new IllegalArgumentException("El horario se superpone con a la hora de otro horario");
            }
            if (scheduleUpdateRequest.getDate().isBefore(LocalDate.now())){
                throw new IllegalArgumentException("La fecha no puede ser menor a la fecha actual");
            }
            if (scheduleUpdateRequest.getHourStart().isAfter(scheduleUpdateRequest.getHourEnd())){
                throw new IllegalArgumentException("La hora de inicio no puede ser mayor a la hora de fin");
            }
            Schedule schedule = scheduleRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("No se encontró el horario con el id: " + id));
            modelMapper.map(scheduleUpdateRequest, Schedule.class);
            schedule.setUser(user);
            schedule.setStatus(scheduleUpdateRequest.getStatus());
            schedule = scheduleRepository.save(schedule);
            ScheduleAppointmentResponse scheduleResponse = modelMapper.map(schedule, ScheduleAppointmentResponse.class);
            scheduleResponse.setDoctorName(
                    schedule.getUser().getName() + " " + schedule.getUser().getLastname());
            scheduleResponse.setSpecialty(schedule.getUser().getSpecialization().getName());
            return Optional.ofNullable(scheduleResponse);
        }
        return Optional.empty();
    }
}
