package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.dto.UserAssistanceDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;
import com.asi.inscripcion.serviciosexternos.repository.RepositorioQrRepository;
import com.asi.inscripcion.entity.RepositorioQR;

@ApplicationScoped
public class QrService {

    @Inject
    private RepositorioQrRepository repositorioQrRepository;

    protected final Logger logger = Logger.getLogger(getClass());


    public void saveQrToDB(RepositorioQR repositorioQR) {
        logger.info("saveQrToServer");
        repositorioQrRepository.save(repositorioQR);
    }


}
