package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record OrganismoDTO(
    Long id,
    String nombre,
    Integer estado
) {}

    

