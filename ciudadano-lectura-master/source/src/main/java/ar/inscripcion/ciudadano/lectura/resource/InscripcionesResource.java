package ar.inscripcion.ciudadano.lectura.resource;

import ar.inscripcion.ciudadano.lectura.facade.InscripcionesFacade;
import ar.inscripcion.ciudadano.lectura.util.Url;
import com.asi.inscripcion.dto.redis.InscripcionRedisDTO;
import io.micrometer.core.annotation.Counted;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.quarkus.security.Authenticated;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;


@Authenticated
@Path(Url.v1+Url.INSCRIPTIONS)
public class InscripcionesResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    InscripcionesFacade inscripcionesFacade;
    @Inject
    MeterRegistry registry;

    private Counter miContador;


    @PostConstruct
    public void init() {
        miContador = registry.counter("contador_ingresos_by_id");
    }



    @GET
    @Path(Url._INSCRIPTION_ID_+Url._HASH_)
    public Response validHash(String inscriptionId, String hash) {

        logger.info("==== validForm ====");

        Boolean resultado = inscripcionesFacade.validInscription(inscriptionId,hash);
        return Response.status(Response.Status.OK).entity(resultado).build();

    }


    @GET
    @Path(Url._ID_)
    public Response getIncriptionById(String id) {

        logger.info("==== getIncripcionesById ====");
        miContador.increment();

        InscripcionRedisDTO inscripcionRedisDTO = inscripcionesFacade.findById(id);
        if(inscripcionRedisDTO==null){
            throw new NotFoundException();
        }
        return Response.status(Response.Status.OK).entity(inscripcionRedisDTO).build();
    }

    @GET
    @Path(Url.LOGIN_MIBA+Url._ID_)
    public Response getLoginMiba(String id) {

        logger.info("==== getLoginMiba ====");

        InscripcionRedisDTO inscripcionRedisDTO = inscripcionesFacade.findById(id);
        if(inscripcionRedisDTO==null){
            throw new NotFoundException();
        }
        return Response.status(Response.Status.OK).entity(inscripcionRedisDTO.getLoginMiba()).build();
    }


    @GET
    @Path(Url.NOTIFICATION+Url._ID_)
    public Response getNotificacion(String id) {

        logger.info("==== getNotificacion ====");

        InscripcionRedisDTO inscripcionRedisDTO = inscripcionesFacade.findById(id);
        if(inscripcionRedisDTO==null){
            throw new NotFoundException();
        }
        return Response.status(Response.Status.OK).entity(inscripcionRedisDTO.getNotificacion()).build();
    }
}


