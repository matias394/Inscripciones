package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

@Builder
public record CorreoDTO (
       
    Long id,
    String nombre,
    String asunto,
    String descripcion,
    String html,
    Integer estado    
){}
