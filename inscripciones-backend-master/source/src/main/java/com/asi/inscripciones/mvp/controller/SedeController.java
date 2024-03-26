package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.SedeDTO;
import com.asi.inscripciones.mvp.dto.SedeFiltroDTO;
import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.mapper.SedeMapper;
import com.asi.inscripciones.mvp.service.SedeService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Log4j2
@RestController
@RequestMapping(Url.API+"/sede")
public class SedeController {


    @Autowired
    private SedeService sedeService;

    @Autowired
    private SedeMapper sedeMapper;

    @GetMapping(Url.ALL)
    public ResponseEntity<List<SedeDTO>> sedeList(){

        List<Sede> sedeList = sedeService.getStateAll(ConstanteEstados.ACTIVO);

        List<SedeDTO> sedeDTOList = sedeMapper.map(sedeList);

        return ResponseEntity.status(HttpStatus.OK).body(sedeDTOList);
    }

    @GetMapping
    public ResponseEntity<Page<SedeDTO>> sedes(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ){

        List<Sede> sede = sedeService.getAllPage(ConstanteEstados.ACTIVO, filter, pageable);

        List<SedeDTO> sedeDTOList =  sedeMapper.map(sede);

        long totalCount = sedeService.countAllSedes(ConstanteEstados.ACTIVO, filter);

        Page<SedeDTO> pageReturn = new PageImpl<>(sedeDTOList, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }


    @GetMapping(Url.SEDE_PROFESOR+"/{usuarioId}")
    public ResponseEntity<Page<SedeDTO>> getInstanciasByUsuarioId(
        @PathVariable Long usuarioId,
        @RequestParam(required = false) String filter,
        @PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable
    ) {

        List<Sede> sedeList = sedeService.getSedesByUsuarioId(usuarioId, filter, pageable);
        long count = sedeService.getSedesByUsuarioIdCount(usuarioId, filter);
        List<SedeDTO> sedeDTOList = sedeMapper.map(sedeList);
        Page<SedeDTO> pageReturn = new PageImpl<>(sedeDTOList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }





    @GetMapping("/{id}")
    public Sede getSedeById(final @PathVariable Long id){
        Sede sede = new Sede();
        try {
            sede = sedeService.getSedeById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return sede;
    }

    @PostMapping(Url.CREATE)
    public Sede saveSede(final @RequestBody SedeDTO sedeDTO){
        Sede response = new Sede();
        try {
            Sede sede = sedeService.loadSede(sedeDTO, Accion.CREAR);
            response = sedeService.saveSede(sede);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @PutMapping(Url.EDIT)
    public Sede updateSede(final @RequestBody SedeDTO sedeDTO){
        Sede response = new Sede();
        try {
            Sede sede = sedeService.loadSede(sedeDTO, Accion.MODIFICAR);
            response = sedeService.updateSede(sede);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @DeleteMapping("/{id}")
    public Boolean deleteSede(final @PathVariable Long id){
        Boolean isDelete = false;
        try {
            isDelete = sedeService.deleteSedeById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return isDelete;
    }


    @GetMapping(Url.SEDE_TIPO_PROFESOR+"/{tipoId}/{usuarioId}")
    public ResponseEntity<List<SedeDTO>> getInstanciasByUsuarioId(final @PathVariable Long tipoId, final @PathVariable Long usuarioId){

        List<Sede> sedeList =  sedeService.getSedesByTipoAndUsuario(tipoId,usuarioId);

        List<SedeDTO> sedeDTOList  = sedeMapper.map(sedeList);

        return ResponseEntity.status(HttpStatus.OK).body(sedeDTOList);
    }


    @GetMapping(Url.ORGANISMOS+Url.TIPOS+"/{organismoId}"+"/{tipoId}")
    public ResponseEntity<Page<SedeDTO>> getSedesByTipo(final @PathVariable Long organismoId, final @PathVariable Long tipoId,
                                                        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Sede> sedeList = sedeService.getByOrganismoAndTipo(organismoId,tipoId,pageable);

        long count = sedeService.getByOrganismoAndTipoCount(organismoId,tipoId);

        List<SedeDTO> sedeDTOList  = sedeMapper.map(sedeList);

        Page<SedeDTO> pageReturn = new PageImpl<>(sedeDTOList, pageable,count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }


    @GetMapping(Url.ORGANISMOS+Url.TIPOS+Url.USUARIOS+"/{organismoId}"+"/{tipoId}"+"/{usuarioId}")
    public ResponseEntity<Page<SedeDTO>> getByOrganismoAndTipoAndUsuario(
        @PathVariable Long organismoId,
        @PathVariable Long tipoId,
        @PathVariable Long usuarioId,
        @RequestParam(required = false) String filter,
        @PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable
    ) {

        List<Sede> sedeList = sedeService.getByOrganisoAndTipoAndUsuario(organismoId, tipoId, usuarioId, filter, pageable);
        long count = sedeService.getByOrganisoAndTipoAndUsuarioCount(organismoId, tipoId, usuarioId, filter);
        List<SedeDTO> sedeDTOList = sedeMapper.map(sedeList);
        Page<SedeDTO> pageReturn = new PageImpl<>(sedeDTOList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }

    @GetMapping("filtro"+"/{instanciaId}")
    public ResponseEntity<List<SedeFiltroDTO>> sedeList(@PathVariable Long instanciaId){

        List<Sede> sedeList = sedeService.getSedeByInstanciaId(instanciaId);

        List<SedeFiltroDTO> sedeDTOList = new ArrayList<>();

        sedeList.forEach(sede -> {
            SedeFiltroDTO sedeFiltroDTO = SedeFiltroDTO.builder()
                    .id(sede.getId())
                    .nombre(sede.getNombre())
                    .bloqueado(sede.getBloqueado()).build();

            sedeDTOList.add(sedeFiltroDTO);
        });

        return ResponseEntity.status(HttpStatus.OK).body(sedeDTOList);
    }
}
