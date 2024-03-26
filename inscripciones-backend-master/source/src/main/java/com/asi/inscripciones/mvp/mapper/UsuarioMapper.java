package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.UsuarioDTO;
import com.asi.inscripciones.mvp.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsuarioMapper {

    final public UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);
    
    @Mapping(target = "organismo", ignore = true)
    @Mapping(target = "rol", ignore = true)
    Usuario convertDtoToUsuario(UsuarioDTO usuarioDTO);

    @Mapping(target = "organismo", ignore = true)
    @Mapping(target = "rol", ignore = true)
    UsuarioDTO convertUsuarioToDto(Usuario usuario);

    List<UsuarioDTO> mapEntitytToDTO(List<Usuario> usuarioList);
}
