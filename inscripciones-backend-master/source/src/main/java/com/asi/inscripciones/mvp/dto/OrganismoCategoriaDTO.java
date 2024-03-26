package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record OrganismoCategoriaDTO(
    Long id,
    Long organismo,
    Long categoria
) {}
