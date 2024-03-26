package com.asi.inscripcion.serviciosexternos.service;

import org.jboss.logging.Logger;

import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.serviciosexternos.repository.CitizenResponseRepository;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CitizenResponseService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    CitizenResponseRepository responseRepository;

    public Uni<CitizenResponse> findById(String InscripcionIdMongo){
        return responseRepository.findById(InscripcionIdMongo);
    }

    @Transactional
    public Uni<CitizenResponse> softDeleteByMongoID(String mongoID, String deleteType){
        CitizenResponse response = responseRepository.findByIdAndDeleted(mongoID, false).await().indefinitely();
            logger.info("RESPUESTA 1 *************** : " +response);
            if(response != null){
                response.deleted = true;
                response.deleteType = deleteType; 
                logger.info("RESPUESTA 2 *************** : " +response);
                return responseRepository.update(response);
            }
        return null;
    }
}
