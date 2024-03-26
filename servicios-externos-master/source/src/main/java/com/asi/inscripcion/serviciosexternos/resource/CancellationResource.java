package com.asi.inscripcion.serviciosexternos.resource;

import org.jboss.logging.Logger;

import com.asi.inscripcion.dto.CancelacionInformationDTO;
import com.asi.inscripcion.serviciosexternos.facade.CancellationFacade;
import com.asi.inscripcion.serviciosexternos.util.Url;
import io.quarkus.security.Authenticated;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Authenticated
@Path(Url.API+Url.FORMULARIO)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CancellationResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    CancellationFacade cancellationFacade;

    @GET
    @Path(Url.CANCELLATION + Url.MONGO)
    public Response getCancelacionInformationByMongoId(String mongoId) {
        logger.info("======== getCancelacionInformationByMongoId ========");
        CancelacionInformationDTO cancelacionInformationDTO = cancellationFacade.getCancellation(mongoId);
        return Response.ok(cancelacionInformationDTO).build();
    }

    @POST
    @Path(Url.CITIZEN)
    public Response cancelCitizenInscription(@QueryParam("mongoId") String mongoId) {
        logger.info("======== cancelCitizenInscription ========");
        Integer response = cancellationFacade.cancellation(mongoId);
        return Response.ok(response).build();
    }
}
