package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.PermisoDTO;
import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.mapper.PermisoMapper;
import com.asi.inscripciones.mvp.service.PermisoService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Log4j2
@RestController
@RequestMapping(Url.API+Url.PERMISOS)
public class PermisoController {
    
    @Autowired
    private PermisoService permisoService;

    @Autowired
    private PermisoMapper permisoMapper;

    

    @PostMapping
    public ResponseEntity<Void> savePermiso(@RequestBody PermisoDTO permisoDTO) {

        permisoService.valid(permisoDTO, Accion.CREAR);

        try {

            Permiso permiso = permisoService.loadPermiso(permisoDTO,Accion.CREAR);

            permisoService.savePermiso(permiso);
        
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/{id}")
    public ResponseEntity<PermisoDTO> getPermisoById(@PathVariable Long id) {


       Permiso permiso;

       PermisoDTO permisoDTO = PermisoDTO.builder().id(id).build();

       permisoService.valid(permisoDTO, Accion.CONSULTAR);

       try {

            permiso = permisoService.getById(id);

            permisoDTO = permisoMapper.convertPermisoToDto(permiso);

        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        

        return ResponseEntity.status(HttpStatus.OK).body(permisoDTO);
    }



    @GetMapping
    public ResponseEntity<Page<PermisoDTO>> getAllPermisos(Pageable pageable) {

        List<Permiso> permisoList  = permisoService.getAllPermiso(ConstanteEstados.ACTIVO, pageable);
        
        List<PermisoDTO> permisoDTOList  = permisoMapper.map(permisoList);

        Page<PermisoDTO> permisoPage = new PageImpl<>(permisoDTOList,pageable,permisoDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(permisoPage);
    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<PermisoDTO>> permisoList(){

        List<Permiso> permisoList = permisoService.getStateAll(ConstanteEstados.ACTIVO);

        List<PermisoDTO> permisoDTOList =  permisoMapper.map(permisoList);

        return ResponseEntity.status(HttpStatus.OK).body(permisoDTOList);
    }

    @PutMapping
    public ResponseEntity<Void> updatePermiso(final @RequestBody PermisoDTO permisoDTO) {

        permisoService.valid(permisoDTO, Accion.MODIFICAR);

        try {

            Permiso permiso = permisoService.loadPermiso(permisoDTO,Accion.MODIFICAR);

            permisoService.update(permiso);
        
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePermiso(final @PathVariable Long id) {

        PermisoDTO permisoDTO =  PermisoDTO.builder().id(id).build();;
       
        permisoService.valid(permisoDTO, Accion.ELIMINAR);
        
        try {
        
            permisoService.deleteById(id);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       return ResponseEntity.status(HttpStatus.OK).build();
    }
  
}
