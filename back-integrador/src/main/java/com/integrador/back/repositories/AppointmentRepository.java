package com.integrador.back.repositories;

import com.integrador.back.model.entities.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    @Query("SELECT a from Appointment a " +
            "where (:idUser IS NULL OR a.user.id = :idUser) " +
            "AND (:status IS NULL OR a.status = :status) " +
            "AND (:statusAppointment IS NULL OR a.statusAppointment = :statusAppointment)")
    Page<Appointment>findAllByFilters(Pageable pageable, Long idUser, Integer status, String statusAppointment);

}
