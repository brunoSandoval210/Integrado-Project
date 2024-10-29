package com.integrador.back.model.dtos.appointment;

import lombok.Data;

@Data
public class RescheduleResponse {
    private Long id;
    private String previousDate;
    private String newDate;
    private String hourStart;
    private String hourEnd;
    private String reason;
}
