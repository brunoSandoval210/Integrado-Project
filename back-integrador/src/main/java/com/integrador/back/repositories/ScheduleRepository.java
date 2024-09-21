package com.integrador.back.repositories;

import com.integrador.back.entities.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    @Query(value = "SELECT * FROM horario WHERE status = 1",
            countQuery = "SELECT count(*) FROM horario WHERE status = 1",
            nativeQuery = true)
    Page<Schedule> findAll(Pageable pageable);
    @Query(value = "SELECT H.* FROM horario H " +
            "INNER JOIN usuario U ON U.usuario_id=H.usuario_id " +
            "WHERE U.dni = ?1 AND H.status = 1",
            nativeQuery = true)
    Optional<Schedule> findAllByUser_Dni(String dni);
    Page<Schedule> findAllByDateStart(Date dateStart, Pageable pageable);
    Page<Schedule> findAllByDateStartAndUser_NameContaining(Date dateStart, String name, Pageable pageable);
    //un metodo que reciba el dia, la hora y el dni del doctor y verifique si hay un turno en ese horario
    Optional<Schedule> findByDateStartAndHourStartAndUser_Dni(Date dateStart, LocalTime hourStart, String dni);
    Optional<Schedule> findByDateStartAndDateEndAndHourStartAndHourEndAndUser_Dni(Date dateStart, Date dateEnd, LocalTime hourStart, LocalTime hourEnd, String dni);
}