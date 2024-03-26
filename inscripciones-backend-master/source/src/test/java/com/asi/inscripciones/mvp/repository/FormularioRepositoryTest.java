package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Formulario;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class FormularioRepositoryTest extends AbstractGenericTest{
    

    @Autowired
    FormularioRepository formularioRepository;

    Long id = 1L;

    @Test
    @Order(1)
    public void getTest(){
        Optional<Formulario> formulario = formularioRepository.findById(id);
        assertTrue(formulario.get().getId() > 0);
    }

    @Test
    @Order(2)
    public void saveFormulario(){
        
        Formulario formulario = new Formulario();

        formulario.setNombre("formulario test2");
        formulario.setDescripcion("formulario test2");
        formulario.setEstado(ConstanteEstados.ACTIVO);

        formulario = formularioRepository.save(formulario);

        assertNotNull(formulario.getId());
    }

    @Test
    @Order(3)
    public void updateFormulario(){
        String nombreNuevo = "nombre actualizado";

        Optional<Formulario> formulario = formularioRepository.findById(id);
        formulario.get().setNombre(nombreNuevo);
        Formulario formularioTest = formularioRepository.save(formulario.get());

        assertEquals(formularioTest.getNombre(), nombreNuevo);
    }

    @Test
    @Order(4)
    public void deletFormulario(){

        Optional<Formulario> formulario = formularioRepository.findById(id);
        formulario.get().setEstado(0);
        Formulario formularioTest = formularioRepository.save(formulario.get());

        assertEquals(formularioTest.getEstado(),0);
    }
}
