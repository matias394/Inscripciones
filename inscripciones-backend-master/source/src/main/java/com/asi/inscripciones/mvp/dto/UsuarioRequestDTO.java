package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UsuarioRequestDTO {

    Long usuarioId;
    Integer asistencia;
}
