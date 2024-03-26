package com.asi.inscripciones.mvp.mapper;

import com.asi.inscripciones.mvp.dto.OrganismoDTO;
import com.asi.inscripciones.mvp.entity.Organismo;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrganismoMapper {

    final static OrganismoMapper INSTANCE = Mappers.getMapper(OrganismoMapper.class);

    Organismo convertDtoToOrganismo(OrganismoDTO organismoDTO);

    OrganismoDTO convertOrganismoToDto(Organismo organismo);

    List<OrganismoDTO> map(List<Organismo> organismo);
    
}
