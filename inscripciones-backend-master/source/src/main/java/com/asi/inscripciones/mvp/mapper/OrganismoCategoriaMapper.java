package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.OrganismoCategoriaDTO;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrganismoCategoriaMapper {
   
    final public OrganismoCategoriaMapper INSTANCE = Mappers.getMapper(OrganismoCategoriaMapper.class);
    
    @Mapping(target = "organismo", source = "organismo.id")
    @Mapping(target = "categoria", source = "categoria.id")
    OrganismoCategoriaDTO convertOCToDTO(OrganismoCategoria organismoCategoria);
}
