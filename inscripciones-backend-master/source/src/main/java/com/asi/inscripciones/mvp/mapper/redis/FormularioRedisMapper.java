package com.asi.inscripciones.mvp.mapper.redis;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import com.asi.inscripciones.mvp.dto.redis.FormularioRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.InscripcionRedisDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FormularioRedisMapper {
        @Mappings({
                @Mapping(source = "id", target = "id"),
                @Mapping(source = "nombre", target = "nombre"),
                @Mapping(source = "descripcion", target = "descripcion"),
                @Mapping(source = "campos", target = "campos"),
                @Mapping(source = "puedeEditarseNombre", target = "puedeEditarseNombre")
        })
        FormularioRedisDTO convertToFormularioRedis(FormularioMongoDTO formularioMongoDTO);
}
