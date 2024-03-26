package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

public class SedeRepositoryTest extends AbstractGenericTest{
  
    
    @Autowired
    SedeRepository sedeRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){

        Sede sede = new Sede();
        sede.setNombre("barrio norte");
        sede.setDireccion("San Isidro");
        sede.setPiso("sin piso");
        sede.setEmail("sanisidro@correo.com");
        sede.setTelefono("159357456");
        sede.setBloqueado(1);

        Sede sedeTest = sedeRepository.save(sede);

        assertNotNull(sedeTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Sede> sede = sedeRepository.findById(id);

        assertNotNull(sede.get());
    }

    @Test
    @Order(3)
    public void updateTest(){
        String nuevoNombre = "palermo chico";
        Optional<Sede> sede = sedeRepository.findById(id);

        Sede sedeTest = sede.get();
        sedeTest.setNombre(nuevoNombre);
        sedeTest = sedeRepository.save(sedeTest);

        assertEquals(sedeTest.getNombre(), nuevoNombre);
    }
}
