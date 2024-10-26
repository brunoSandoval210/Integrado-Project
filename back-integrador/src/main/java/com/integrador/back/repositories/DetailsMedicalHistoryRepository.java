package com.integrador.back.repositories;

import com.integrador.back.model.entities.DetailsMedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsMedicalHistoryRepository extends JpaRepository<DetailsMedicalHistory,Long> {
}
