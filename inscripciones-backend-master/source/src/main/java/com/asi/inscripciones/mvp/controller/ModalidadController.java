package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.ModalidadDTO;
import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.mapper.ModalidadMapper;
import com.asi.inscripciones.mvp.service.ModalidadService;
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
@RequestMapping(Url.API+Url.MODALIDADES)
public class ModalidadController {
    
    @Autowired
    private ModalidadService modalidadService;
    
    @Autowired
    private ModalidadMapper modalidadMapper;

    @GetMapping
    public ResponseEntity<Page<ModalidadDTO>> modalidades(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Modalidad> modalidad = modalidadService.getAllPage(ConstanteEstados.ACTIVO, pageable);

        List<ModalidadDTO> modalidadDTOList =  modalidadMapper.map(modalidad);

        Page<ModalidadDTO> pageReturn = new PageImpl<>(modalidadDTOList, pageable, modalidadDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<ModalidadDTO>> sedeList(){

        List<Modalidad> modalidadList = modalidadService.getStateAll(ConstanteEstados.ACTIVO);

        List<ModalidadDTO> modalidadDTOList =  modalidadMapper.map(modalidadList);

        return ResponseEntity.status(HttpStatus.OK).body(modalidadDTOList);
    }

}
