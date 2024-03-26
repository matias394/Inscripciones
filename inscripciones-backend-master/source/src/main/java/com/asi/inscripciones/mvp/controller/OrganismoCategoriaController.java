package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.OrganismoCategoriaDTO;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.mapper.OrganismoCategoriaMapper;
import com.asi.inscripciones.mvp.service.OrganismoCategoriaService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.ORGANISMOCATEGORIA)
public class OrganismoCategoriaController {

    @Autowired
    OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    OrganismoCategoriaMapper organismoCategoriaMapper;


    @GetMapping("/{organismo}/{categoria}")
    public ResponseEntity<OrganismoCategoriaDTO> getOrganismoCategoria(@PathVariable("organismo") final Long organismo, @PathVariable("categoria") Long categoria){

        OrganismoCategoriaDTO organismoCategoriaDTO = OrganismoCategoriaDTO.builder().organismo(organismo).categoria(categoria).build();
        organismoCategoriaService.valid(organismoCategoriaDTO, Accion.CONSULTAR);
        OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdOrganismoCategoria(organismo, categoria);
        organismoCategoriaDTO = organismoCategoriaMapper.convertOCToDTO(organismoCategoria);

        
        
        return ResponseEntity.status(HttpStatus.OK).body(organismoCategoriaDTO);
    }
    
}
