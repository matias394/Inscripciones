package com.asi.inscripciones.mvp.service;


import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Import(TestFactory.class)
public class CategoriaServiceTest extends AbstractGenericTest {

    @Autowired
    CategoriaService categoriaService;
    
    @Test
    public void getAllTest(){

        Pageable pageable = PageRequest.of(0, 10);

        List<Categoria> categoriaList =  categoriaService.getAllPage(ConstanteEstados.ACTIVO, pageable);

        assertTrue(categoriaList.size()>0);
    }


    @Test
    public void getLevelTest(){
        List<Categoria> categoriaList =  categoriaService.getNivel("0");
        assertTrue(categoriaList.size()>0);
    }

    
    @Test
    public void getLevelUnoTest(){
        List<Categoria> categoriaList =  categoriaService.getNivel("0.2");
        assertTrue(categoriaList.size()>0);
    }


    @Test
    public void getLevelDosTest(){
        List<Categoria> categoriaList =  categoriaService.getNivel("0.2.4");
        assertTrue(categoriaList.size()>0);
    }

}
