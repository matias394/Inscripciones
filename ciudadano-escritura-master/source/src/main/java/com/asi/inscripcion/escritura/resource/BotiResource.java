package com.asi.inscripcion.escritura.resource;

import com.asi.inscripcion.dto.BotiDTO;
import com.asi.inscripcion.escritura.service.BotiService;
import com.asi.inscripcion.escritura.util.Url;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

@Authenticated
@Path(Url.v1+ Url.BOTI)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BotiResource {

    @Inject
    BotiService botiService;

    protected final Logger logger = Logger.getLogger(getClass());

    @POST
    public Uni<Response> boti(BotiDTO botiDTO){

        return botiService.emitBotiDTO(botiDTO)
                .onItem().transform(item->Response.status(Response.Status.OK).entity(item).build())
                .onFailure().invoke(error -> logger.error("Error=", error))
                .onFailure().recoverWithItem(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());

    }
}

