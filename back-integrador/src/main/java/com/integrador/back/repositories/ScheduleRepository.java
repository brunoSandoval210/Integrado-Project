package com.integrador.back.repositories;

import com.integrador.back.model.entities.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {

    @Query("select s from Schedule s " +
            "where (:status is null or s.status = :status) " +
            "and (:statusSchedule is null or s.statusSchedule like lower(:statusSchedule)) " +
            "and (:today is null or s.date >= :today) " +
            "and (:filterDay is null or s.date = :filterDay) " +
            "and (:idUser is null or s.user.id = :idUser)")
    Page<Schedule> findSchedules(Pageable pageable,
                                 @Param("today") LocalDate today,
                                 @Param("filterDay") LocalDate filterDay,
                                 @Param("idUser") Long idUser,
                                 @Param("status") Integer status,
                                 @Param("statusSchedule") String statusSchedule);

    boolean existsByDateAndHourStartAndHourEndAndUser_Id(LocalDate date,
                                                         LocalTime hourStart,
                                                         LocalTime hourEnd,
                                                         Long idUser);

    @Query("select count(s) > 0 from Schedule s " +
            "where s.user.id = :userId " +
            "and s.date = :date " +
            "and ((:hourStart < s.hourEnd and :hourEnd > s.hourStart))")
    boolean existsOverlappingSchedule(@Param("userId") Long userId,
                                      @Param("date") LocalDate date,
                                      @Param("hourStart") LocalTime hourStart,
                                      @Param("hourEnd") LocalTime hourEnd);
}