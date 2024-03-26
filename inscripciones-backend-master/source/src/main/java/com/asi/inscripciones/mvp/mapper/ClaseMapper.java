package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.ClaseDTO;
import com.asi.inscripciones.mvp.dto.ClaseDTOMapper;
import com.asi.inscripciones.mvp.entity.Clase;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClaseMapper {

    final static ClaseMapper INSTANCE = Mappers.getMapper(ClaseMapper.class);


    @Mapping(target = "instanciaSedeId", source = "instanciaSede.id")
    @Mapping(target = "fecha", source = "fecha")
    @Mapping(target = "fechaInicio", source = "clase.instanciaSede.instancia.fechaInicio")
    @Mapping(target = "fechaFin", source = "clase.instanciaSede.instancia.fechaFin")
    ClaseDTO convertEntityToDto(Clase clase);

    Clase convertDtoToEntity(ClaseDTOMapper claseDTO);

    List<ClaseDTO> mapToDto(List<Clase> claseList);

    List<Clase> mapToEntity(List<ClaseDTO> claseListDto);
}
