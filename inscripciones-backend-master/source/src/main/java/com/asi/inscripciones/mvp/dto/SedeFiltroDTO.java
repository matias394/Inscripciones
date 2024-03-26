package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class SedeFiltroDTO {

    private Long id;
    private String nombre;
    private Integer bloqueado;
}
