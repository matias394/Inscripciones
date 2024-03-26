package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.entity.RolPermiso;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

public class RolPermisoRepositoryTest extends AbstractGenericTest{

    @Autowired
    RolPermisoRepository rolPermisoRepository;

    @Autowired
    PermisoRepository permisoRepository;

    @Autowired
    RoleRepository roleRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){
        Optional<Permiso> permiso = permisoRepository.findById(id);
        Optional<Rol> role = roleRepository.findById(id);

        RolPermiso rolPermiso = new RolPermiso();
        rolPermiso.setRol(role.get());
        rolPermiso.setPermiso(permiso.get());

        rolPermiso = rolPermisoRepository.save(rolPermiso);

        assertNotNull(rolPermiso.getId());
        
    }

    @Test
    @Order(2)
    public void findByIdTest(){
        Optional<RolPermiso> rolpermiso = rolPermisoRepository.findById(id);

        assertNotNull(rolpermiso.get());
    }

    @Test
    @Order(3)
    public void findByPermisoId(){

        List<RolPermiso> rolPermisoList = rolPermisoRepository.findByIdPermisos(id);
        assertTrue(rolPermisoList.size()>0);
    }

    


    
}
