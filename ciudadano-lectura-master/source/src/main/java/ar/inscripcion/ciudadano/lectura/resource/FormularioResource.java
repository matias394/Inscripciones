package ar.inscripcion.ciudadano.lectura.resource;

import ar.inscripcion.ciudadano.lectura.service.RedisFormularioService;
import ar.inscripcion.ciudadano.lectura.util.Url;
import com.asi.inscripcion.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripcion.dto.redis.FormularioRedisDTO;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;


@Authenticated
@Path(Url.v1+Url.FORMS)
public class FormularioResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    RedisFormularioService redisFormularioService;

    @GET
    @Path(Url.GET_FORM_BY_ID_INSCRIPTION+Url._ID_)
    public Response getByIdInscripcion(String id) {
        logger.info("==== get ====");
        FormularioInscripcionRedisDTO formularioInscripcionRedisDTO = redisFormularioService.findByIdInscripcion(id);
        return Response.status(Response.Status.OK).entity(formularioInscripcionRedisDTO).build();
    }

    @GET
    @Path(Url.GET_FORM_BY_ID_REF_MONGO+Url._ID_)
    public Response getByIdRefMongo(String id) {
        logger.info("==== get ====");
        FormularioRedisDTO formularioRedisDTO = redisFormularioService.findByIdRefMongo(id);
        return Response.status(Response.Status.OK).entity(formularioRedisDTO).build();
    }

}
