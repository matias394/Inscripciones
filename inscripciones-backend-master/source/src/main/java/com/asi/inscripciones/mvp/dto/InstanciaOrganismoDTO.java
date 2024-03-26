package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.util.List;
@Data
public class InstanciaOrganismoDTO {

    String nombreInscripcion;

    List<InstanciaDTO> instanciaDTOList;
}
