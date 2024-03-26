package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class TipoRepositoryTest extends AbstractGenericTest{
    
    @Autowired
    TipoRepository tipoRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveTest(){
        
        Tipo tipo = new Tipo();
        tipo.setNombre("tipo");
        tipo.setDescripcion("tipo");
        tipo.setCreadoPor("admin");
        tipo.setModificadoPor("admin");
        tipo.setEstado(ConstanteEstados.ACTIVO);

        Tipo tipoTest = tipoRepository.save(tipo);

        assertNotNull(tipoTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Tipo> tipo = tipoRepository.findById(id);

        assertNotNull(tipo.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

       String nuevoNombre = "tipo";
       Optional<Tipo> tipo = tipoRepository.findById(id);

       Tipo tipoTest = tipo.get();
       tipoTest.setNombre(nuevoNombre);

       tipoTest = tipoRepository.save(tipoTest);
       assertEquals(tipoTest.getNombre(), nuevoNombre);

    }


}
