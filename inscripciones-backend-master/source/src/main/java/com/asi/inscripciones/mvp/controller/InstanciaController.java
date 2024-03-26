package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.mapper.InstanciaMapper;
import com.asi.inscripciones.mvp.service.InscripcionService;
import com.asi.inscripciones.mvp.service.InstanciaService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.INSTANCIAS)
public class InstanciaController {
    
    @Autowired
    InstanciaService instanciaService;

    @Autowired
    InscripcionService inscripcionService;

    @Autowired
    InstanciaMapper instanciaMapper;


    @GetMapping("/{inscripcionId}")
    public ResponseEntity<List<InstanciaDTO>> instancias(final @PathVariable Long inscripcionId){

        List<Instancia> instanciaList = instanciaService.findInstanciaByIdInscripcion(inscripcionId);

        List<InstanciaDTO> instanciaDTOList = instanciaService.converListToDTOWhitTeacher(instanciaList);

        return ResponseEntity.status(HttpStatus.OK).body(instanciaDTOList);

    }

    @GetMapping("/citizen/{inscripcionId}")
    public ResponseEntity<List<InstanciaCitizenDTO>> getInstanciasWithSedes(final @PathVariable Long inscripcionId){

        List<InstanciaCitizenDTO> instanciaList = instanciaService.getEntityfindByInscripcionId1(inscripcionId);

        return ResponseEntity.status(HttpStatus.OK).body(instanciaList);
    }


    @GetMapping("/{inscripcionId}/{usuarioId}")
    public ResponseEntity<List<InstanciaDTO>> instancias(final @PathVariable Long inscripcionId,
                                                         final @PathVariable Long usuarioId){

        List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcionAndUsuario(inscripcionId,usuarioId);

        List<InstanciaDTO> instanciaDTOList = instanciaService.converListToDTO(instanciaList);

        return ResponseEntity.status(HttpStatus.OK).body(instanciaDTOList);

    }



    @GetMapping(Url.DETALLE+"/{idInscripcion}")
    public ResponseEntity<DetalleInstanciaDTO> instanciasDetalle(final @PathVariable Long idInscripcion){

        DetalleInstanciaDTO detalleInstanciaDTO =  instanciaService.converListToDetalleDTO(idInscripcion);

        return ResponseEntity.status(HttpStatus.OK).body(detalleInstanciaDTO);

    }


    @GetMapping(Url.INSTANCIAS+Url.ORGANISMOS+"/{idInscripcion}")
    public ResponseEntity<InstanciaOrganismoDTO> instanciasOrganismo(final @PathVariable Long idInscripcion){

        List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(idInscripcion);

        List<InstanciaDTO> instanciaDTOList = instanciaMapper.map(instanciaList);

        InstanciaOrganismoDTO instanciaOrganismoDTO =  instanciaService.instanciaOrganismoDTO(idInscripcion, instanciaDTOList);


        return ResponseEntity.status(HttpStatus.OK).body(instanciaOrganismoDTO);

    }


    @GetMapping(Url.INSTANCIAS+Url.TIPOS+"/{tipoId}")
    public ResponseEntity<List<ListaDTO>> getInscripcionByIdTipo(final @PathVariable Long tipoId){

        List<Instancia> instanciaList = instanciaService.getInstanciaByTipo(tipoId);
        List<ListaDTO> instanciaListaDTO = instanciaService.mapToDTO(instanciaList);

        return ResponseEntity.status(HttpStatus.OK).body(instanciaListaDTO);
    }


    @GetMapping(Url.INSTANCIAS+Url.TIPOS+Url.SEDES+"/{idSede}/{idTipo}")
    public ResponseEntity<Set<InstanciaSedeResponseDTO>> getInstanciaByIdSede(final @PathVariable Long idSede, final @PathVariable Long idTipo){

        List<InstanciaSedeResponseDTO> instanciaSedeResponseDTOList = instanciaService.getInstanciaByTipoSede(idSede,idTipo);
        Set<InstanciaSedeResponseDTO> instanciaSedeResponseDTOSet = instanciaSedeResponseDTOList.stream().collect(Collectors.toSet());
        return ResponseEntity.status(HttpStatus.OK).body(instanciaSedeResponseDTOSet);
    }

    @GetMapping("filtro"+"/{inscripcionId}")
    public ResponseEntity<List<InstanciaFiltroDTO>> instanciasFilter(final @PathVariable Long inscripcionId){
        List<InstanciaFiltroDTO> instanciaDTOList = new ArrayList<>();
        List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcionForFilterReport(inscripcionId);

        instanciaList.forEach(instancia -> {
            InstanciaFiltroDTO instanciaDTO = InstanciaFiltroDTO.builder()
                    .id(instancia.getId())
                    .nombre(instancia.getNombre())
                    .estado(instancia.getEstado()).build();

            instanciaDTOList.add(instanciaDTO);
        });

        return ResponseEntity.status(HttpStatus.OK).body(instanciaDTOList);

    }


    
    @GetMapping(Url.DATA+"/{inscripcionId}/{sedeId}")
    public ResponseEntity<List<InstanciaDTO>> getInstanciaByInscriptionAndSede(final @PathVariable Long inscripcionId, final @PathVariable Long sedeId){
        List<Instancia> instanciaList = instanciaService.findInstanciaByInscriptionAndSede(inscripcionId, sedeId);
        List<InstanciaDTO> instanciaDTOList = instanciaService.converListToDTOWhitTeacher(instanciaList);
        return ResponseEntity.status(HttpStatus.OK).body(instanciaDTOList);
    }
}
