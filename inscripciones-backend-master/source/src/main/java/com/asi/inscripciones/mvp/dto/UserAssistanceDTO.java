package com.asi.inscripciones.mvp.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class UserAssistanceDTO {

    private String name;
    private String lastName;
    private String cuil; 
    private Long instanciaSedeId;
    
}
