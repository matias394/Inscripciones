package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class TipoServiceTest extends AbstractGenericTest{
    
    @Autowired
    TipoService tipoService;

    @Test
    public void getTipoByName(){
        
        Tipo tipo = tipoService.getByName("de inscripcion");
        assertNotNull(tipo);
    }

    @Test
    public void getTipoById(){
        Tipo tipo = tipoService.getTipoById(1L);

        assertNotNull(tipo);
    }

    

    @Test
    public void saveTest(){

        Tipo tipo = new Tipo();

        tipo.setNombre("nuevo tipo");
        tipo.setDescripcion("nuevo tipo");
        tipo.setEstado(ConstanteEstados.ACTIVO);        

        tipo  = tipoService.saveTipo(tipo);

        assertNotNull(tipo.getId());
    }

    @Test
    public void updateTest(){
        
        Tipo tipo = new Tipo();

        tipo.setId(1L);
        tipo.setNombre("tipo acutalizado");
        tipo.setDescripcion("tipo acutalizado");
        tipo.setEstado(ConstanteEstados.ACTIVO);  

        tipo = tipoService.updateTipo(tipo);
        
        assertNotNull(tipo);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        tipoService.deleteTipoById(id);
        Tipo tipo = tipoService.getTipoById(1L);

        assertEquals(tipo.getEstado(),0);

    }

}
