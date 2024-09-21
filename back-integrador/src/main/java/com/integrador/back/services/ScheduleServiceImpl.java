package com.integrador.back.services;

import com.integrador.back.dtos.ScheduleCreateDTO;
import com.integrador.back.entities.Schedule;
import com.integrador.back.entities.User;
import com.integrador.back.repositories.ScheduleRepository;
import com.integrador.back.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ScheduleServiceImpl implements ScheduleService{
    private ScheduleRepository scheduleRepository;
    private UserRepository userRepository;

    public ScheduleServiceImpl(
            ScheduleRepository scheduleRepository,
            UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public Page<Schedule> findAll (Pageable pageable){
        if(scheduleRepository.findAll().isEmpty()){
            throw new IllegalArgumentException("No hay turnos registrados");
        }
        return scheduleRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public Schedule save(ScheduleCreateDTO schedule){
        validateSchedule(schedule);
        Schedule schedule1 = new Schedule();
        mapDtoSchedule(schedule, schedule1);
        return scheduleRepository.save(schedule1);

    }

    @Transactional
    @Override
    public Optional<Schedule> update(ScheduleCreateDTO schedule,Long id){
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(id);
        if(optionalSchedule.isPresent()){
            validateSchedule(schedule);
            Schedule schedule1 = optionalSchedule.get();
            mapDtoSchedule(schedule, schedule1);
            return Optional.of(scheduleRepository.save(schedule1));
        }else{
            throw new IllegalArgumentException("Turno no encontrado");
        }
    }

    private void mapDtoSchedule (ScheduleCreateDTO scheduleCreateDTO, Schedule schedule){
        schedule.setDateStart(scheduleCreateDTO.getDateStart());
        schedule.setDateEnd(scheduleCreateDTO.getDateEnd());
        schedule.setUser(getUser(scheduleCreateDTO.getDni()));
        schedule.setHourStart(scheduleCreateDTO.getHourStart());
        schedule.setHourEnd(scheduleCreateDTO.getHourEnd());
    }

    private User getUser(String dni){
        Optional<User>optionalUser=userRepository.findByDni(dni);
        if(optionalUser.isPresent()){
            if(optionalUser.get().getRole().getId()!=1){
                throw new IllegalArgumentException("El usuario no es un doctor");
            }
            return optionalUser.get();
        }else{
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }

    private void validateSchedule(ScheduleCreateDTO scheduleDTO) {
        if (scheduleDTO.getHourEnd().isBefore(scheduleDTO.getHourStart())) {
            throw new IllegalArgumentException("La hora de inicio no puede ser mayor a la hora de fin");
        }

        // Verificar si ya existe un turno con la misma fecha de inicio y hora
        if (scheduleRepository.findByDateStartAndHourStartAndUser_Dni(
                scheduleDTO.getDateStart(),
                scheduleDTO.getHourStart(),
                scheduleDTO.getDni()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un turno en ese horario");
        }

        // Verificar si ya existe un turno con la misma fecha de inicio, fin y hora
        if (scheduleRepository.findByDateStartAndDateEndAndHourStartAndHourEndAndUser_Dni(
                scheduleDTO.getDateStart(),
                scheduleDTO.getDateEnd(),
                scheduleDTO.getHourStart(),
                scheduleDTO.getHourEnd(),
                scheduleDTO.getDni()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un turno en ese horario");
        }
    }
}
