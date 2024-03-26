package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.AsistenciaDTO;
import com.asi.inscripciones.mvp.dto.InstanciaSedeDTO;
import com.asi.inscripciones.mvp.dto.InstanciaSedeDTOResponse;
import com.asi.inscripciones.mvp.dto.SedeDTO;
import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.service.InstanciaSedeService;
import com.asi.inscripciones.mvp.util.Url;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.INSTANCIA_SEDES)
public class InstanciaSedeController {


    @Autowired
    private InstanciaSedeService instanciaSedeService;


    @GetMapping("/{id}")
    public ResponseEntity<List<InstanciaSedeDTOResponse>> getInstanciasDisponiblesById(final @PathVariable Long id){
        List<InstanciaSedeDTOResponse> response = instanciaSedeService.getDisponibleById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}/{cuil}")
    public ResponseEntity<AsistenciaDTO> getInstanciaSedeById(final @PathVariable Long id, final @PathVariable String cuil){
        AsistenciaDTO response = instanciaSedeService.validateStudentAndGetInstanciaSede(id, cuil);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(Url.INSTANCIAS+"/{instanciaId}")
    public ResponseEntity<Page<InstanciaSedeDTO>> getByOrganismoAndTipoAndUsuario(final @PathVariable Long instanciaId,
                                                                                  @PageableDefault(page = 0, size = 10, sort ="id")
                                                                                  final Pageable pageable) {

        List<InstanciaSede> sedeList = instanciaSedeService.getByInstancia(instanciaId,pageable);

        long count = instanciaSedeService.getByInstanciaCount(instanciaId);

        List<InstanciaSedeDTO> dtoList  = instanciaSedeService.convertToDTOList(sedeList);

        Page<InstanciaSedeDTO> pageReturn = new PageImpl<>(dtoList, pageable,count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.INSCRIPCION+"/{id}")
    public ResponseEntity<Page<InstanciaSede>> getByInstancia(final @PathVariable Long id,
                                                                @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<InstanciaSede> instanciaSedeList = instanciaSedeService.getInstanciaSedeByInscripcion(id,pageable);
        long count = instanciaSedeService.getByInscripcionCount(id);                                                       

        Page<InstanciaSede> pageReturn = new PageImpl<>(instanciaSedeList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }


}
