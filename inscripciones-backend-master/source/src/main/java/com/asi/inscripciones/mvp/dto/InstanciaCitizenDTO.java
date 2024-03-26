package com.asi.inscripciones.mvp.dto;

import java.util.List;

import com.asi.inscripciones.mvp.entity.InstanciaSede;

import lombok.Data;

@Data
public class InstanciaCitizenDTO {

    Long id;
    String nombreInstancia;
    String nombreProfesores;
    List<InstanciaSede> instanciaSedeList;
}
