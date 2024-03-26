package com.asi.inscripciones.mvp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SedeDTO {

    private Long id;
    private String nombre;
    private String direccion;
    private String piso;
    private String email;
    private String telefono;
    private Integer bloqueado;
}
