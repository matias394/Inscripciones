package com.asi.inscripciones.mvp.service;


import com.asi.inscripciones.mvp.dto.OrganismoDTO;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.mapper.OrganismoMapper;
import com.asi.inscripciones.mvp.repository.OrganismoRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganismoService {
   
    @Autowired
    final private OrganismoRepository organismoRepository;

    @Autowired
    private OrganismoMapper organismoMapper; 
    
    public Organismo getByName(String nombre){
        
        Optional<Organismo> organismo = organismoRepository.findByName(nombre);
        return organismo.orElse(new Organismo());
    }

    public Organismo save( @NotNull final Organismo organismo) {
        Organismo response = organismoRepository.save(organismo);
        return response;
    }


    public Organismo findById( @NotNull final Long id) {
        Optional<Organismo> response = organismoRepository.findById(id);
        return response.orElse(new Organismo());
    }

    public List<Organismo> getStateAll(final Integer estado){
        List<Organismo> organismoList = organismoRepository.getStateAll(estado);
        return organismoList;
    }

    public List<Organismo> getOrganismoAll(final Integer estado, String filter, final Pageable pageable) {
        if (filter != null && !filter.trim().isEmpty()) {
            return organismoRepository.findByEstadoAndIdOrNombreLike(estado, "%" + filter + "%", pageable);
        } else {
            return organismoRepository.findByEstadoLike(estado, pageable);
        }
    }


    public long countOrganismosByEstadoAndNombre(Integer estado, String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return organismoRepository.countByEstadoAndIdOrNombreLike(estado, "%" + filter + "%");
        } else {
            return organismoRepository.countByEstado(estado);
        }
    }

    @Transactional
    public Organismo updateOrganismo(Organismo organismo){

      return organismoRepository.save(organismo);        
        
    }

    public void deleteOrganismoById(final Long id) {

        Optional<Organismo> organismo = organismoRepository.findById(id);  
        organismo.get().setEstado(ConstanteEstados.INACTIVO);
        organismoRepository.save(organismo.get());
 
    }  

    public Organismo loadOrganismo(final OrganismoDTO organismoDTO, Accion accion){

        Organismo organismo = organismoMapper.convertDtoToOrganismo(organismoDTO);

        if (accion.equals(Accion.MODIFICAR)) {
            
            Organismo organismoActual = this.findById(organismoDTO.id());

            organismo.setCreado(organismoActual.getCreado());
            organismo.setCreadoPor(organismoActual.getCreadoPor());
        }

        return organismo;
    }

    public void deleteById(final Long id) {
        
        Organismo organismo = this.findById(id);
        organismo.setEstado(ConstanteEstados.INACTIVO);
        organismoRepository.save(organismo);
    }


    public void valid(final OrganismoDTO organismoDTO, final Accion accion){

        if (accion.equals(Accion.CREAR)) {

            Optional<Organismo> organismo = organismoRepository.findByName(organismoDTO.nombre());
            
            if (organismo.isPresent())
                throw new ResponseStatusException(HttpStatus.FOUND);

            if (ObjectUtils.isNotEmpty(organismoDTO.id()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);
            
            if (ObjectUtils.isEmpty(organismoDTO.nombre()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);

            
        } else if (accion.equals(Accion.MODIFICAR)) {
            
            if (ObjectUtils.isEmpty(organismoDTO.id()))
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
               
            if (ObjectUtils.isEmpty(organismoDTO.estado()))
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
            
            Optional<Organismo> organismoOptional = organismoRepository.findById(organismoDTO.id());
            
            if (organismoOptional.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            

        } else if (accion.equals((Accion.CONSULTAR))) {
            Optional<Organismo> organismoOptional = organismoRepository.findById(organismoDTO.id());

            if (organismoOptional.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        

        } else if(accion.equals(Accion.ELIMINAR)){
        
            Organismo organismo = this.findById(organismoDTO.id());
            if (ObjectUtils.isEmpty(organismo.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        }
    }

    
}
