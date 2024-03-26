package com.asi.inscripciones.mvp.dto;

import lombok.Data;

@Data
public class InstanciaSedeDetalleDTO {

    String nombreInscripcion;
    String nombreInstancia;
    String nombreClase;
    InstanciaSedeDTO instanciaSedeDTO;
}
