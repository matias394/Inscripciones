package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.entity.Inscripcion;
import com.asi.inscripcion.serviciosexternos.repository.InscripcionRepository;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class InscripcionService {

    @Inject
    InscripcionRepository inscripcionRepository;


    @Transactional
    public Object[] findInscripcionById1(final Long id){
        return inscripcionRepository.findInscripcionById1(id);
    }


    @Blocking
    public Uni<Inscripcion> getInscripcionById(final Long id){
        return inscripcionRepository.findInscripcionById(id);
    }
}
