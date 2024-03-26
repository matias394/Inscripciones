package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.entity.Correo;
import com.asi.inscripcion.serviciosexternos.repository.CorreoRepository;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CorreoService {

    @Inject
    CorreoRepository correoRepository;

    @Blocking
    public Uni<Correo> findCorreoById(final Long id){
        return correoRepository.findCorreoById(id);
    }
}
