package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class EstadoRepositoryTest extends AbstractGenericTest{
   
    
    @Autowired
    EstadoRepository estadoRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){
        
        Estado estado = new Estado();
        estado.setNombre("procesado");
        estado.setDescripcion("esta inscrito");
        estado.setCreadoPor("admin");
        estado.setModificadoPor("admin");
        estado.setEstado(ConstanteEstados.ACTIVO);

        Estado estadoTest = estadoRepository.save(estado);

        assertNotNull(estadoTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Estado> estado = estadoRepository.findById(id);

        assertNotNull(estado.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

       String nuevoNombre = "tarde";
       Optional<Estado> estado = estadoRepository.findById(id);

       Estado estadoTest = estado.get();
       estadoTest.setNombre(nuevoNombre);

       estadoTest = estadoRepository.save(estadoTest);
       assertEquals(estadoTest.getNombre(), nuevoNombre);

    }
}
