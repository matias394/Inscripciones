package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class CorreoServiceTest extends AbstractGenericTest{
    
    @Autowired
    CorreoService correoService;

    @Test
    public void getCorreoByName(){
        Correo correo = correoService.getByname("inscripciones");
        assertNotNull(correo);
    }

    @Test
    public void getCorreoById(){
        Correo correo = correoService.getCorreoById(1L);

        assertNotNull(correo);
    }

    

    @Test
    public void saveTest(){

        Correo correo = new Correo();

        correo.setNombre("informacion");
        correo.setDescripcion("reinscripcion");
        correo.setHtml("Html");
        correo.setEstado(ConstanteEstados.ACTIVO);        

        correo  = correoService.saveCorreo(correo);

        assertNotNull(correo.getId());
    }

    @Test
    public void updateTest(){
        
        Correo correo = new Correo();

        correo.setId(1L);
        correo.setNombre("informacion");
        correo.setAsunto("reinscripcion");
        correo.setDescripcion("reinscripcion");
        correo.setHtml("Html");
        correo.setEstado(ConstanteEstados.ACTIVO);    

        correo  = correoService.updateCorreo(correo);
        
        assertNotNull(correo);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        correoService.deleteCorreoById(id);
        Correo sede = correoService.getCorreoById(1L);

        assertEquals(sede.getEstado(),0);

    }
}
