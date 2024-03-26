package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.entity.InstanciaSede;
import com.asi.inscripcion.serviciosexternos.repository.InstanciaSedeRepository;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class InstanciaSedeService {

    @Inject
    InstanciaSedeRepository instanciaSedeRepository;

    @Transactional
    public Object[] findByInstanciaSedeId1(final Long id){
        return instanciaSedeRepository.findByInstanciaSedeId1(id);
    }

    @Blocking
    public Uni<InstanciaSede> findByInstanciaSedeId(final Long id){
        return instanciaSedeRepository.findByInstanciaSedeId(id);
    }

}
