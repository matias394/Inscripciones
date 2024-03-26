package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategoriaFiltroDTO {
    private Long id;
    private String nombre;
    private Integer estado;
}
