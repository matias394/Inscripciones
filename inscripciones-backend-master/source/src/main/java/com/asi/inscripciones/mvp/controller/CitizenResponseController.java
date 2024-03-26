package com.asi.inscripciones.mvp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.asi.inscripciones.mvp.dto.InscripcionConsultaDTO;
import com.asi.inscripciones.mvp.dto.CitizenFilterDTO;
import com.asi.inscripciones.mvp.dto.InscriptionDetailDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.dto.InscriptionFilterInfo;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponseDetalleDTO;
import com.asi.inscripciones.mvp.service.CitizenResponseService;
import com.asi.inscripciones.mvp.util.Url;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import kong.unirest.HttpStatus;
import lombok.extern.log4j.Log4j2;
import java.util.ArrayList;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.INSCRITOS)
public class CitizenResponseController {

    @Autowired 
    private CitizenResponseService citizenService;

     @GetMapping()
     public ResponseEntity<Page<InscriptionFilterInfo>> findCitizens(
         @PageableDefault(page = 0, size = 10, sort ="id") Pageable pageable,
         @RequestParam(value = "name", required = false) String name,
         @RequestParam(value = "lastname", required = false) String lastname,
         @RequestParam(value = "cuil", required = false) String cuil
     ){
         Page<InscriptionFilterInfo> citizenList = citizenService.getCitizens(name, lastname, cuil, pageable);
         return ResponseEntity.status(HttpStatus.OK).body(citizenList);
     }


    @PostMapping(Url.DETALLE)
    public ResponseEntity<CitizenResponseDetalleDTO> findInscriptionDetail(final String citizenResponseId){
        CitizenResponseDetalleDTO inscriptionDetail = citizenService.getInscripcionDetail(citizenResponseId);
        return ResponseEntity.status(HttpStatus.OK).body(inscriptionDetail);
    }

    @GetMapping("/getInscripcionByCuil/{cuil}")
    public ResponseEntity<Page<InscripcionConsultaDTO>> getInscripcionByCiudadano (
        final @PathVariable String cuil,
        @PageableDefault(page = 0, size = 10, sort ="id") Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    )  {

        Page<InscripcionConsultaDTO> inscripciones = citizenService.getInscripcionesByCuil(cuil, filter, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(inscripciones);

    }

    @GetMapping(value = "disableBrokenInscriptions")
    public void disableBrokenInscriptions() {
        citizenService.disableBrokenInscriptions();
    }

}