package com.integrador.back.dtos;

import com.integrador.back.entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class ScheduleCreateDTO {

    private Date dateStart;
    private Date dateEnd;
    private LocalTime hourStart;
    private LocalTime hourEnd;
    private String dni;
}
