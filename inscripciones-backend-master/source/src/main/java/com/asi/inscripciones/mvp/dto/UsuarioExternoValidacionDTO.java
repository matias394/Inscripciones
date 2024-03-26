package com.asi.inscripciones.mvp.dto;

import com.asi.inscripciones.mvp.entity.UsuarioExterno;
import lombok.Data;

@Data
public class UsuarioExternoValidacionDTO {

    public UsuarioExternoValidacionDTO() {}
    private UsuarioExterno usuario;
    private Boolean validacion;
    
}
