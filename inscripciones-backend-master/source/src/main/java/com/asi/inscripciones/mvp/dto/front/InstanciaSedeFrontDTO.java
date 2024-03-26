package com.asi.inscripciones.mvp.dto.front;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class InstanciaSedeFrontDTO {
    Long id;
    SedeFrontDTO sedes;
}
