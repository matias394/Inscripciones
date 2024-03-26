package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.AsistenciaRequestDTO;
import com.asi.inscripciones.mvp.dto.ClaseDataDTO;
import com.asi.inscripciones.mvp.dto.ListaDTO;
import com.asi.inscripciones.mvp.service.ClaseAlumnoService;
import com.asi.inscripciones.mvp.service.ClaseService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.CLASE_ALUMNO)
public class ClaseAlumnoController {

    @Autowired
    private ClaseService claseService;

    @Autowired
    private ClaseAlumnoService claseAlumnoService;

    @GetMapping(Url.ASISTNCIA+"/{instanciaSedeId}/{claseId}")
    public ResponseEntity<ClaseDataDTO> getClaseAlumnosById(final @PathVariable Long instanciaSedeId,
                                                            final @PathVariable Long claseId){

        ClaseDataDTO response = claseService.getClasesByIdForReport(instanciaSedeId,claseId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PutMapping(Url.ASISTNCIA+"/{claseId}/{usuarioId}/{asistencia}")
    public ResponseEntity<String> updateClaseAlumno(final @PathVariable Long claseId, final @PathVariable Long usuarioId, final @PathVariable Integer asistencia){

        claseAlumnoService.updateAsistencia(claseId,usuarioId,asistencia);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(Url.USUARIOS+"/{instanciaId}")
    public ResponseEntity<List<ListaDTO>> getListAlumnosByInstanciaId(final @PathVariable Long instanciaId){

        List<ListaDTO> listaDTOS = claseService.getListaDTOClasesByInstanciaId(instanciaId);


        return ResponseEntity.status(HttpStatus.OK).body(listaDTOS);
    }

    @PutMapping(Url.ASISTNCIA)
    public ResponseEntity<String> marcarAsistencias(final @RequestBody AsistenciaRequestDTO asistenciaRequestDTO){

        claseAlumnoService.updateAsistenciaAll(asistenciaRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(Url.ASISTNCIA+Url.DATA+"/{instanciaSedeId}/{claseId}")
    public ResponseEntity<ClaseDataDTO> getClasesAlumnoByIdOptimize(final @PathVariable Long instanciaSedeId,
                                                            final @PathVariable Long claseId){
                                                                
        ClaseDataDTO response = claseService.getClaseReport(instanciaSedeId,claseId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
