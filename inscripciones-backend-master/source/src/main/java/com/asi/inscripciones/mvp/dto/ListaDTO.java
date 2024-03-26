package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ListaDTO {

    String nombreApellido;

    String cuilDniPas;

    String email;

    Long id;

    Integer estado;
}
