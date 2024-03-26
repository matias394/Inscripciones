package com.asi.inscripcion.serviciosexternos.service;


import com.asi.inscripcion.serviciosexternos.repository.OrganismoCategoriaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class OrganismoCategoriaService {

    @Inject
    OrganismoCategoriaRepository repository;


    @Transactional
    public Object[] findByIdGetObject(Long id){
        return repository.findByIdGetObject(id);
    }

}
