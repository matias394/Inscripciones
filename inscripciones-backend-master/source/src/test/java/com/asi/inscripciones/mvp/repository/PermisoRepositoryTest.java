package com.asi.inscripciones.mvp.repository;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;



public class PermisoRepositoryTest extends AbstractGenericTest{
    
    @Autowired
    PermisoRepository permisoRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){

        Permiso permiso = new Permiso();
        permiso.setNombre("Usuario");
        permiso.setEstado(ConstanteEstados.ACTIVO);

        Permiso permis = permisoRepository.save(permiso);
        id = permis.getId();

        assertNotNull(permis.getId());

    }

    @Test
    @Order(2)
    public void findByIdTest(){
        Optional<Permiso> permiso = permisoRepository.findById(id);

        assertTrue(permiso.get().getId()>0);
    }

    @Test
    @Order(3)
    public void updateTest(){

        String nuevoNombre = "nuevo";
        Optional<Permiso> permiso = permisoRepository.findById(id);

        Permiso permisoTest = permiso.get();
        permisoTest.setNombre(nuevoNombre);

        permisoTest = permisoRepository.save(permisoTest);

        assertEquals(permisoTest.getNombre(), nuevoNombre);
    }

    @Test
    @Order(4)
    public void countTest(){
        Long count = permisoRepository.count();
        
        assertTrue(count > 0);
    }


}
