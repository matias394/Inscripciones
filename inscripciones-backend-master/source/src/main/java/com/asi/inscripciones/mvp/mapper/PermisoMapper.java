package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.PermisoDTO;
import com.asi.inscripciones.mvp.entity.Permiso;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PermisoMapper {
    
    final public PermisoMapper INSTANCE = Mappers.getMapper(PermisoMapper.class);

    Permiso convertDtoToPermiso(PermisoDTO permisoDTO);

    PermisoDTO convertPermisoToDto(Permiso permiso);

    List<PermisoDTO> map(List<Permiso> organismo);

}
