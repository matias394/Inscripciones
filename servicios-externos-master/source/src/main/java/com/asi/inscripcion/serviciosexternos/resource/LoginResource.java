package com.asi.inscripcion.serviciosexternos.resource;

import com.asi.inscripcion.dto.TokenDTO;
import com.asi.inscripcion.serviciosexternos.facade.UserFacade;
import com.asi.inscripcion.serviciosexternos.util.Url;

import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

@PermitAll
@Path(Url.API+Url.LOGIN)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginResource {

    protected final Logger logger = Logger.getLogger(getClass());


    @Inject
    UserFacade userFacade;

    @POST
    public Response login(@QueryParam("cuil") String cuil, @QueryParam("password") String password){

        logger.info("======== LOGIN ========");
        logger.info("cuil = "+cuil);

        TokenDTO tokenDTO = userFacade.getTokenUser(cuil,password);

        return Response.ok(tokenDTO).build();
    }

}
