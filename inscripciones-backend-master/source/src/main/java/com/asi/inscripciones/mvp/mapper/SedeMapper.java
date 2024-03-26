package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.SedeDTO;
import com.asi.inscripciones.mvp.entity.Sede;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SedeMapper {
    
    final public SedeMapper INSTANCE = Mappers.getMapper(SedeMapper.class);

    Sede convertDtoToSede(SedeDTO sedeDTO);

    SedeDTO convertSedeToDto(Sede sede);

    List<SedeDTO> map(List<Sede> sedes);
    
}
