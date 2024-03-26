package com.asi.inscripciones.mvp.controller.front;

import com.asi.inscripciones.mvp.dto.front.InscripcionFrontDTO;
import com.asi.inscripciones.mvp.service.InscripcionService;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
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

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.FRONT+Url.INSCRIPCION)
public class InscripcionFrontController {

    @Autowired
    private InscripcionService inscripcionService;

    @GetMapping("/{categoriaId}/{organismoId}")
    public ResponseEntity<Page<InscripcionFrontDTO>> getByCategoriaAndOrganismoPage(
            @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter,
            final @PathVariable Long categoriaId,
            final @PathVariable Long organismoId
    ){

        List<InscripcionFrontDTO> inscripcionDataDTO = inscripcionService.getByCategoriaAndOrganismoPage(categoriaId,organismoId, filter, pageable);

        long totalCount = inscripcionService.countInscripcionesByEstadoAndNombreAndOrganismosAndCategoria(ConstanteEstados.ACTIVO, filter, categoriaId, organismoId);

        Page<InscripcionFrontDTO> pageReturn = new PageImpl<>(inscripcionDataDTO, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }
}
