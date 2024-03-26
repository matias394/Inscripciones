package com.asi.inscripcion.serviciosexternos.facade;

import com.asi.inscripcion.dto.BotiDTO;
import com.asi.inscripcion.serviciosexternos.service.BotiService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class BotiFacade {

    @Inject
    BotiService botiService;

    public Response sendSMS(BotiDTO botiDTO) {
        return botiService.botiIntent(botiDTO);
    }
}
