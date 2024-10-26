package com.integrador.back.model.keys;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class DetailsMedicalHistoryId implements Serializable {
    private Long medicalHistoryId;
    private Long appointmentId;
}
