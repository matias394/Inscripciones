package com.asi.inscripciones.mvp.mapper;


import com.asi.inscripciones.mvp.dto.InstanciaDTO;
import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.service.ModalidadService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE,
        componentModel = "spring", uses = {ModalidadService.class})
public abstract class InstanciaMapper {


    @Mapping(target = "inscripcion", ignore = true)
    @Mapping(target = "limiteInscripcion", ignore = true)
    @Mapping(target = "instanciaSede", ignore = true)
    @Mapping(target = "modalidad", source = "modalidad")
    @Mapping(target = "fechaInicio", source = "vigenciaInicio")
    @Mapping(target = "fechaFin", source = "vigenciaFin")
    public abstract Instancia convertDtoToInstancia(InstanciaDTO instanciaDTO);

    @Mapping(target = "inscripcion", source = "inscripcion.id")
    @Mapping(target = "nombreInscripcion", source = "inscripcion.nombre")
    @Mapping(target = "modalidad", source = "modalidad.id")
    @Mapping(target = "modalidadName", source = "modalidad.nombre")
    @Mapping(target = "instanciaSedes", ignore = true)
    @Mapping(target = "vigenciaInicio", source = "fechaInicio")
    @Mapping(target = "vigenciaFin", source = "fechaFin")
    public abstract InstanciaDTO convertInstanciaToDto(Instancia instancia);

    public abstract List<InstanciaDTO> map(List<Instancia> instanciaList);
}
