package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record FormularioInscripcionDTO(
    Long id,
    Long formulario,
    Long inscripcion,
    Integer dirigido,
    Integer estado
) {}
