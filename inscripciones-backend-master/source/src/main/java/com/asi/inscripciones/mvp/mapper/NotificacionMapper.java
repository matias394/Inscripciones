package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.NotificacionDTO;
import com.asi.inscripciones.mvp.entity.Notificacion;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificacionMapper {
    
    final static NotificacionMapper INSTANCE = Mappers.getMapper(NotificacionMapper.class);

    Notificacion convertDtoToNotificacion(NotificacionDTO notificacionDTO);

    NotificacionDTO convertNotificacionToDto(Notificacion notificacion);

    List<NotificacionDTO> map(List<Notificacion> notifiaccion);

}
