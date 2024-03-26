package com.asi.inscripciones.mvp.repository;

import java.util.Optional;

import com.asi.inscripciones.mvp.entity.Rol;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

import static org.junit.jupiter.api.Assertions.*;


public class RolRepositoryTest extends AbstractGenericTest {
    
    @Autowired
    RoleRepository roleRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){

        Rol rol =  new Rol();
        rol.setNombre("Admin");
        rol.setEstado(ConstanteEstados.ACTIVO);

        Rol role = roleRepository.save(rol);
        id = role.getId();

        assertNotNull(role.getId());
    }


    @Test
    @Order(2)
    public void findByIdTest(){
        Optional<Rol>  role = roleRepository.findById(id);

        assertTrue(role.get().getId()>0);
    }

    @Test
    @Order(3)
    public void updateTest(){
        
        String nuevoNombre = "Nuevo";
        Optional<Rol>  role = roleRepository.findById(id);
        
        Rol rol = role.get();
        rol.setNombre(nuevoNombre);

        rol = roleRepository.save(rol);

        assertEquals(rol.getNombre(), nuevoNombre);
    }


    @Test
    @Order(4)
    public void countTest(){
        Long count = roleRepository.count();   

        assertTrue(count>0);
    }


    @Test
    @Order(5)
    public void findByEstadoLike(){

        Pageable pageable = PageRequest.of(0, 10, Sort.by("id"));

        Page<Rol> rolePage = roleRepository.findByEstado(ConstanteEstados.ACTIVO,pageable);

        assertTrue(rolePage.getSize()>0);

    }

}
