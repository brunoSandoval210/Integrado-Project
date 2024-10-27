package com.integrador.back.model.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "historial_medico")
public class MedicalHistory extends Maintenance{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "historial_medico_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({"medicalHistory"})
    private User user;

    @OneToMany(mappedBy = "medicalHistory")
    private List<DetailsMedicalHistory> detailsMedicalHistory;
}
