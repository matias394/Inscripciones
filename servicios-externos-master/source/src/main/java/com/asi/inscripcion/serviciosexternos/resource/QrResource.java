package com.asi.inscripcion.serviciosexternos.resource;

import com.asi.inscripcion.serviciosexternos.facade.QrFacade;
import com.asi.inscripcion.serviciosexternos.util.Url;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.jboss.logging.Logger;
import com.asi.inscripcion.dto.UserAssistanceDTO;
import io.quarkus.security.Authenticated;

import jakarta.ws.rs.core.Response;

@Authenticated
@Path(Url.API+Url.QR)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class QrResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    QrFacade qrFacade;

    @Inject
    @ConfigProperty(name = "directory.web")
    String directorioWeb;

    @Inject
    @ConfigProperty(name = "frontend.url")
    String appRoute;

    @POST
    @Path("/getQr")
    public Response getQR(final @RequestBody UserAssistanceDTO info) throws Exception {
        String respuesta = qrFacade.generateQR(info);

        JsonObject json = Json.createObjectBuilder()
                .add("url", respuesta)
                .build();

        return Response.ok(json).build();
    }
}
