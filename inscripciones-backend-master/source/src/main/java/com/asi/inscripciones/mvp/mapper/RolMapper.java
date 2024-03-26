package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.RoleDTO;
import com.asi.inscripciones.mvp.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RolMapper {
    
    final public RolMapper INSTANCE = Mappers.getMapper(RolMapper.class);

    @Mapping(target = "permisos", ignore = true)
    Rol convertDtoToRol(RoleDTO roleDTO);
    
    @Mapping(target = "permisos", ignore = true)
    RoleDTO convertRolToDto(Rol rol);

    
    List<RoleDTO> map(List<Rol> rol);
    
}
