package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class OrganismoCategoriaRepositoryTest extends AbstractGenericTest{
        
    @Autowired
    OrganismoCategoriaRepository organismoCategoriaRepository;

    @Autowired
    OrganismoRepository organismoRepository;

    @Autowired
    CategoriaRepository CategoriaRepository;

    @Test
    @Order(1)
    public void saveTest(){

        Optional<Organismo> organismo = organismoRepository.findById(id);
        Optional<Categoria> categoria = CategoriaRepository.findById(id);
        OrganismoCategoria organismoCategoria = new OrganismoCategoria();
        organismoCategoria.setOrganismo(organismo.get());
        organismoCategoria.setCategoria(categoria.get());
        organismoCategoria.setEstado(ConstanteEstados.ACTIVO);

        organismoCategoria = organismoCategoriaRepository.save(organismoCategoria);

        assertNotNull(organismoCategoria);
    }

    @Test
    @Order(2)
    public void getByIdTest(){

        Optional<OrganismoCategoria> organismoCategoria = organismoCategoriaRepository.findById(id);

        assertNotNull(organismoCategoria.get());
    }

    
}
