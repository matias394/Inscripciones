package com.asi.inscripcion.serviciosexternos.facade;

import com.asi.inscripcion.dto.DopplerDTO;
import com.asi.inscripcion.serviciosexternos.service.*;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

@ApplicationScoped
public class DopplerFacade {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    DopplerService dopplerService;

    @Inject
    CorreoService correoService;

    @Inject
    InstanciaService instanciaService;

    @Inject
    InstanciaSedeService instanciaSedeService;

    @Inject
    InscripcionService inscripcionService;

    @Transactional
    @Blocking
    public Uni<String> sendEmail(DopplerDTO doppler) {
        logger.info("Enter To Async");
        return correoService.findCorreoById(doppler.getCorreoId())
            .flatMap(correoExits -> {
                logger.info("correoExits: " + correoExits);
                if (correoExits != null) {
                    return getSedeDireccion(doppler)
                            .flatMap(sede -> dopplerService.sendDoppler(doppler, correoExits, sede));
                } else {
                    return Uni.createFrom().failure(new RuntimeException("Correo no encontrado."));
                }
            });
        }



    public Uni<String> getSedeDireccion (DopplerDTO doppler) {

        Long instanciaSedeId = Long.valueOf(doppler.getInstanciaSede());

        try {
            return instanciaSedeService.findByInstanciaSedeId(instanciaSedeId).onItem().transform(instanciaSede -> {
                Boolean isPresencial = instanciaSede.getInstancia().getModalidad().getId().equals(1L);
                if (isPresencial) {
                    logger.info("isPresencial");
                    return instanciaSede.getSede().getDireccion();
                } else {
                    logger.info("isVirtual");
                    String url = instanciaSede.getUrl();
                    return "<a href=\"" + url + "\" style=\"color:blue; text-decoration: underline\">Sede Virtual</a>";
                }
            });

        } catch (Exception e) {
            logger.error("Error en la obtención de InstanciaSede", e);
            return null;
        }

    }

}
