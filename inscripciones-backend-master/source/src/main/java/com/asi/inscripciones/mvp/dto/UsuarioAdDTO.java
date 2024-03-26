package com.asi.inscripciones.mvp.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;

@Data
public class UsuarioAdDTO implements Serializable {
    
    private String numeroCui;
    private String nombre;
    private String apellido;
    private String email;
    private String relacionLaboral;
    private String tipoCuenta;
    private String tipoCui;
    private String puesto;
    private String areaSigla;
    private Boolean areaActiva;
    private String domicilioLaboral;
    private ArrayList<String> ramaEstructura;
}
