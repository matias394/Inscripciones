package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.NotificacionDTO;
import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.mapper.NotificacionMapper;
import com.asi.inscripciones.mvp.service.NotificacionService;
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
@RequestMapping(Url.API+Url.NOTIFICACIONES)
public class NotificacionController {
   
    @Autowired
    private NotificacionService notificacionService;
    
    @Autowired
    private NotificacionMapper notificacionMapper;

    @GetMapping
    public ResponseEntity<Page<NotificacionDTO>> notificaciones(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Notificacion> notificacion = notificacionService.getAllPage(ConstanteEstados.ACTIVO, pageable);

        List<NotificacionDTO> notificacionDTOList =  notificacionMapper.map(notificacion);

        Page<NotificacionDTO> pageReturn = new PageImpl<>(notificacionDTOList, pageable, notificacionDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }


    @GetMapping(Url.ALL)
    public ResponseEntity<List<NotificacionDTO>> notificacionList(){

        List<Notificacion> notificacionList = notificacionService.getStateAll(ConstanteEstados.ACTIVO);

        List<NotificacionDTO> notificacionDTOList =  notificacionMapper.map(notificacionList);

        return ResponseEntity.status(HttpStatus.OK).body(notificacionDTOList);
    }
}
