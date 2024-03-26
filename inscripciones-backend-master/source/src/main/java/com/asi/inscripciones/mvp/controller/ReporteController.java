package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.entity.report.*;
import com.asi.inscripciones.mvp.service.ReporteService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Log4j2
@RestController
@RequestMapping(Url.API+Url.REPORTES)
public class ReporteController {

    @Autowired
    ReporteService reporteService;


    @GetMapping(Url.REPORTES+Url.ASISTNCIA)
    public ResponseEntity<List<ReporteEventoResponse>> reporteAsistenciaPorEvento(final @RequestBody ReporteEventoRequest reporteEventoRequest){

        List<ReporteEventoResponse> reporteEventoResponseList = reporteService.reporteAsistencia(reporteEventoRequest);

        return ResponseEntity.status(HttpStatus.OK).body(reporteEventoResponseList);
    }

    @GetMapping(Url.REPORTES+Url.INSCRITOS)
    public ResponseEntity<List<ReporteParticipanteInscritosResponse>> reporteInscritosPorOrganismo(final @RequestBody ReporteParticipanteInscritosRequest request) {

        List<ReporteParticipanteInscritosResponse> reporteEventoResponseList = reporteService.reporteInscritos(request);

        return ResponseEntity.status(HttpStatus.OK).body(reporteEventoResponseList);
    }

    @GetMapping(Url.REPORTES+Url.MEDIOS_ASIGNACION)
    public ResponseEntity<List<MedioDeAsignacionResponse>> reporteMediosDeAsignacion(final @RequestBody MedioDeAsignacionRequest request) {

        List<MedioDeAsignacionResponse> reporteMedioAsignacionList = reporteService.medioDeAsignacionEvento(request);

        return ResponseEntity.status(HttpStatus.OK).body(reporteMedioAsignacionList);
    }
}