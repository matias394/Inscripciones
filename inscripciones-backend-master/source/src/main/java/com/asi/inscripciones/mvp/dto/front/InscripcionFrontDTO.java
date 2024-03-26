package com.asi.inscripciones.mvp.dto.front;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class InscripcionFrontDTO {
    Long id;
    String nombre;
    String url;
    List<SedeFrontDTO> sedes;
}
