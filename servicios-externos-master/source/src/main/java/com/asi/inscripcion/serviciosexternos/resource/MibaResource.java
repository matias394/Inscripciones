package com.asi.inscripcion.serviciosexternos.resource;

import com.asi.inscripcion.dto.UsuarioDTO;
import com.asi.inscripcion.serviciosexternos.facade.MibaFacade;
import com.asi.inscripcion.serviciosexternos.util.Url;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import io.quarkus.security.Authenticated;

@Authenticated
@Path(Url.API+Url.MIBA)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MibaResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    MibaFacade mibaFacade;


    @GET
    @Path(Url.TOKEN + Url._CODE_)
    public Response getToken(String code){
        logger.info("==== getToken ====");
        String response = mibaFacade.getToken(code);
        return Response.ok(response).build();
    }


    @GET
    @Path(Url.USER_INFO + Url._TOKEN_)
    public Response getInfoUser(String token){
        logger.info("==== getInfoUser ====");
        UsuarioDTO response = mibaFacade.getDataUser(token);
        return Response.ok(response).build();
    }


    @POST
    @Path(Url.LOGOUT + Url._REFRESH_TOKEN_)
    public Response getLogout(String refreshToken){
        logger.info("==== getLogout ====");
        String response = mibaFacade.getLogout(refreshToken);
        return Response.ok(response).build();
    }

}
