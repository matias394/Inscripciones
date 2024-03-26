package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.InscripcionDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InscripcionMapper {
    
    final public InscripcionMapper INSTANCE = Mappers.getMapper(InscripcionMapper.class);

    @Mapping(target = "organismoCategoria", ignore = true)
    @Mapping(target = "estadoInscripcion", ignore = true)
    @Mapping(target = "correo", ignore = true)
    @Mapping(target = "notificacion", ignore = true)
    @Mapping(target = "tipo", ignore = true)
    @Mapping(target = "instancias", ignore = true)
    @Mapping(target = "formularioInscripcion", ignore = true)
    Inscripcion convertDtoToInscripcion(InscripcionDTO inscripcionDTO);

    @Mapping(target = "organismoCategoria", source = "organismoCategoria.id")
    @Mapping(target = "estadoInscripcion", source = "estadoInscripcion.id")
    @Mapping(target = "correo", source = "correo.id")
    @Mapping(target = "notificacion", source = "notificacion.id")
    @Mapping(target = "tipo", source = "tipo.id")
    @Mapping(target = "organismo", source = "organismo")
    @Mapping(target = "categoria", source = "categoria")
    @Mapping(target = "instancias", ignore = true)
    @Mapping(target = "formularioInscripcion", ignore = true)
    InscripcionDTO converInscripcionToDto(Inscripcion inscripcion);

    List<InscripcionDTO> map(List<Inscripcion> inscripcion);

}
