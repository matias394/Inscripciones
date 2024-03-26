package com.asi.inscripcion.escritura.resource;

import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import com.asi.inscripcion.escritura.facade.document.InscripcionFacade;
import com.asi.inscripcion.escritura.util.Url;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Authenticated
@Path(Url.v1+ Url.FORMULARIOS)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FormularioResource {

    @Inject
    InscripcionFacade inscripcionFacade;

    @GET
    @Path("/getResultsByCuilAndIdInstanciaSedeId/{cuil}/{instanciaSedeId}")
    public Uni<Response> getResultsByCuilAndIdInstanciaSedeId(String cuil, Long instanciaSedeId){
        Uni<CitizenResponse> response =  inscripcionFacade.getByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
        return response.map(item->
                Response.status(Response.Status.OK).entity(item).build()
        );
    }

    @GET
    @Path("/getCountByCuilAndIdInstanciaSedeId/{cuil}/{instanciaSedeId}")
    public Uni<Response> getCountByCuilAndIdInstanciaSedeId(String cuil, Long instanciaSedeId){
        Uni<Long> response =  inscripcionFacade.getCountByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
        return response.map(item->
                Response.status(Response.Status.OK).entity(item).build()
        );
    }

    @GET
    @Path("/getResultsByCuilAndIdInscripcion/{cuil}/{inscripcionId}")
    public Uni<Response> getResultsByCuilAndIdInscripcion(String cuil, Long inscripcionId){
        Uni<Long> response =  inscripcionFacade.getByCuilAndInscripcionId(cuil, inscripcionId);
        return response.map(item->
                Response.status(Response.Status.OK).entity(item).build()
        );
    }

    @GET
    @Path("/getCounterByinstanciaSedeId/{instanciaSedeId}")
    public Uni<Response> getCounterByinstanciaSedeId(Long instanciaSedeId){
        Uni<Long> response =  inscripcionFacade.getCounterByinstanciaSedeId(instanciaSedeId);
        return response.map(item->
                Response.status(Response.Status.OK).entity(item).build()
        );
    }

}
