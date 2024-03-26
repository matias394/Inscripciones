package com.asi.inscripciones.mvp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class UsuarioExternoDTO {

    private Long id;
    private String dni;
    private String cuil;
    private String nombre;
    private String apellido;
    private String email;
    private String genero;
    private String nacionalidad;
    private String password;
    private Long estado;
    private Long organismo;
    private Long rol;
    private List<Long> categoria;
    private Integer intentos;

}