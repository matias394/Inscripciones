package com.asi.inscripcion.escritura.resource;

import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import com.asi.inscripcion.escritura.facade.document.InscripcionFacade;
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


@Authenticated
@Path(Url.v1+ Url.INSCRIPCIONES)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InscripcionResource {

    @Inject
    InscripcionFacade inscripcionFacade;

    @POST
    public Uni<Response> saveInscription(CitizenResponseDTO citizenResponseDTO){

       Uni<CitizenResponse> response = inscripcionFacade.saveInscription(citizenResponseDTO);

        return response.map(item->
                Response.status(Response.Status.CREATED).entity(item).build()
            );

    }

}
