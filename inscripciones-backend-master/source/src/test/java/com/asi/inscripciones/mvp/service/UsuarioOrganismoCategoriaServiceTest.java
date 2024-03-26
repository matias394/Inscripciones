package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.entity.UsuarioOrganismoCategoria;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class UsuarioOrganismoCategoriaServiceTest extends AbstractGenericTest {

    @Autowired
    UsuarioOrganismoCategoriaService usuarioOrganismoCategoriaService;
    
    @Autowired
    OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    UsuarioService usuarioService;



    Usuario usuario;

    List<UsuarioOrganismoCategoria> uocListcc;

    List<OrganismoCategoria> organismoCategoriaList;


    @BeforeEach
    public void before(){

        usuario = usuarioService.getUserById(id);
        
        organismoCategoriaList =  organismoCategoriaService.getByIdOrganismoCategoriaID(id,List.of(id));

    }


    @Test
    @Order(1)
    public void loadTest(){

        uocListcc = usuarioOrganismoCategoriaService.load(usuario, organismoCategoriaList);
    
        assertNotNull(uocListcc);
    }


    @Test
    @Order(2)
    public void saveTest(){

        uocListcc = usuarioOrganismoCategoriaService.load(usuario, organismoCategoriaList);

        usuarioOrganismoCategoriaService.saveList(uocListcc);   
    }

}
