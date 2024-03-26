package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.ClaseDTO;
import com.asi.inscripciones.mvp.dto.ClaseDetalleDTO;
import com.asi.inscripciones.mvp.dto.ClaseInstanciaDTO;
import com.asi.inscripciones.mvp.dto.FechaClasesEntityDTO;
import com.asi.inscripciones.mvp.entity.Clase;
import com.asi.inscripciones.mvp.entity.ClaseProfesor;
import com.asi.inscripciones.mvp.mapper.ClaseMapper;
import com.asi.inscripciones.mvp.service.ClaseService;
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

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.CLASES)
@SecurityRequirement(name = "bearerAuth")
public class ClaseController {

    @Autowired
    private ClaseService claseService;

    @Autowired
    private ClaseMapper claseMapper;


    @GetMapping("/{id}")
    public ResponseEntity<ClaseDetalleDTO> getClaseById(final @PathVariable("id") Long id){


        Clase clase = claseService.getClaseById(id);

        ClaseDTO claseDTO = claseMapper.convertEntityToDto(clase);

        List<ClaseProfesor> claseProfesorList = clase.getClaseProfesor();

        Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

        String nombreProfesores = claseProfesorSet.stream()
                .map(item->item.getUsuario().getNombre() +" "+item.getUsuario().getApellido())
                .collect(Collectors.joining(", "));

        claseDTO.setNombreProfesores(nombreProfesores);

        claseDTO.setInstanciaSedeId(clase.getInstanciaSede().getInstancia().getId());

        claseDTO.setSede(clase.getInstanciaSede().getSede().getNombre());

        ClaseDetalleDTO claseDetalleDTO = claseService.getDetalleClase(clase, claseDTO);

        return ResponseEntity.status(HttpStatus.OK).body(claseDetalleDTO);
    }


    @GetMapping(Url.ALL+"/{instanciaId}")
    public ResponseEntity<List<ClaseDTO>> geClassByInscripcionId(final @PathVariable("instanciaId") Long instanciaId){

        List<Clase> claseList = claseService.getByInstanciaId(instanciaId);

        List<ClaseDTO> claseDTOList = claseMapper.mapToDto(claseList);

        return ResponseEntity.status(HttpStatus.OK).body(claseDTOList);
    }


    @GetMapping(Url.INSTANCIA_SEDE+"/{instanciaId}/{sedeId}")
    public ResponseEntity<List<ClaseDTO>> geClassByInscripcionAndSede(final @PathVariable("instanciaId") Long instanciaId,
                                                                      final @PathVariable("sedeId") Long sedeId){

        List<Clase> claseList = claseService.getByInstanciaAndSede(instanciaId,sedeId);

        List<ClaseDTO> claseDTOList = claseMapper.mapToDto(claseList);

        return ResponseEntity.status(HttpStatus.OK).body(claseDTOList);
    }


    @GetMapping(Url.INSTANCIA_SEDE_USUARIO+"/{instanciaId}/{sedeId}/{usuarioId}")
    public ResponseEntity<List<ClaseDTO>> geClassByInscripcionIdAndUserId(
            final @PathVariable("instanciaId") Long instanciaId,
            final @PathVariable("sedeId") Long sedeId,
            final @PathVariable("usuarioId") Long usuarioId){

        List<Clase> claseList = claseService.getByInstanciaAndSedeAndUsuario(instanciaId,sedeId,usuarioId);

        List<ClaseDTO> claseDTOList = claseMapper.mapToDto(claseList);

        return ResponseEntity.status(HttpStatus.OK).body(claseDTOList);
    }


    @GetMapping(Url.INSTANCIAS_CLASES+"/{instanciaId}")
    public ResponseEntity<ClaseInstanciaDTO> getClassByInstanciaId(final @PathVariable("instanciaId") Long instanciaId){

        List<ClaseDTO> claseDTOList = claseService.getDTOListByInstanciaId(instanciaId);
        ClaseInstanciaDTO claseInstanciaDTO = claseService.getDetalleInstancia(instanciaId, claseDTOList);

        return ResponseEntity.status(HttpStatus.OK).body(claseInstanciaDTO);
    }

    @GetMapping(Url.INSTANCIA_SEDE+"/{instanciaSedeId}")
    public ResponseEntity<ClaseInstanciaDTO> getClassByInstanciasSede(final @PathVariable("instanciaSedeId") Long instanciaSedeId){

        ClaseInstanciaDTO claseInstanciaDTO = claseService.getByInstanciaSede(instanciaSedeId);

        return ResponseEntity.status(HttpStatus.OK).body(claseInstanciaDTO);
    }

        @GetMapping(Url.INSTANCIA_SEDE+Url.DATA+"/{instanciaSedeId}")
    public ResponseEntity<List<FechaClasesEntityDTO>> getClassByInstanciaSedeForDates(final @PathVariable("instanciaSedeId") Long instanciaId){

        List<Clase> claseList = claseService.getByInstanciaSedeDates(instanciaId);

        List<FechaClasesEntityDTO> claseFechaDTO = claseService.convertToFechaClases(claseList);                                                              

        return ResponseEntity.status(HttpStatus.OK).body(claseFechaDTO);
    }

    @GetMapping(Url.INSTANCIA_SEDE+"/op/{instanciaSedeId}")
    public ResponseEntity<ClaseInstanciaDTO> getClassByInstanciaSedeForDatesOp(final @PathVariable("instanciaSedeId") Long instanciaSedeId){

        ClaseInstanciaDTO claseInstanciaDTO = claseService.getByInstanciaSedeOp(instanciaSedeId);

        return ResponseEntity.status(HttpStatus.OK).body(claseInstanciaDTO);                                                          
    }


}
