package com.asi.inscripciones.mvp.dto;

import com.asi.inscripciones.mvp.entity.Usuario;

import lombok.Data;

@Data
public class UsuarioValidacionDTO {

    public UsuarioValidacionDTO() {}
    private Usuario usuario;
    private Boolean validacion;
    
}
