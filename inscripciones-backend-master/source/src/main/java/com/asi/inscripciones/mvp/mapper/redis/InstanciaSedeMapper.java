package com.asi.inscripciones.mvp.mapper.redis;

import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.dto.redis.InstanciaSedeRedisDTO;
import com.asi.inscripciones.mvp.repository.InstanciaSedeProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InstanciaSedeMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "cupos", target = "cupos"),
            @Mapping(source = "instancia.id", target = "idInstancia"),
            @Mapping(source = "instancia.nombre", target = "instanciaNombre"),
            @Mapping(source = "instancia.inscripcion.id", target = "idInscripcion"),
            @Mapping(source = "instancia.inscripcion.nombre", target = "nombreInscripcion"),
            @Mapping(source = "instancia.modalidad.id", target = "idModalidad"),
            @Mapping(source = "instancia.modalidad.nombre", target = "modalidad"),
            @Mapping(source = "sede.id", target = "sedeId"),
            @Mapping(source = "sede.nombre", target = "nombreSede"),
            @Mapping(source = "sede.direccion", target = "direccionSede"),
            @Mapping(source = "instancia.fechaInicio", target = "fechaInicio")
    })
    InstanciaSedeRedisDTO convertToInstanciaSedeRedis(InstanciaSede instancia);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(target = "instancia.inscripcion.id", source = "inscripcionId"),
            @Mapping(target = "instancia.inscripcion.nombre", source = "inscripcionNombre"),
            @Mapping(target = "instancia.inscripcion.estado", source = "inscripcionEstado"),
            @Mapping(target = "instancia.id", source = "instanciaId"),
            @Mapping(target = "instancia.nombre", source = "instanciaNombre"),
            @Mapping(target = "instancia.estado", source = "instanciaEstado"),
            @Mapping(target = "instancia.fechaInicio", source = "instanciaFechaInicio"),
            @Mapping(target = "instancia.fechaFin", source = "instanciaFechaFin"),
            @Mapping(target = "sede.id", source = "sedeId"),
            @Mapping(target = "sede.nombre", source = "sedeNombre"),
            @Mapping(target = "sede.bloqueado", source = "sedeBloqueado"),
            @Mapping(target = "instancia.inscripcion.organismoCategoria.categoria.id", source = "categoriaId"),
            @Mapping(target = "instancia.inscripcion.organismoCategoria.categoria.nombre", source = "categoriaNombre"),
            @Mapping(target = "instancia.inscripcion.organismoCategoria.organismo.id", source = "organismoId"),
            @Mapping(target = "instancia.inscripcion.organismoCategoria.organismo.nombre", source = "organismoNombre")
    })
    InstanciaSede convertToInstanciaSede(InstanciaSedeProjection instancia);
}
