package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.EstadoDTO;
import com.asi.inscripciones.mvp.entity.Estado;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EstadoMapper {
    
    final static EstadoMapper INSTANCE = Mappers.getMapper(EstadoMapper.class);

    Estado convertDtoToEstado(EstadoDTO notificacionDTO);

    EstadoDTO convertEstadoToDto(Estado notificacion);

    List<EstadoDTO> map(List<Estado> notifiaccion);

}
