package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class OrganismoCategoriaServiceTest extends AbstractGenericTest {
    
    @Autowired
    OrganismoCategoriaService organismoCategoriaService;


    @Test
    public void getByIdOrganismoCategoriaTest(){

        List<OrganismoCategoria> list = organismoCategoriaService.getByIdOrganismoCategoriaID(id, List.of(id));
    
        assertNotNull(list);
    }
    
}
