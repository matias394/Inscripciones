package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.GenerarClaseSedeDTO;
import com.asi.inscripciones.mvp.dto.InstanciaSedeDTO;
import com.asi.inscripciones.mvp.service.GenerarClaseSedeService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.GENERARCLASESEDE)
public class GenerarClaseSedeController {

    @Autowired
    private GenerarClaseSedeService generarClaseSedeService;

    @PostMapping
    public ResponseEntity<InstanciaSedeDTO> generarClaseSede(final @RequestBody GenerarClaseSedeDTO generarClaseSedeDTO){

        InstanciaSedeDTO claseSedeDTOList = generarClaseSedeService.generarClaseSede(generarClaseSedeDTO);

        return ResponseEntity.status(HttpStatus.OK).body(claseSedeDTOList);
    }

}
