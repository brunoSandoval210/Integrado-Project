package com.integrador.back.dtos;

import com.integrador.back.entities.Specialization;

import java.util.List;

public interface IUser {

    String getName();
    String getLastname();
    String getDni();
    String getEmail();
    String getNumberTuition();
    List<Specialization> getSpecializations();
    boolean isAdmin();
    boolean isDoctor();
}
