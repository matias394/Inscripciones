package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class SedeServiceTest extends AbstractGenericTest{
    
    @Autowired
    SedeService sedeService;

    @Test
    public void getSedeByname(){
        
        Sede sede = sedeService.getByname("buenos aires");
        assertNotNull(sede);
    }

    @Test
    public void getSedeById(){
        Sede sede = sedeService.getSedeById(1L);

        assertNotNull(sede);
    }

    @Test
    public void getAllSede(){

        List<Sede> sedeList = sedeService.listAll();

        assertTrue(sedeList.size()>0);
    }

    @Test
    public void saveTest(){

        Sede sede = new Sede();

        sede.setNombre("rosario");
        sede.setDireccion("rosario");
        sede.setBloqueado(0);
        sede.setEmail("user@correo.com");
        sede.setPiso("ninguno");
        sede.setTelefono("321654987");
        sede.setEstado(ConstanteEstados.ACTIVO);        

        sede  = sedeService.saveSede(sede);

        assertNotNull(sede.getId());
    }

    @Test
    public void updateTest(){
        
        Sede sede = new Sede();

        sede.setId(1L);
        sede.setNombre("velez");
        sede.setDireccion("velez");
        sede.setEstado(ConstanteEstados.ACTIVO);  

        sede  = sedeService.updateSede(sede);
        
        assertNotNull(sede);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        sedeService.deleteSedeById(id);
        Sede sede = sedeService.getSedeById(1L);

        assertEquals(sede.getEstado(),0);

    }
}   
