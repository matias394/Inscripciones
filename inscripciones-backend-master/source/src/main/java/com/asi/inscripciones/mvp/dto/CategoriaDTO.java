package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record CategoriaDTO(
    Long id,
    String nombre,
    String nivel,
    String padreId,
    String seq,
    String nombreOrganismo,
    Long organismoId,
    Integer estado)
{}
