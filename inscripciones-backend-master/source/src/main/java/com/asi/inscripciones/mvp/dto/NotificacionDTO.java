package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record NotificacionDTO (
    Long id,
    String nombre,
    String descripcion,
    Integer estado
){}
