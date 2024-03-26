package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class ModalidadRepositoryTest extends AbstractGenericTest{
    

    @Autowired
    ModalidadRepository modalidadRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){
        
        Modalidad modalidad = new Modalidad();
        modalidad.setNombre("nocturno");
        modalidad.setDescripcion("horario de noche");
        modalidad.setCreadoPor("admin");
        modalidad.setModificadoPor("admin");
        modalidad.setEstado(ConstanteEstados.ACTIVO);

        Modalidad modalidadTest = modalidadRepository.save(modalidad);

        assertNotNull(modalidadTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Modalidad> modalidad = modalidadRepository.findById(id);

        assertNotNull(modalidad.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

       String nuevoNombre = "tarde";
       Optional<Modalidad> modalidad = modalidadRepository.findById(id);

       Modalidad modalidadTest = modalidad.get();
       modalidadTest.setNombre(nuevoNombre);

       modalidadTest = modalidadRepository.save(modalidadTest);
       assertEquals(modalidadTest.getNombre(), nuevoNombre);

    }
}
