package com.asi.inscripciones.mvp.dto.front;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SedeFrontDTO {
    Long id;
    String nombre;
    String direccion;
    String piso;
}
