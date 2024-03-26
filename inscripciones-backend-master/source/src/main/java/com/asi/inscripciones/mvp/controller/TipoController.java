package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.TipoDTO;
import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.mapper.TipoMapper;
import com.asi.inscripciones.mvp.service.TipoService;
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
@RequestMapping(Url.API+Url.TIPOS)
public class TipoController {
    
    @Autowired
    private TipoService tipoService;
    
    @Autowired
    private TipoMapper tipoMapper;

    @GetMapping
    public ResponseEntity<Page<TipoDTO>> tipos(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Tipo> tipo = tipoService.getAllPage(ConstanteEstados.ACTIVO, pageable);

        List<TipoDTO> tipoDTOList =  tipoMapper.map(tipo);

        Page<TipoDTO> pageReturn = new PageImpl<>(tipoDTOList, pageable, tipoDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }


    @GetMapping(Url.ALL)
    public ResponseEntity<List<TipoDTO>> sedeList(){

        List<Tipo> tipoList = tipoService.getStateAll(ConstanteEstados.ACTIVO);

        List<TipoDTO> tipoDTOList =  tipoMapper.map(tipoList);

        return ResponseEntity.status(HttpStatus.OK).body(tipoDTOList);
    }

}
