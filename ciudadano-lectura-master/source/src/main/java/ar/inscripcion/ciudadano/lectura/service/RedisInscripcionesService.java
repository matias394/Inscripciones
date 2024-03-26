package ar.inscripcion.ciudadano.lectura.service;

import com.asi.inscripcion.dto.redis.InscripcionRedisDTO;
import com.asi.inscripcion.entity.*;
import io.quarkus.redis.datasource.ReactiveRedisDataSource;
import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.hash.HashCommands;
import io.quarkus.redis.datasource.keys.ReactiveKeyCommands;
import io.quarkus.redis.datasource.value.ReactiveValueCommands;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;
import org.jboss.logging.Logger;

import java.time.LocalDate;
import java.util.Map;

@ApplicationScoped
public class RedisInscripcionesService {

    protected final Logger logger = Logger.getLogger(getClass());


    private final ReactiveKeyCommands<String> keys;

   private final ReactiveValueCommands<String, String> values;

    private final HashCommands<String, String, String> commands;

    public RedisInscripcionesService(ReactiveRedisDataSource reactiveRedisDataSource, RedisDataSource ds) {
        this.keys = reactiveRedisDataSource.key();
        this.values = reactiveRedisDataSource.value(String.class);
        this.commands = ds.hash(String.class);

    }

    public Boolean validInscription(final String inscriptionId, final String hash){
        logger.info("==== validInscription ====");
        logger.info("inscriptionId ="+inscriptionId);
        logger.info("hash="+hash);

        InscripcionRedisDTO inscripcion = findById(inscriptionId);

        if(inscripcion==null)
            throw new NotFoundException();

        String token = inscripcion.getToken();
        return token.equals(hash);
    }


    public InscripcionRedisDTO findById(String id) {
        logger.info("==== findById ====");
        logger.info("id="+id);

        InscripcionRedisDTO value = null;
        Map<String, String> hashGet = commands.hgetall("Inscripcion:"+id);

        if(!hashGet.isEmpty()){
            value = mapToInscripcionRedisDTO(hashGet);
        }
        return value;
    }



    public InscripcionRedisDTO mapToInscripcionRedisDTO(Map<String, String> map){

        InscripcionRedisDTO inscripcionRedisDTO = new InscripcionRedisDTO();
        OrganismoCategoria organismoCategoria = new OrganismoCategoria();
        Correo correo = new Correo();
        Notificacion notificacion = new Notificacion();
        Tipo tipo = new Tipo();
        Estado estadoInscripcion = new Estado();
        Organismo organismo = new Organismo();
        Categoria categoria = new Categoria();

        map.forEach((k,v)->{

            if(k.equals("id")){
                inscripcionRedisDTO.setId(Long.valueOf(v));
            }
            if (k.equals("cuposParaOtros")){
                inscripcionRedisDTO.setCuposParaOtros(Integer.valueOf(v));
            }
            if (k.equals("feriado")){
                inscripcionRedisDTO.setFeriado(Integer.valueOf(v));
            }
            if (k.equals("cuposGrupales")){
                inscripcionRedisDTO.setCuposGrupales(Integer.valueOf(v));
            }
            if (k.equals("loginMiba")){
                inscripcionRedisDTO.setLoginMiba(Integer.valueOf(v));
            }
            if (k.equals("cantidadMaxima")){
                inscripcionRedisDTO.setCantidadMaxima(Integer.valueOf(v));
            }
            if (k.equals("nombre")){
                inscripcionRedisDTO.setNombre(v);
            }
            if (k.equals("url")){
                inscripcionRedisDTO.setUrl(v);
            }
            if (k.equals("retornoUrl")){
                inscripcionRedisDTO.setRetornoUrl(v);
            }
            if (k.equals("organismo")){
                inscripcionRedisDTO.setOrganismo(Long.valueOf(v));
            }
            if (k.equals("categoria")){
                inscripcionRedisDTO.setCategoria(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.organismo.nombre")){
                organismo.setNombre(v);
            }
            if (k.equals("organismoCategoria.organismo.id")){
                organismo.setId(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.organismo.id")){
                organismo.setId(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.categoria.id")){
                categoria.setId(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.categoria.nombre")){
                categoria.setNombre(v);
            }
            if (k.equals("organismoCategoria.categoria.nivel")){
                categoria.setNivel(v);
            }
            if (k.equals("organismoCategoria.categoria.padreId")){
                categoria.setPadreId(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.categoria.seq")){
                categoria.setSeq(v);
            }
            if (k.equals("organismoCategoria.id")){
                organismoCategoria.setId(Long.valueOf(v));
            }
            if (k.equals("organismoCategoria.estado")){
                organismoCategoria.setEstado(Integer.valueOf(v));
            }
            if (k.equals("correo.id")){
                correo.setId(Long.valueOf(v));
            }
            if (k.equals("correo.nombre")){
                correo.setNombre(v);
            }
            if (k.equals("correo.estado")){
                correo.setEstado(Integer.valueOf(v));
            }
            if (k.equals("correo.descripcion")){
                correo.setDescripcion(v);
            }
            if (k.equals("correo.asunto")){
                correo.setAsunto(v);
            }
            if (k.equals("correo.html")){
                correo.setHtml(v);
            }
            if (k.equals("correo.creado")){
                correo.setCreado(LocalDate.parse(v));
            }
            if (k.equals("correo.creadoPor")){
                correo.setCreadoPor(v);
            }
            if (k.equals("correo.modificado")){
                correo.setModificado(LocalDate.parse(v));
            }
            if (k.equals("correo.modificadoPor")){
                correo.setModificadoPor(v);
            }
            if (k.equals("notificacion.id")){
                notificacion.setId(Long.valueOf(v));
            }
            if (k.equals("notificacion.nombre")){
                notificacion.setNombre(v);
            }
            if (k.equals("notificacion.descripcion")){
                notificacion.setDescripcion(v);
            }
            if (k.equals("notificacion.estado")){
                notificacion.setEstado(Integer.valueOf(v));
            }
            if (k.equals("notificacion.creado")){
                notificacion.setCreado(LocalDate.parse(v));
            }
            if (k.equals("notificacion.creadoPor")){
                notificacion.setCreadoPor(v);
            }
            if (k.equals("notificacion.modificado")){
                notificacion.setModificado(LocalDate.parse(v));
            }
            if (k.equals("notificacion.modificadoPor")){
                notificacion.setModificadoPor(v);
            }
            if (k.equals("tipo.id")){
                tipo.setId(Long.valueOf(v));
            }
            if (k.equals("tipo.nombre")){
                tipo.setNombre(v);
            }
            if (k.equals("tipo.descripcion")){
                tipo.setDescripcion(v);
            }
            if (k.equals("tipo.estado")){
                tipo.setEstado(Integer.valueOf(v));
            }
            if (k.equals("tipo.creado")){
                tipo.setCreado(LocalDate.parse(v));
            }
            if (k.equals("tipo.creadoPor")){
                tipo.setCreadoPor(v);
            }
            if (k.equals("tipo.modificado")){
                tipo.setModificado(LocalDate.parse(v));
            }
            if (k.equals("tipo.modificadoPor")){
                tipo.setModificadoPor(v);
            }
            if (k.equals("estadoInscripcion.id")){
                estadoInscripcion.setId(Long.valueOf(v));
            }
            if (k.equals("estadoInscripcion.nombre")){
                estadoInscripcion.setNombre(v);
            }
            if (k.equals("estadoInscripcion.descripcion")){
                estadoInscripcion.setDescripcion(v);
            }
            if (k.equals("estadoInscripcion.estado")){
                estadoInscripcion.setEstado(Integer.valueOf(v));
            }
            if (k.equals("estadoInscripcion.creado")){
                estadoInscripcion.setCreado(LocalDate.parse(v));
            }
            if (k.equals("estadoInscripcion.creadoPor")){
                estadoInscripcion.setCreadoPor(v);
            }
            if (k.equals("estadoInscripcion.modificado")){
                estadoInscripcion.setModificado(LocalDate.parse(v));
            }
            if (k.equals("estadoInscripcion.modificadoPor")){
                estadoInscripcion.setModificadoPor(v);
            }
            if(k.equals("token")){
                inscripcionRedisDTO.setToken(v);
            }

        });
        organismoCategoria.setOrganismo(organismo);
        organismoCategoria.setCategoria(categoria);

        inscripcionRedisDTO.setOrganismoCategoria(organismoCategoria);
        inscripcionRedisDTO.setCorreo(correo);
        inscripcionRedisDTO.setNotificacion(notificacion);
        inscripcionRedisDTO.setTipo(tipo);
        inscripcionRedisDTO.setEstadoInscripcion(estadoInscripcion);
        inscripcionRedisDTO.setInstancias(null);
        inscripcionRedisDTO.setFormularioInscripcion(null);

        return inscripcionRedisDTO;
    }

}
