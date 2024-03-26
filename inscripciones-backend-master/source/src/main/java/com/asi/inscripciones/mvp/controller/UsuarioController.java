package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.UsuarioDTO;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.mapper.UsuarioMapper;
import com.asi.inscripciones.mvp.service.InscripcionService;
import com.asi.inscripciones.mvp.service.OrganismoCategoriaService;
import com.asi.inscripciones.mvp.service.UsuarioOrganismoCategoriaService;
import com.asi.inscripciones.mvp.service.UsuarioService;
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

import java.util.List;


@Log4j2
@RestController
@RequestMapping(Url.API+Url.USUARIOS)
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioOrganismoCategoriaService uocService;

    @Autowired
    private OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private UsuarioMapper usuarioMapper;


    @PostMapping
    public ResponseEntity<Void> saveUser(final @RequestBody UsuarioDTO usuarioDTO) {
        
        Usuario usuario;

        usuarioService.valid(usuarioDTO, Accion.CREAR);
        
        try {

            usuario = usuarioService.loadUsuario(usuarioDTO,Accion.CREAR);
            
            usuario = usuarioService.saveUser(usuario);

        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }



    @PutMapping
    public ResponseEntity<String> updateUser(final @RequestBody UsuarioDTO usuarioDTO) {

        Usuario usuario;
        usuarioService.valid(usuarioDTO, Accion.MODIFICAR);

        try {

            usuario = usuarioService.loadUsuario(usuarioDTO,Accion.MODIFICAR);

            usuarioService.updateUser(usuario);

        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @GetMapping(Url.ORGANISMOS_PROFESOR+ "/{organismoId}/{inscripcionId}")
    public ResponseEntity<List<UsuarioDTO>> usuarioList(final @PathVariable Long organismoId,final @PathVariable Long inscripcionId){

        Inscripcion inscripcion = inscripcionService.getInscripcionById(inscripcionId);

        OrganismoCategoria organismoCategoria = inscripcion.getOrganismoCategoria();

        List<Usuario> usuarioList = uocService.getUsuarioByOrganismoCategoriaId(organismoCategoria.getId());

        List<UsuarioDTO> usuarioDTOList =  usuarioMapper.mapEntitytToDTO(usuarioList);

        return ResponseEntity.status(HttpStatus.OK).body(usuarioDTOList);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUserById(final @PathVariable Long id) {

        Usuario usuario;

        try {

            usuario = usuarioService.getUserById(id);
            
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(usuario);
    }



    @GetMapping(Url.CUIL+"/{cuil}")
    public ResponseEntity<UsuarioDTO> getUserCuilAD(final @PathVariable String cuil) {

        UsuarioDTO usuarioDTO =  usuarioService.getUserFromAD(cuil);
    
        return ResponseEntity.status(HttpStatus.OK).body(usuarioDTO);
    }


    @GetMapping
    public ResponseEntity<Page<Usuario>> getAllUsersAdmin(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ) {

        if (filter == null) filter = "";

        try {
            Page<Usuario> pageUsuario = usuarioService.getAllUserAdmin(ConstanteEstados.ACTIVO, filter, pageable);

            long totalCount = usuarioService.countAllUserAdmin(ConstanteEstados.ACTIVO, filter);

            Page<Usuario> finalPage = new PageImpl<>(pageUsuario.getContent(), pageable, totalCount);
    
            return ResponseEntity.status(HttpStatus.OK).body(finalPage);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

   
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(final @PathVariable Long id) {

        UsuarioDTO usuarioDTO = UsuarioDTO.builder().id(id).build();
       
        usuarioService.valid(usuarioDTO, Accion.ELIMINAR);
        
        try {
        
            usuarioService.deleteById(id);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       return ResponseEntity.status(HttpStatus.OK).build();
    }

    

}
