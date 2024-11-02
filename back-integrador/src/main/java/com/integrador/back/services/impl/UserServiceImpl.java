package com.integrador.back.services.impl;

import com.integrador.back.model.dtos.user.*;
import com.integrador.back.model.entities.Specialization;
import com.integrador.back.model.entities.User;
import com.integrador.back.repositories.RoleRepository;
import com.integrador.back.repositories.SpecializationRepository;
import com.integrador.back.repositories.UserRepository;
import com.integrador.back.services.UserService;
import com.integrador.back.validation.UserValid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final SpecializationRepository specializationRepository;
    private final UserValid userValid;

    @Transactional
    @Override
    public Optional<UserResponse> saveUser(UserCreateRequest userCreate) {
        UserResponse mapper = null;
        userValid.validEmailAndDni(userCreate.getEmail(), userCreate.getDni());
        User user = modelMapper.map(userCreate, User.class);
        user.setRole(userCreate.getRole() != null
                ?roleRepository.findById(userCreate.getRole())
                        .orElseThrow(()->new IllegalArgumentException("No se encontró el rol: "+userCreate.getRole()))
                :roleRepository.findById(2L)
                        .orElseThrow(()->new IllegalArgumentException("No se encontró el rol: "+userCreate.getRole())));
        user.setSpecialization(userCreate.getSpecialization() != null
                ?specializationRepository.findById(userCreate.getSpecialization())
                        .orElseThrow(()->new IllegalArgumentException("No se encontró el rol: "+userCreate.getRole()))
                :null);
        user.setUsername(userCreate.getEmail());
        user.setPassword(passwordEncoder.encode(userCreate.getPassword()));
        user.setStatus(userCreate.getStatus()!=null
                ?userCreate.getStatus()
                :1);
        user.setNumberTuition(userCreate.getNumberTuition() !=null
                ?userCreate.getNumberTuition()
                :null);
        user = userRepository.save(user);
        mapper = modelMapper.map(user, UserResponse.class);
        mapper.setStatus(user.getStatus() == 1 ? "ACTIVO" : "INACTIVO");
        return Optional.ofNullable(mapper);

    }

    @Transactional
    @Override
    public Optional<UserResponse> updateUser(UserUpdateRequest userUpdate, Long id) {
        User userOptional=userRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("No se encontró el usuario con el id: "+id));
        modelMapper.map(userUpdate,userOptional);
        userOptional.setRole(userOptional.getRole() != null?
                roleRepository.findById(userUpdate.getRole())
                        .orElseThrow(()->new IllegalArgumentException("No se encontró el rol: "+userUpdate.getRole()))
                :null);
        if (userUpdate.getSpecialization() != null) {
            userOptional.setSpecialization(specializationRepository.findById(userUpdate.getSpecialization())
                    .orElseThrow(() -> new IllegalArgumentException("La especialización ingresada no existe")));
        } else {
            userOptional.setSpecialization(null);
        }
        userOptional.setUsername(userUpdate.getEmail());

        userOptional.setNumberTuition(userUpdate.getNumberTuition() != null
                ?userUpdate.getNumberTuition()
                :null);
        userOptional=userRepository.save(userOptional);
        UserResponse mapper = modelMapper.map(userOptional, UserResponse.class);
        mapper.setStatus(userOptional.getStatus() == 1 ? "ACTIVO" : "INACTIVO");
        return Optional.ofNullable(mapper);
    }

    @Override
    @Transactional
    public Map<String, String> toggleStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + id));
        user.setStatus(user.getStatus() == 0?1:0 == 1?1:0);
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", user.getStatus() == 1 ? "Se activo el usuario" : "Se elimino el usuario");
        return response;
    }

    @Transactional(readOnly = true)
    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario con el id: " + id));
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        if (user.getRole().getId() == 2) {
            // Obtener y mapear las citas del usuario a AppointmentResponse
            List<AppointmentResponse> appointmentResponses = user.getAppointments().stream()
                    .map(appointment -> {
                        AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
                        // Mapear Schedule a ScheduleAppointmentResponse
                        ScheduleAppointmentResponse scheduleResponse = modelMapper.map(
                                appointment.getSchedule(), ScheduleAppointmentResponse.class);
                        // Setear el Schedule en la cita
                        scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " +
                                appointment.getSchedule().getUser().getLastname());
                        scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
                        appointmentResponse.setSchedule(scheduleResponse);
                        return appointmentResponse;
                    })
                    .collect(Collectors.toList());

            // Setear la lista de AppointmentResponse en UserResponse
            userResponse.setAppointments(appointmentResponses);
        }
        if (user.getRole().getId() == 3){
            List<ScheduleResponse> scheduleResponses = user.getSchedules().stream()
                    .map(schedule -> {
                        ScheduleResponse scheduleResponse = modelMapper.map(schedule, ScheduleResponse.class);
                        return scheduleResponse;
                    })
                    .collect(Collectors.toList());
            userResponse.setSchedules(scheduleResponses);
        }
        return userResponse;
    }

    @Transactional(readOnly = true)
    @Override
    public Page<UserResponse> getAllUsers(Long roleId, Pageable pageable) {
        Page<User> users;
        if (roleId == 0 || roleId == null) {
            users = userRepository.findAll(pageable);
        } else {
            users = userRepository.findAll(pageable, roleId);
        }

        Page<UserResponse> userResponses = users.map(user -> {
            // Mapear User a UserResponse
            UserResponse userResponse = modelMapper.map(user, UserResponse.class);
            if (roleId == 2) {
                // Obtener y mapear las citas del usuario a AppointmentResponse
                List<AppointmentResponse> appointmentResponses = user.getAppointments().stream()
                        .map(appointment -> {
                            AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
                            // Mapear Schedule a ScheduleAppointmentResponse
                            ScheduleAppointmentResponse scheduleResponse = modelMapper.map(
                                    appointment.getSchedule(), ScheduleAppointmentResponse.class);
                            // Setear el Schedule en la cita
                            scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " +
                                    appointment.getSchedule().getUser().getLastname());
                            scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
                            appointmentResponse.setSchedule(scheduleResponse);
                            return appointmentResponse;
                        })
                        .collect(Collectors.toList());

                // Setear la lista de AppointmentResponse en UserResponse
                userResponse.setAppointments(appointmentResponses);
            }
            if (roleId == 3) {
                List<ScheduleResponse> scheduleResponses = user.getSchedules().stream()
                        .map(schedule -> {
                            ScheduleResponse scheduleResponse = modelMapper.map(schedule, ScheduleResponse.class);
                            return scheduleResponse;
                        })
                        .collect(Collectors.toList());
                userResponse.setSchedules(scheduleResponses);
            }

            return userResponse;
        });

        return userResponses;
    }

    @Transactional(readOnly = true)
    public Optional<List<Specialization>> getAllSpecializations(Integer status) {
        return Optional.of(specializationRepository.findAllByStatus(status));
    }

    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el usuario : " + email));
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);

        if (user.getRole() != null && user.getRole().getId() == 2) {
            userResponse.setAppointments(mapAppointments(user));
        }

        if (user.getRole() != null && user.getRole().getId() == 3) {
            userResponse.setSchedules(mapSchedules(user));
        }

        return userResponse;
    }

    private List<AppointmentResponse> mapAppointments(User user) {
        return user.getAppointments().stream()
                .map(appointment -> {
                    AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
                    ScheduleAppointmentResponse scheduleResponse = modelMapper.map(appointment.getSchedule(), ScheduleAppointmentResponse.class);
                    scheduleResponse.setDoctorName(appointment.getSchedule().getUser().getName() + " " + appointment.getSchedule().getUser().getLastname());
                    scheduleResponse.setSpecialty(appointment.getSchedule().getUser().getSpecialization().getName());
                    appointmentResponse.setSchedule(scheduleResponse);
                    return appointmentResponse;
                })
                .collect(Collectors.toList());
    }

    private List<ScheduleResponse> mapSchedules(User user) {
        return user.getSchedules().stream()
                .map(schedule -> modelMapper.map(schedule, ScheduleResponse.class))
                .collect(Collectors.toList());
    }
}
