package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public class InscripcionResponseDTO {
    
    Long id;
    Integer feriado;
    Integer cuposGrupales;
    Integer loginMiba;
    Integer cantidadMaxima;
    Integer limiteInscripcion;
    Integer duracionSemana;
    Integer cuposInscripcion;
    String nombre;
    String url;
    LocalDate vigenciaDesde;
    LocalDate vigenciaHasta;
    Long organismo;
    Long sede;
    Long correo;
    Long notificacion;
    Long modalidad;
    Long tipo;
    Long estado;
    List<InstanciaDTO> instancias;

}
