package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.CorreoDTO;
import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.mapper.CorreoMapper;
import com.asi.inscripciones.mvp.service.CorreoService;
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
@RequestMapping(Url.API+Url.CORREOS)
public class CorreoController {
    
    @Autowired
    private CorreoService correoService;

    @Autowired
    private CorreoMapper correoMapper;

    @GetMapping

    public ResponseEntity<Page<CorreoDTO>> organismos(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Correo> correo = correoService.getAllPage(ConstanteEstados.ACTIVO, null);

        List<CorreoDTO> correoDTOList =  correoMapper.map(correo);

        Page<CorreoDTO> pageReturn = new PageImpl<>(correoDTOList, pageable, correoDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<CorreoDTO>> correoList(){

        List<Correo> correoList = correoService.getStateAll(ConstanteEstados.ACTIVO);

        List<CorreoDTO> correoDTOList =  correoMapper.map(correoList);

        return ResponseEntity.status(HttpStatus.OK).body(correoDTOList);
    }

    
}
