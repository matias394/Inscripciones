package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.CategoriaDTO;
import com.asi.inscripciones.mvp.entity.Categoria;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoriaMapper {
    
    final static CategoriaMapper INSTANCE = Mappers.getMapper(CategoriaMapper.class);

    Categoria convertDtoToCategoria(CategoriaDTO categoriaDTO); 

    CategoriaDTO convertCategoriaToDto(Categoria categoria);

    List<CategoriaDTO> mapEntitytToDTO(List<Categoria> categoriaList);
    
}