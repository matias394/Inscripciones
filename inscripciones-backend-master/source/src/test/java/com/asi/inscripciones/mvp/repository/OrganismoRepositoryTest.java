package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class OrganismoRepositoryTest extends AbstractGenericTest{
  
    @Autowired
    OrganismoRepository organismoRepository;

    @Test
    @Order(1)
    public void saveTest(){

        Organismo organismo = new Organismo();
        organismo.setNombre("organismo 2");
        organismo.setCreadoPor("admin");
        organismo.setModificadoPor("admin");
        organismo.setEstado(ConstanteEstados.ACTIVO);

        Organismo organismoTest = organismoRepository.save(organismo);

        assertNotNull(organismoTest);
    }

    @Test
    @Order(2)
    public void getByIdTest(){

        Optional<Organismo> organismo = organismoRepository.findById(id);

        assertNotNull(organismo.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

        String nombre = "nombre actualizado";
        Optional<Organismo> organismo = organismoRepository.findById(id);
        Organismo organismoTest = organismo.get();
        organismoTest.setNombre(nombre);
        organismoTest = organismoRepository.save(organismoTest);

        assertEquals(organismoTest.getNombre(), nombre);
    }
}
