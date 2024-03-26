package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.OrganismoDTO;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.mapper.OrganismoMapper;
import com.asi.inscripciones.mvp.service.OrganismoService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.ORGANISMOS)
public class OrganismoController {

    @Autowired
    private OrganismoService organismoService;
    
    @Autowired
    private OrganismoMapper organismoMapper;


    @PostMapping
    public ResponseEntity<Void> saveOrganismo(final @RequestBody OrganismoDTO organismoDTO) {
        
        Organismo organismo;
        organismoService.valid(organismoDTO, Accion.CREAR);

        try {
            
            organismo = organismoService.loadOrganismo(organismoDTO, Accion.CREAR);

            organismo = organismoService.save(organismo);


        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, Constante.REASON,ex);
        } catch (Exception e){
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }


    @GetMapping
    public ResponseEntity<Page<OrganismoDTO>> organismos(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ){

        List<Organismo> organismos = organismoService.getOrganismoAll(ConstanteEstados.ACTIVO, filter, pageable);

        List<OrganismoDTO> organismoDTOList =  organismoMapper.map(organismos);

        long totalCount = organismoService.countOrganismosByEstadoAndNombre(ConstanteEstados.ACTIVO, filter);

        Page<OrganismoDTO> pageReturn = new PageImpl<>(organismoDTOList, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<OrganismoDTO>> organismosList(){

        List<Organismo> organismoList = organismoService.getStateAll(ConstanteEstados.ACTIVO);

        List<OrganismoDTO> organismoDTOList =  organismoMapper.map(organismoList);

        return ResponseEntity.status(HttpStatus.OK).body(organismoDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganismoDTO> getOrganismoById(@PathVariable Long id) {


        Organismo organismo;

        OrganismoDTO organismoDTO = OrganismoDTO.builder().id(id).build();

        organismoService.valid(organismoDTO, Accion.CONSULTAR);

       try {

        organismo = organismoService.findById(id);

        organismoDTO = organismoMapper.convertOrganismoToDto(organismo);

        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
       

        return ResponseEntity.status(HttpStatus.OK).body(organismoDTO);
    }

    @PutMapping
    public ResponseEntity<Void> updateOrganismo(final @RequestBody OrganismoDTO organismoDTO) {

        organismoService.valid(organismoDTO, Accion.MODIFICAR);

        try {

            Organismo organismo = organismoService.loadOrganismo(organismoDTO,Accion.MODIFICAR);

            organismoService.updateOrganismo(organismo);
        
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrganismo(final @PathVariable Long id) {

        OrganismoDTO organismoDTO =  OrganismoDTO.builder().id(id).build();;
       
        organismoService.valid(organismoDTO, Accion.ELIMINAR);
        
        try {
        
            organismoService.deleteById(id);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       return ResponseEntity.status(HttpStatus.OK).build();
    }

}
