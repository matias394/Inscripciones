package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record ModalidadDTO 
(
    Long id,
    String nombre,
    String descripcion,
    Integer estado
){}
