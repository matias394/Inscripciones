package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class AsistenciaRequestDTO {
     Long claseid;
     List<UsuarioRequestDTO> alumnos;
}
