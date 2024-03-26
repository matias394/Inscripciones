package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.InscritosFiltroSearchDTO;
import com.asi.inscripciones.mvp.dto.InscritosSearchDTO;
import com.asi.inscripciones.mvp.service.InscritosSearchService;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(Url.API+Url.REPORTES+Url.ELASTICSEARCH)
@Log4j2
public class InscritosSearchController {
	@Autowired
	private InscritosSearchService searchService;

	@Autowired
	public InscritosSearchController(InscritosSearchService searchService) {
	    this.searchService = searchService;
	}
	
	@PostMapping("/buscarReporte")
	@ResponseBody
	public ResponseEntity<Page<InscritosSearchDTO>> fetchInscritosByFilters (@PageableDefault(page = 0, size = 10, sort ="id")
																				 final Pageable pageable,
																			 @RequestBody InscritosFiltroSearchDTO inscritosFiltroSearchDTO) {

		List<InscritosSearchDTO> data = searchService.processSearch(inscritosFiltroSearchDTO.getCategoria()
				,inscritosFiltroSearchDTO.getInstanciaId()
				,inscritosFiltroSearchDTO.getInscripcionId()
				,inscritosFiltroSearchDTO.getSedeId()
				,"true"
				, inscritosFiltroSearchDTO.getEstado()
				, pageable);
	    log.info("data {}",data);

		long totalCount = searchService.processSearchAllCount(inscritosFiltroSearchDTO.getCategoria()
				,inscritosFiltroSearchDTO.getInstanciaId()
				,inscritosFiltroSearchDTO.getInscripcionId()
				,inscritosFiltroSearchDTO.getSedeId()
				,"true"
				, inscritosFiltroSearchDTO.getEstado());
		Page<InscritosSearchDTO> pageReturn = new PageImpl<>(data, pageable, totalCount);

		return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
	  }

	@PostMapping("/buscarReporte/all")
	@ResponseBody
	public ResponseEntity<List<InscritosSearchDTO>> fetchInscritosByFiltersAll (@RequestBody InscritosFiltroSearchDTO inscritosFiltroSearchDTO) {

		List<InscritosSearchDTO> data = searchService.processSearchAll(inscritosFiltroSearchDTO.getCategoria()
				,inscritosFiltroSearchDTO.getInstanciaId()
				,inscritosFiltroSearchDTO.getInscripcionId()
				,inscritosFiltroSearchDTO.getSedeId()
				,"true"
				, inscritosFiltroSearchDTO.getEstado()) ;
		log.info("data {}",data);


		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	@GetMapping("/buscarReporte/organismoId")
	@ResponseBody
	public ResponseEntity<List<InscritosSearchDTO>> fetchInscritosByFiltersByIdCategoria (@RequestParam("categoriaId") String categoriaId) {

		List<InscritosSearchDTO> data = searchService.processSearchAllByIdCategoria(categoriaId,"true") ;
		log.info("data {}",data);


		return ResponseEntity.status(HttpStatus.OK).body(data);
	}
}
