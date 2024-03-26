package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.ModalidadDTO;
import com.asi.inscripciones.mvp.entity.Modalidad;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ModalidadMapper {
    

    final static ModalidadMapper INSTANCE = Mappers.getMapper(ModalidadMapper.class);

    Modalidad convertDtoToModalidad(ModalidadDTO notificacionDTO);

    ModalidadDTO convertModalidadToDto(Modalidad notificacion);

    List<ModalidadDTO> map(List<Modalidad> notifiaccion);
}
