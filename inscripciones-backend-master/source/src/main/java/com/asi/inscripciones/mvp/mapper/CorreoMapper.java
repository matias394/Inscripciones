package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.CorreoDTO;
import com.asi.inscripciones.mvp.entity.Correo;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CorreoMapper {
    
    final static CorreoMapper INSTANCE = Mappers.getMapper(CorreoMapper.class);

    Correo convertDtoToCorreo(CorreoDTO correoDTO);

    CorreoDTO convertCorreoToDto(Correo correo);

    List<CorreoDTO> map(List<Correo> correo);
}
