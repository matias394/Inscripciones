package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.EstadoDTO;
import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.mapper.EstadoMapper;
import com.asi.inscripciones.mvp.service.EstadoService;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.ESTADOS)
public class EstadoController {
    
    @Autowired
    private EstadoService estadoService;
    
    @Autowired
    private EstadoMapper estadoMapper;

    @GetMapping
    public ResponseEntity<Page<EstadoDTO>> estados(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Estado> estado = estadoService.getAllPage(ConstanteEstados.ACTIVO, pageable);

        List<EstadoDTO> estadoDTOList =  estadoMapper.map(estado);

        Page<EstadoDTO> pageReturn = new PageImpl<>(estadoDTOList, pageable, estadoDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<EstadoDTO>> estadoList(){

        List<Estado> estadoList = estadoService.getStateAll(ConstanteEstados.ACTIVO);

        List<EstadoDTO> estadoDTOList =  estadoMapper.map(estadoList);

        return ResponseEntity.status(HttpStatus.OK).body(estadoDTOList);
    }
}
