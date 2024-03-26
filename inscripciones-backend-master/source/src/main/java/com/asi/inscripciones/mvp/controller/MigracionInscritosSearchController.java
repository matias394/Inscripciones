package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.exception.ElasticException;
import com.asi.inscripciones.mvp.service.InscritosSearchService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Url.API+Url.MIGRACION+Url.ELASTICSEARCH)
@Log4j2
public class MigracionInscritosSearchController {
	@Autowired
	private InscritosSearchService searchService;

	@Autowired
	public MigracionInscritosSearchController(InscritosSearchService searchService) {
	    this.searchService = searchService;
	}
	
	@PostMapping()
	public ResponseEntity<String> ejecutarMigracion(final Integer loteSize) {
		try{
			log.info("Llega al controller, al metodo ejecutarMigracion - loteSize: " + loteSize);
			long tiempoInicio = System.nanoTime();
			searchService.ejecutarMigracion(loteSize);
			long tiempoFin = System.nanoTime();
			long duracion = tiempoFin - tiempoInicio;
			log.info("El método searchService.ejecutarMigracion() tomó " + duracion/1_000_000_000.0 + " segundos.");
			return ResponseEntity.status(HttpStatus.OK).body("Se completo la migración con éxito en " + duracion/1_000_000_000.0 + " segundos");
		}catch (ElasticException e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
					body("Ocurrio un error durante la migración; verificar que el índice este creado correctamente");
		}
	}

	@PostMapping("/inscripto")
	public ResponseEntity<String> agregarInscripto(final Long inscripcionId, final String cuil) {
		try{
			log.info(String.format("Llega al controller, al metodo agregarInscripto con los siguientes datos: inscripcionId: %d - cuil: %s", inscripcionId, cuil));
			long tiempoInicio = System.nanoTime();
			searchService.agregarInscripto(inscripcionId, cuil);
			long tiempoFin = System.nanoTime();
			long duracion = tiempoFin - tiempoInicio;
			log.info("El método searchService.agregarInscripto() tomó " + duracion/1_000_000_000.0 + " segundos.");
			return ResponseEntity.status(HttpStatus.OK).body("Se agrego el incripto con éxito en " + duracion/1_000_000_000.0 + " segundos");
		}catch (ElasticException e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
					body(e.getMessage());
		}
	}

	@PostMapping("/inscriptos")
	public ResponseEntity<String> agregarInscriptosByInscripcionId(final Long inscripcionId) {
		try{
			log.info(String.format("Llega al controller, al metodo agregarInscriptosByInscripcionId con el inscripcionId: %d", inscripcionId));
			long tiempoInicio = System.nanoTime();
			searchService.agregarInscriptosByInscripcionId(inscripcionId);
			long tiempoFin = System.nanoTime();
			long duracion = tiempoFin - tiempoInicio;
			log.info("El método searchService.agregarInscripto() tomó " + duracion/1_000_000_000.0 + " segundos.");
			return ResponseEntity.status(HttpStatus.OK).body("Se agrego el incripto con éxito en " + duracion/1_000_000_000.0 + " segundos");
		}catch (ElasticException e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
					body(e.getMessage());
		}
	}
}
