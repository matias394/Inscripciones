package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class EstadoServiceTest extends AbstractGenericTest{
    
    @Autowired
    EstadoService estadoService;

    @Test
    public void getEstadoByName(){
        
        Estado estado = estadoService.getByName("en proceso");
        assertNotNull(estado);
    }

    @Test
    public void getEstadoById(){
        Estado estado = estadoService.getEstadoById(1L);

        assertNotNull(estado);
    }


    @Test
    public void saveTest(){

        Estado estado = new Estado();

        estado.setNombre("estado");
        estado.setDescripcion("estado estado");
        estado.setEstado(ConstanteEstados.ACTIVO);        

        estado  = estadoService.saveEstado(estado);

        assertNotNull(estado.getId());
    }

    @Test
    public void updateTest(){
        
        Estado estado = new Estado();

        estado.setId(1L);
        estado.setNombre("estado actualizado");
        estado.setDescripcion("estado actualizado");
        estado.setEstado(ConstanteEstados.ACTIVO);  

        estado  = estadoService.updateEstado(estado);
        
        assertNotNull(estado);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        estadoService.deleteEstadoById(id);
        Estado estado = estadoService.getEstadoById(1L);

        assertEquals(estado.getEstado(),0);

    }
}
