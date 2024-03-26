package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class InscripcionDataDTO {
    Long id;
    Integer feriado;
    Integer cuposGrupales;
    Integer loginMiba;
    Integer cantidadInstancias;
    Integer cantidadMaxima;
    String nombre;
    String url;
    String organismoCategoria;
    String organismo;
    String categoria;
    String correo;
    String notificacion;
    String modalidad;
    String tipo;
    String estadoInscipcion;
    String categorias;
    String profesor;
    Integer inscritos;
    Integer estado;
    List<InstanciaDataDTO> instanciaData;
    Integer instanciasNumero;
}