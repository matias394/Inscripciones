package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import com.asi.inscripciones.mvp.entity.Formulario;
import com.asi.inscripciones.mvp.entity.FormularioInscripcion;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

public class FormularioInscripcionRepositoryTest extends AbstractGenericTest {
    
    @Autowired
    FormularioInscripcionRepository formularioInscripcionRepository;

    @Autowired
    FormularioRepository formularioRepository;

    @Autowired
    InscripcionRepository inscripcionRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveFormularioInscripcionTest(){

        Optional<Formulario> formulario = formularioRepository.findById(id);
        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

    
        FormularioInscripcion formularioInscripcion = new FormularioInscripcion();

        formularioInscripcion.setFormulario(formulario.get());
        formularioInscripcion.setInscripcion(inscripcion.get());
        
        
        formularioInscripcion = formularioInscripcionRepository.save(formularioInscripcion);

        assertNotNull(formularioInscripcion.getId());
        
    }

    @Test
    @Order(2)
    public void findByIdTest(){
       Optional<FormularioInscripcion>  formularioInscripcion =  formularioInscripcionRepository.findById(id);
       assertTrue(formularioInscripcion.get().getId()>0);
    }

    @Test
    @Order(3)
    public void updateTest(){

        Optional<Formulario> formulario = formularioRepository.findById(id);
        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);
            
        Optional<FormularioInscripcion>  formularioInscripcion =  formularioInscripcionRepository.findById(id);
        formularioInscripcion.get().setFormulario(formulario.get());
        formularioInscripcion.get().setInscripcion(inscripcion.get());

        FormularioInscripcion formularioInscripcionTest = formularioInscripcionRepository.save(formularioInscripcion.get());

        assertEquals(formularioInscripcionTest.getFormulario(), formulario.get());
    }


    
    @Test
    @Order(4)
    public void findByIdInscripcionTest(){
       //List<FormularioInscripcion>  list =  formularioInscripcionRepository.findByIdInscripcion(id);
       //assertTrue(list.size() >0);
    }

    
}
