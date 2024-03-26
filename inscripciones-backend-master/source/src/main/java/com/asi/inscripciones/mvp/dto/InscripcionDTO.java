package com.asi.inscripciones.mvp.dto;


import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record InscripcionDTO(
    Long id,
    Integer feriado,
    Integer cuposParaOtros,
    Integer cuposGrupales,
    Integer loginMiba,
    Integer cantidadMaxima,
    Integer cuposInscripcion,
    String nombre,
    String url,
    Long organismoCategoria,
    Long organismo,
    Long categoria,
    Long correo,
    Long notificacion,
    Long tipo,
    Long estadoInscripcion,
    String retornoUrl,
    String profesor,
    Integer cantidadInstancias,
    Integer inscritos,
    List<InstanciaDTO> instancias,
    List<FormularioInscripcionDTO> formularioInscripcion,
    LocalDate creado,
    Integer estado
) {
    
}
