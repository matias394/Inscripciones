package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.TipoDTO;
import com.asi.inscripciones.mvp.entity.Tipo;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TipoMapper {
    
    final static TipoMapper INSTANCE = Mappers.getMapper(TipoMapper.class);

    Tipo convertDtoToTipo(TipoDTO tipoDTO);

    TipoDTO convertTipoToDto(Tipo tipo);

    List<TipoDTO> map(List<Tipo> tipo);

    
}
