package com.asi.inscripciones.mvp.mapper.redis;

import com.asi.inscripciones.mvp.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripciones.mvp.entity.FormularioInscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FormularioInscripcionRedisMapper {

    @Mappings({
            @Mapping(source = "formulario.id", target = "idFormulario"),
            @Mapping(source = "formulario.idRefMongo", target = "idRefMongo"),
            @Mapping(source = "inscripcion.id", target = "idInscripcion")
    })
    FormularioInscripcionRedisDTO convertToFormularioInscripcionRedis(FormularioInscripcion formularioInscripcion);
}
