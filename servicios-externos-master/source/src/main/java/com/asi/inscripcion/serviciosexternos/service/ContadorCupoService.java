package com.asi.inscripcion.serviciosexternos.service;

import org.jboss.logging.Logger;

import com.asi.inscripcion.document.ContadorCupo;
import com.asi.inscripcion.serviciosexternos.repository.ContadorCupoRepository;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
@ApplicationScoped
public class ContadorCupoService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    ContadorCupoRepository contadorCupoRepository;

    @Transactional
    public Uni<ContadorCupo> reduceCounter (Long InstanciaSedeId, Integer cantidadCupos) {
        Uni<ContadorCupo> response = contadorCupoRepository.findByInstanciaSedeId(InstanciaSedeId);
        ContadorCupo cc = response.await().indefinitely();
        logger.info("RESPUESTA DEL CONTADOR ********** + " +cc);
        int newCounterValue = cc.getCounter() - cantidadCupos;
        cc.setCounter(newCounterValue >= 0 ? newCounterValue : 0);
        return contadorCupoRepository.update(cc);
    }
}
