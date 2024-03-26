package ar.inscripcion.ciudadano.lectura.resource;

import ar.inscripcion.ciudadano.lectura.dto.PaginatedResponse;
import ar.inscripcion.ciudadano.lectura.service.RedisInstanciaSedeService;
import ar.inscripcion.ciudadano.lectura.util.Url;
import com.asi.inscripcion.dto.redis.InstanciaSedeRedisDTO;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.Collections;
import java.util.List;

@Authenticated
@Path(Url.v1+Url.INSTANCE_HEADQUARTERS)
public class InstanciaSedeResource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    RedisInstanciaSedeService redisInstanciaSedeService;

    @GET
    @Path(Url.INSCRIPTIONS + Url.SEARCH + Url._ID_)
    public Response getByInstanciaBusqueda(String id,
                                           @QueryParam("busqueda") String busqueda,
                                           @QueryParam("page") Integer page,
                                           @QueryParam("size") Integer size,
                                           @QueryParam("sort") String sort) {
        logger.info("==== getByInstanciaBusqueda ====");

        PaginatedResponse<InstanciaSedeRedisDTO> paginatedResults = redisInstanciaSedeService.busqueda(id, busqueda, page, size, sort);

        if (paginatedResults.isEmpty()) {
            paginatedResults = new PaginatedResponse<>(Collections.emptyList(), 0, size, true, true, 0, 0, true, 0);
        }

        return Response.status(Response.Status.OK).entity(paginatedResults).build();
    }




}
