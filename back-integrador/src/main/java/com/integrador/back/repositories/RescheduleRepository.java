package com.integrador.back.repositories;

import com.integrador.back.model.entities.Reschedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;

public interface RescheduleRepository extends JpaRepository<Reschedule, Long> {

    @Query("SELECT COUNT(r) FROM Reschedule r WHERE r.appointment.id = :appointmentId")
    long countByAppointmentId(@Param("appointmentId") Long appointmentId);


    @Query("SELECT COUNT(r) > 0 FROM Reschedule r " +
            "WHERE r.appointment.id = :appointmentId " +
            "AND r.newDate = :newDate " +
            "AND ((:hourStart = r.hourStart AND :hourEnd = r.hourEnd))")
    boolean existsReschedule(
            @Param("appointmentId") Long appointmentId,
            @Param("newDate") LocalDate newDate,
            @Param("hourStart") LocalTime hourStart,
            @Param("hourEnd") LocalTime hourEnd
    );
}
