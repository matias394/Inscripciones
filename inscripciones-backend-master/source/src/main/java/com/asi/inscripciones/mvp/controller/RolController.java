package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.RoleDTO;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.entity.RolPermiso;
import com.asi.inscripciones.mvp.mapper.RolMapper;
import com.asi.inscripciones.mvp.service.RolPermisoService;
import com.asi.inscripciones.mvp.service.RoleService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Log4j2
@RestController
@RequestMapping(Url.API+Url.ROLES)
public class RolController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private RolPermisoService rolPermisoService;

    @Autowired
    private RolMapper rolMapper;


    @PostMapping
    public ResponseEntity<Void> saveRole(final @RequestBody RoleDTO roleDTO) {

        Rol rol;
       
        roleService.valid(roleDTO, Accion.CREAR);

        try {

            rol = roleService.loadRol(roleDTO, Accion.CREAR);

            rol = roleService.saveRol(rol);

            List<RolPermiso> rolPermisoList = rolPermisoService.load(rol, roleDTO.permisos());

            rolPermisoService.saveRolPermisoList(rolPermisoList);

        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRoleById(final @PathVariable Long id) {
        
        Rol rol;

        RoleDTO roleDTO = RoleDTO.builder().id(id).build();

        roleService.valid(roleDTO, Accion.CONSULTAR);

        try {

            rol = roleService.getRolById(id);
            
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).body(rol);
    }

    @PutMapping
    public ResponseEntity<String> updateRole(final @RequestBody RoleDTO roleDTO) {
    
        Rol rol;

        roleService.valid(roleDTO, Accion.MODIFICAR);
        
        try {           

            rol = roleService.loadRol(roleDTO, Accion.MODIFICAR);

            roleService.updateRol(rol);
            
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(final @PathVariable Long id) {
        
        RoleDTO rolDTO = RoleDTO.builder().id(id).build();

        roleService.valid(rolDTO, Accion.ELIMINAR);
        
        try { 

            roleService.delete(id);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    public ResponseEntity<Page<Rol>> getAllRoleActive(final @PageableDefault(page=0, size=10) Pageable pageable) {
        
        Page<Rol> rolPage = roleService.getAllRoleAvtive(ConstanteEstados.ACTIVO, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(rolPage);
    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<RoleDTO>> rolList(){

        List<Rol> rolList = roleService.getStateAll(ConstanteEstados.ACTIVO);

        List<RoleDTO> rolDTOList =  rolMapper.map(rolList);

        return ResponseEntity.status(HttpStatus.OK).body(rolDTOList);
    }
        
}
