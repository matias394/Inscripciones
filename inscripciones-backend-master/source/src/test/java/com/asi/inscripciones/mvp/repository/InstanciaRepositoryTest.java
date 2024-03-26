package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

public class InstanciaRepositoryTest extends AbstractGenericTest{
    
    @Autowired
    InstanciaRepository instanciaRepository;

    @Autowired
    InscripcionRepository inscripcionRepository;

    //@Autowired
    //ClaseSedeRepository claseSedeRepository;


    @Test
    @Order(1)
    public void getTest(){
        Optional<Instancia> instancia = instanciaRepository.findById(id);
        assertTrue(instancia.get().getId()>0);
    }

    @Test
    @Order(2)
    public void getAllTest(){
        List<Instancia> instancia = (List<Instancia>) instanciaRepository.findAll();
        assertTrue(instancia.size()>0);
    }

    @Test
    @Order(3)
    public void saveTest(){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);
        List<ClaseSede> claseSedeList = claseSedeRepository.findClaseSedeByInstanciaId(id);
    
        Instancia instancia = new Instancia();

        instancia.setInscripcion(inscripcion.get());
        instancia.setClaseSedeList(claseSedeList);
        instancia.setFechaInicio(LocalDate.now());
        instancia.setFechaFin(LocalDate.now());
                
        instancia = instanciaRepository.save(instancia);

        assertNotNull(instancia.getId());
        
    }

    @Test
    @Order(4)
    public void getInstanciasByTipoSede(){
        List<Instancia> instanciaList = instanciaRepository.findInstanciaByTipoSede(1L,2L);

        assertNotNull(instanciaList);
    }
}
