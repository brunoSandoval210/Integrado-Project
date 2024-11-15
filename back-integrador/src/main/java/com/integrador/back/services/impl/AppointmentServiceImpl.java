package com.integrador.back.services.impl;

import com.integrador.back.model.dtos.appointment.AppointmentCreateRequest;
import com.integrador.back.model.dtos.appointment.DetailsMedicalHistoryResponse;
import com.integrador.back.model.dtos.appointment.RescheduleCreateRequest;
import com.integrador.back.model.dtos.appointment.RescheduleResponse;
import com.integrador.back.model.dtos.filter.UserFilter;
import com.integrador.back.model.dtos.user.AppointmentResponse;
import com.integrador.back.model.dtos.user.ScheduleAppointmentResponse;
import com.integrador.back.model.entities.Appointment;
import com.integrador.back.model.entities.Reschedule;
import com.integrador.back.repositories.AppointmentRepository;
import com.integrador.back.repositories.RescheduleRepository;
import com.integrador.back.repositories.ScheduleRepository;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.services.AppointmentService;
import com.integrador.back.services.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final RescheduleRepository rescheduleRepository;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    @Override
    public Page<AppointmentResponse> findAllWithFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment) {
        Page<Appointment> appointments = appointmentRepository.findAllByFilters(pageable, idUser, status, statusAppointment);
        return appointments.map(appointment -> {
            AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
            // Mapear Schedule a ScheduleAppointmentResponse
            ScheduleAppointmentResponse scheduleResponse = modelMapper.map(
                    appointment.getSchedule(), ScheduleAppointmentResponse.class);
            // Setear el Schedule en la cita
            scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " +
                    appointment.getSchedule().getUser().getLastname());
            scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
            appointmentResponse.setSchedule(scheduleResponse);
            //Setear los detalles de la historia médica
            List<DetailsMedicalHistoryResponse> detailsMedicalHistoryResponses = appointment.getDetailsMedicalHistory().stream()
                    .map(detailsMedicalHistory -> modelMapper.map(detailsMedicalHistory, DetailsMedicalHistoryResponse.class))
                    .collect(Collectors.toList());
            appointmentResponse.setDetailsMedicalHistory(detailsMedicalHistoryResponses);
            UserFilter userResponse = modelMapper.map(appointment.getUser(), UserFilter.class);
            userResponse.setLastNameAndLastname(appointment.getUser().getName() + " " + appointment.getUser().getLastname());
            appointmentResponse.setUser(userResponse);
            return appointmentResponse;
        });
    }

    @Transactional
    @Override
    public Optional<AppointmentResponse> saveAppointment(AppointmentCreateRequest appointmentCreateRequest) throws IOException,MessagingException {
        if (appointmentCreateRequest == null){
            throw new IllegalArgumentException("La cita no puede ser nula");
        }
        System.out.println(appointmentCreateRequest);
        Appointment appointment = modelMapper.map(appointmentCreateRequest, Appointment.class);
        appointment.setUser(appointmentCreateRequest.getUserId() != null ?
                userRepository.findById(appointmentCreateRequest.getUserId()).orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + appointmentCreateRequest.getUserId())) : null);
        appointment.setSchedule(appointmentCreateRequest.getScheduleId() != null ?
                scheduleRepository.findById(appointmentCreateRequest.getScheduleId()).orElseThrow(() -> new IllegalArgumentException("No se encontró el horario con el id: " + appointmentCreateRequest.getScheduleId())) : null);
        appointment.getSchedule().setStatusSchedule("RESERVADO");
        appointment.setStatus(1);
        appointment = appointmentRepository.save(appointment);
        String appointmentDate=appointment.getSchedule().getDate().toString();
        String appointmentTime=appointment.getSchedule().getHourStart().toString()+ " - "+appointment.getSchedule().getHourEnd().toString();
        String specialistName=appointment.getSchedule().getUser().getName()+" "+appointment.getSchedule().getUser().getLastname()+" "+appointment.getSchedule().getUser().getSpecialization().getName();


        String content=stringHtml("src/main/resources/templates/ConfirmacionEmail.html")
                .replace("{appointmentDate}",appointmentDate)
                .replace("{appointmentTime}",appointmentTime)
                .replace("{specialistName}",specialistName);

        emailService.sendMail(appointment.getUser().getEmail(),"Confirmacion cita",content);

        AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
        UserFilter userResponse = modelMapper.map(appointment.getUser(), UserFilter.class);
        userResponse.setLastNameAndLastname(appointment.getUser().getName() + " " + appointment.getUser().getLastname());
        appointmentResponse.setUser(userResponse);
        ScheduleAppointmentResponse scheduleResponse = modelMapper.map(appointment.getSchedule(), ScheduleAppointmentResponse.class);
        scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " + appointment.getSchedule().getUser().getLastname());
        scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
        appointmentResponse.setSchedule(scheduleResponse);
        return Optional.of(appointmentResponse);
    }

    @Transactional
    @Override
    public Optional<AppointmentResponse> reprogrameAppointment(RescheduleCreateRequest rescheduleCreateRequest) {
        if (rescheduleCreateRequest == null){
            throw new IllegalArgumentException("La reprogramación no puede ser nula");
        }

        Appointment appointment = appointmentRepository.findById(rescheduleCreateRequest.getAppointmentId())
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la cita con el id: " + rescheduleCreateRequest.getAppointmentId()));

        System.out.println(appointment);
        if (rescheduleRepository.existsReschedule(
                rescheduleCreateRequest.getAppointmentId(),
                rescheduleCreateRequest.getNewDate(),
                rescheduleCreateRequest.getHourStart(),
                rescheduleCreateRequest.getHourEnd()
        )){
            throw new IllegalArgumentException("Ya existe una reprogramación con la misma fecha y hora");
        }
        if (scheduleRepository.existsByDateAndHourStartAndHourEndAndUser_Id(
                rescheduleCreateRequest.getNewDate(),
                rescheduleCreateRequest.getHourStart(),
                rescheduleCreateRequest.getHourEnd(),
                appointment.getSchedule().getUser().getId()
        )){
            throw new IllegalArgumentException("Ya existe un horario con la misma fecha y hora");
        }
        if (scheduleRepository.existsOverlappingSchedule(
                appointment.getSchedule().getUser().getId(),
                rescheduleCreateRequest.getNewDate(),
                rescheduleCreateRequest.getHourStart(),
                rescheduleCreateRequest.getHourEnd()
        )){
            throw new IllegalArgumentException("El horario se superpone con a la hora de otro horario");
        }
        if (rescheduleCreateRequest.getNewDate().isBefore(LocalDate.now())){
            throw new IllegalArgumentException("La fecha no puede ser menor a la fecha actual");
        }
        if (rescheduleCreateRequest.getHourStart().isAfter(rescheduleCreateRequest.getHourEnd())){
            throw new IllegalArgumentException("La hora de inicio no puede ser mayor a la hora de fin");
        }

        if (rescheduleRepository.countByAppointmentId(rescheduleCreateRequest.getAppointmentId()) >= 3){
            throw new IllegalArgumentException("La cita no puede ser reprogramada mas de 3 veces");
        }

        AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
        UserFilter userResponse = modelMapper.map(appointment.getUser(), UserFilter.class);
        userResponse.setLastNameAndLastname(appointment.getUser().getName() + " " + appointment.getUser().getLastname());
        appointmentResponse.setUser(userResponse);

        ScheduleAppointmentResponse scheduleResponse = modelMapper.map(appointment.getSchedule(), ScheduleAppointmentResponse.class);
        scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " + appointment.getSchedule().getUser().getLastname());
        scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
        appointmentResponse.setSchedule(scheduleResponse);
        Reschedule reschedule = modelMapper.map(rescheduleCreateRequest, Reschedule.class);
        reschedule.setAppointment(appointment);
        reschedule = rescheduleRepository.save(reschedule);
        RescheduleResponse rescheduleResponse = modelMapper.map(reschedule, RescheduleResponse.class);
        List<RescheduleResponse> reschedulesResponse = appointmentResponse.getReschedules();
        reschedulesResponse.add(rescheduleResponse);
        appointmentResponse.setReschedules(reschedulesResponse);
        return Optional.of(appointmentResponse);
    }

    private static String stringHtml(String ruta) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader in = new BufferedReader(
                new FileReader(ruta));

        in.lines().forEach(line -> builder.append(line));
        in.close();

        return builder.toString();
    }
}
