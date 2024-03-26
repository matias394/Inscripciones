package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record PermisoDTO(
    Long id, 
    String nombre, 
    Integer estado
) {}
