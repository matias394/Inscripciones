package com.asi.inscripciones.mvp.mapper.redis;

import com.asi.inscripciones.mvp.dto.redis.InscripcionRedisDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InscripcionRedisMapper {

        InscripcionRedisDTO convertToInscripcionRedis(Inscripcion inscripcion);
}
