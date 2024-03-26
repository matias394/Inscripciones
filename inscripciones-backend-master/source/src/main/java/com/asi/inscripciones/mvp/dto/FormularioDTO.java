package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record FormularioDTO(
    Long id,
    String nombre,
    String descripcion,
    Integer estado,
    String idRefMongo,
    Integer dirigido
) {}
