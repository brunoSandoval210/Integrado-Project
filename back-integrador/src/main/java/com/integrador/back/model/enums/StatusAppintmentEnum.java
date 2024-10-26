package com.integrador.back.model.enums;

public enum StatusAppintmentEnum {
    PENDIENTE,               // Creada pero no pagada.
    CONFIRMADA,              // Pagada y confirmada.
    CANCELADA,               // Cancelada sin haber sido pagada.
    CANCELADA_CON_REEMBOLSO, // Pagada, pero luego cancelada.
    COMPLETADA,              // Realizada exitosamente.
    REPROGRAMADA,            // Cambiada a una nueva fecha/hora.
    NO_ASISTIO,              // El cliente no asistió a la cita.
    EN_CURSO,                // La cita está en desarrollo.
    RECHAZADA,               // Rechazada por la administración.
    EXPIRADA                 // No confirmada ni pagada a tiempo.            // Cita realizada exitosamente.
}
