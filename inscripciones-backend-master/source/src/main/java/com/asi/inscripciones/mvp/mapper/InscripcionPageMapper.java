package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.InscripcionDataDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InscripcionPageMapper {
    
    final public InscripcionPageMapper INSTANCE = Mappers.getMapper(InscripcionPageMapper.class);

    @Mapping(target = "organismoCategoria", source = "organismoCategoria.organismo.nombre")
    @Mapping(target = "correo", source = "correo.nombre")
    @Mapping(target = "notificacion", source = "notificacion.nombre")
    @Mapping(target = "tipo", source = "tipo.nombre")
    InscripcionDataDTO converInscripcionToDto(Inscripcion inscripcion);

    

}
