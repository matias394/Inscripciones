package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.FormularioDTO;
import com.asi.inscripciones.mvp.entity.Formulario;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FormularioMapper {
    
    final static FormularioMapper INSTANCE = Mappers.getMapper(FormularioMapper.class);

    Formulario convertDtoToFormulario(FormularioDTO formularioDTO);

    FormularioDTO convertFormularioToDto(Formulario formulario);

    List<FormularioDTO> map(List<Formulario> formulario);

    
}
