package com.asi.inscripciones.mvp.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record RoleDTO (
    Long id, 
    String nombre,
    String descripcion,
    Integer estado,
    List<Long> permisos){

    public RoleDTO(final Long id){
        this(id, null, null,null,null);
    }
}
