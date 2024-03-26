package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class CorreoRepositoryTest extends AbstractGenericTest{


    @Autowired
    CorreoRepository correoRepository;
    
    @Test
    @Order(1)
    public void saveTest(){
        
        Correo correo = new Correo();
        correo.setNombre("inscripcion reingreso");
        correo.setAsunto("reingreso");
        correo.setDescripcion("reingreso alumnos");
        correo.setCreadoPor("admin");
        correo.setModificadoPor("admin");
        correo.setEstado(ConstanteEstados.ACTIVO);

        Correo correoTest = correoRepository.save(correo);

        assertNotNull(correoTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Correo> correo = correoRepository.findById(id);

        assertNotNull(correo.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

       String nuevoNombre = "solicitud";
       Optional<Correo> correo = correoRepository.findById(id);

       Correo correoTest = correo.get();
       correoTest.setNombre(nuevoNombre);

       correoTest = correoRepository.save(correoTest);
       assertEquals(correoTest.getNombre(), nuevoNombre);

    }
}

