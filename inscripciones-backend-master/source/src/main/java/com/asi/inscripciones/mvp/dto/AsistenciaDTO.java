package com.asi.inscripciones.mvp.dto;

import com.asi.inscripciones.mvp.entity.InstanciaSede;

import lombok.Builder;
import lombok.Data;

@Data
public class AsistenciaDTO {

    private Long alumnoId;
    private InstanciaSede instanciaSede;
    private Integer status;
    
}
