package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.FormularioInscripcionDTO;
import com.asi.inscripciones.mvp.entity.FormularioInscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FormularioInscripcionMapper {
    
    final public FormularioInscripcionMapper INSTANCE = Mappers.getMapper(FormularioInscripcionMapper.class);

    @Mapping(target = "formulario", ignore = true)
    @Mapping(target = "inscripcion", ignore = true)
    FormularioInscripcion convertDtoToFormularioInscrpcion(FormularioInscripcionDTO dto);

    @Mapping(target = "formulario", source = "formulario.id")
    @Mapping(target = "inscripcion", source = "inscripcion.id")
    FormularioInscripcionDTO convertFormularioInscrpcionToDto(FormularioInscripcion entity);

    List<FormularioInscripcion> mapToEntity(List<FormularioInscripcionDTO> dtoList);

    List<FormularioInscripcionDTO> mapToDto(List<FormularioInscripcion> entityList);
    
}
