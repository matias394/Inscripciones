package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.UsuarioExternoDTO;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.entity.UsuarioExterno;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsuarioExternoMapper {

    final public UsuarioExternoMapper INSTANCE = Mappers.getMapper(UsuarioExternoMapper.class);
    
    @Mapping(target = "organismo", ignore = true)
    @Mapping(target = "rol", ignore = true)
    UsuarioExterno convertDtoToUsuario(UsuarioExternoDTO usuarioDTO);

    @Mapping(target = "organismo", ignore = true)
    @Mapping(target = "rol", ignore = true)
    UsuarioExternoDTO convertUsuarioToDto(UsuarioExterno usuario);

    List<UsuarioExternoDTO> mapEntitytToDTO(List<UsuarioExterno> usuarioList);

    Usuario mapUsuarioExternotoUsuario(UsuarioExterno usuario);
}
