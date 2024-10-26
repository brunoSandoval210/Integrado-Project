package com.integrador.back.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.integrador.back.model.enums.StatusEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public class Maintenance {

//    @Column(nullable = false)
    private Long userRegister;

//    @Column(nullable = false)
    private Long userUpdate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//    @CreationTimestamp
    private LocalDateTime dateRegister;

//    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime dateUpdate;

//    @Column(nullable = false)
    @Column(columnDefinition = "TINYINT DEFAULT 1")
    private Integer status;
}