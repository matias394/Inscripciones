package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

public class CategoriaRepositoryTest extends AbstractGenericTest{

    @Autowired
    CategoriaRepository categoriaRepository;

    @Test
    @Order(1)
    public void saveTest(){

        Categoria categoria = new Categoria();
        categoria.setNombre("categoria 1");
        categoria.setNivel("0");
        categoria.setPadreId(0L);
        categoria.setSeq("2");

        Categoria categoriaTest = categoriaRepository.save(categoria);

        assertNotNull(categoriaTest);
    }

    @Test
    @Order(2)
    public void getByIdTest(){

        Optional<Categoria> categoria = categoriaRepository.findById(id);

        assertNotNull(categoria.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

        String nombre = "nombre actualziado";
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        Categoria categoriaTest = categoria.get();
        categoriaTest.setNombre(nombre);
        categoriaTest = categoriaRepository.save(categoriaTest);

        assertEquals(categoriaTest.getNombre(), nombre);
    }
}
