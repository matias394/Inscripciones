package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record TipoDTO(
    Long id,
    String nombre,
    String descripcion,
    Integer estado
){}
