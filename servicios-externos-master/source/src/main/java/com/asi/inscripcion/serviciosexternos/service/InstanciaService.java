package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.entity.Instancia;
import com.asi.inscripcion.serviciosexternos.repository.InstanciaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.Optional;

@ApplicationScoped
public class InstanciaService {

    @Inject
    InstanciaRepository instanciaRepository;

    @Transactional
    public Instancia getInstanciaById(final Long id){
        Optional<Instancia> entity = instanciaRepository.findInstanciaById(id);
        return entity.orElseThrow(NotFoundException::new);
    }

    @Transactional
    public Object[] getInstanciaById1(Long instanciaId) {
        return  instanciaRepository.findInscripcionById1(instanciaId);
    }
}
