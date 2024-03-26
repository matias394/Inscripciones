package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class ModalidadServiceTest extends AbstractGenericTest{
    
    @Autowired
    ModalidadService modalidadService;

    @Test
    public void getModalidadByname(){
        
        Modalidad modalidad = modalidadService.getByName("vespertina");
        assertNotNull(modalidad);
    }
    
    @Test
    public void getModalidadById(){
        Modalidad modalidad = modalidadService.getModalidadById(1L);

        assertNotNull(modalidad);
    }

    
    @Test
    public void saveTest(){

        Modalidad modalidad = new Modalidad();

        modalidad.setNombre("modalidad2");
        modalidad.setDescripcion("modalidad2");
        modalidad.setEstado(ConstanteEstados.ACTIVO);        

        modalidad  = modalidadService.saveModalidad(modalidad);

        assertNotNull(modalidad.getId());
    }

    @Test
    public void updateTest(){
        
        Modalidad modalidad = new Modalidad();

        modalidad.setId(1L);
        modalidad.setNombre("movilidad actualizada");
        modalidad.setDescripcion("movilidad actualizada");
        modalidad.setEstado(ConstanteEstados.ACTIVO);  

        modalidad  = modalidadService.updateModalidad(modalidad);
        
        assertNotNull(modalidad);
    }

    @Test
    public void deleteModalidadTest(){
                
        id = 1L;
        modalidadService.deleteModalidadById(id);
        Modalidad modalidad = modalidadService.getModalidadById(1L);

        assertEquals(modalidad.getEstado(),0);

    }
}
