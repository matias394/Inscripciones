package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.RoleDTO;
import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.mapper.RolMapper;
import com.asi.inscripciones.mvp.repository.RoleRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RoleService {

    @Autowired
    final private RoleRepository roleRepository;

    @Autowired
    private PermisoService permisoService;

    @Autowired
    private RolPermisoService rolPermisoService;


    @Autowired
    private RolMapper rolMapper;


    public Rol findByName(String nombre){

        Optional<Rol> role = roleRepository.findByName(nombre);
        return role.orElse(new Rol());

    }


    public Iterable<Rol> listAll() {
        
        return roleRepository.findAll();
    }


    public Rol getRolById(Long id) {

        Optional<Rol> role =  roleRepository.findById(id);

        if(role.isPresent()){
            List<Permiso> permisoList = rolPermisoService.getPermisoByIdRol(id);
            role.get().setPermisos(permisoList);
        }

        return role.orElse(new Rol());

    }


    public List<Rol> getList(List<Long> idList) {

        List<Rol> response = new ArrayList<>();

        idList.forEach(id->{
            response.add(roleRepository.findById(id).get());
        });

        return response;
    }

    public List<Rol> getStateAll(final Integer estado){
        List<Rol> rolList = roleRepository.getStateAll(estado);
        return rolList;
    }

    public List<Rol> getByIdRole(final Long roleId){

        List<Rol> rol = roleRepository.findByIdRole(roleId);

        return rol;
    }
    

    public Rol saveRol(final Rol rol) throws Exception {
        Rol response = roleRepository.save(rol);
        return response;
    }

    @Transactional
    public void updateRol(final Rol rol) {

        List<Permiso> permisoActual = rolPermisoService.getPermisoByIdRol(rol.getId());

        List<Permiso> permisoNuevos  = rol.getPermisos().stream().filter(item-> ! permisoActual.contains(item)).toList();

        List<Permiso> permisoEliminar = permisoActual.stream().filter(item-> ! rol.getPermisos().contains(item)).toList();

        roleRepository.save(rol);

        var nuevoList = rolPermisoService.loadRolPermisos(rol, permisoNuevos);

        var eliminarList = rolPermisoService.loadRolPermisos(rol, permisoEliminar);

        eliminarList.forEach(rolPermisoService::deleteByIdRolAndIdPermiso);

        nuevoList.forEach(rolPermisoService::saveRolPermiso);
        
    }


    public void delete(final Long id) {

       Optional<Rol> role = roleRepository.findById(id);
       role.get().setEstado(ConstanteEstados.INACTIVO);
       roleRepository.save(role.get());

    }


    public Page<Rol> getAllRole(final Pageable pageable) {
        return roleRepository.findAll(pageable);
    }

    
    public Page<Rol> getAllRoleAvtive(Integer estado, Pageable pageable) {

        Page<Rol> rolePage = roleRepository.findByEstado(estado,pageable);

        return rolePage;
    }


    public void valid(final RoleDTO rol, final Accion accion){

        if(accion.equals(Accion.CREAR)){

            if(ObjectUtils.isNotEmpty( rol.id()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);

        } else if(accion.equals(Accion.MODIFICAR)){
        
            if(ObjectUtils.isEmpty(rol.id()))
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
                
        } else if(accion.equals(Accion.MODIFICAR) ){
                    
            Optional<Rol> rolOptional = roleRepository.findById(rol.id());

            if(rolOptional.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        } else if (accion.equals(Accion.CONSULTAR)) {

            Optional<Rol> rolOptional = roleRepository.findById(rol.id());

            if(rolOptional.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                
        }

    }



    public Rol loadRol(final RoleDTO roleDTO, Accion accion){

        Rol rol = rolMapper.convertDtoToRol(roleDTO);

        if(accion.equals(Accion.MODIFICAR)){

            Rol rolActual = this.getRolById(roleDTO.id());

            List<Permiso> permisoList = permisoService.getAll(roleDTO.permisos());
            rol.setPermisos(permisoList); 
            rol.setCreado(rolActual.getCreado());
            rol.setCreadoPor(rolActual.getCreadoPor());
        }

        return rol;
    }


}
