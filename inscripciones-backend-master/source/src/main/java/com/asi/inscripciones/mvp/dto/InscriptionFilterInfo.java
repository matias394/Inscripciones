package com.asi.inscripciones.mvp.dto;

import lombok.Data;

@Data
public class InscriptionFilterInfo {

    private String nombre;
    private String apellido;
    private String cuil;
    private String email;
    private Long inscriptionId;
    private Long instanciaId;
    private String nombreInscripcion;
    
}
