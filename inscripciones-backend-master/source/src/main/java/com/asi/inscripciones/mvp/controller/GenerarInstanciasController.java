package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.GenerarInstanciasDTO;
import com.asi.inscripciones.mvp.dto.InstanciaDTO;
import com.asi.inscripciones.mvp.service.GenerarInstanciasService;
import com.asi.inscripciones.mvp.util.Url;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.GENERARINSTANCIAS)
public class GenerarInstanciasController {
    
    @Autowired
    private GenerarInstanciasService generarInstanciasService;


    @PostMapping
    public ResponseEntity<List<InstanciaDTO>> generarInstancias(final @RequestBody GenerarInstanciasDTO generarInstanciasDTO) {

        List<InstanciaDTO> instanciaList = generarInstanciasService.generarInstancias(generarInstanciasDTO);

        return ResponseEntity.status(HttpStatus.OK).body(instanciaList);
    }

}
