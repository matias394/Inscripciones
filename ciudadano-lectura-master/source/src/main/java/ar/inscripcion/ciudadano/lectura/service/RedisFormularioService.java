package ar.inscripcion.ciudadano.lectura.service;

import com.asi.inscripcion.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripcion.dto.redis.FormularioRedisDTO;
import io.quarkus.redis.datasource.ReactiveRedisDataSource;
import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.hash.HashCommands;
import io.quarkus.redis.datasource.keys.ReactiveKeyCommands;
import io.quarkus.redis.datasource.set.SetCommands;
import io.quarkus.redis.datasource.value.ReactiveValueCommands;
import io.vertx.mutiny.redis.client.RedisAPI;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@ApplicationScoped
public class RedisFormularioService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    RedisAPI redisAPI;

    private final ReactiveKeyCommands<String> keys;

   private final ReactiveValueCommands<String, FormularioInscripcionRedisDTO> values;

    private final HashCommands<String,String, String> commands;

    private final SetCommands<String, String> setCommands;

    public RedisFormularioService(ReactiveRedisDataSource reactiveRedisDataSource,RedisDataSource setCommands, RedisDataSource ds) {
        this.keys = reactiveRedisDataSource.key();
        this.values = reactiveRedisDataSource.value(FormularioInscripcionRedisDTO.class);
        this.commands = ds.hash(String.class);
        this.setCommands = setCommands.set(String.class);
    }

    public FormularioInscripcionRedisDTO findByIdInscripcion(String idInscripcion) {
        logger.info("==== Formulario findByIdInscripcion ====");
        logger.info("idInscripcion=" + idInscripcion);

        String key = "FormularioInscripcion:" + idInscripcion;

        Map<String, String> hashGet = commands.hgetall(key);

        if (!hashGet.isEmpty()) {
            FormularioInscripcionRedisDTO formularioInscripcionRedisDTO = mapToFormularioInscripcionRedisDTO(hashGet);
            return formularioInscripcionRedisDTO;
        }

        return new FormularioInscripcionRedisDTO();
    }

    public FormularioRedisDTO findByIdRefMongo(String idRefMongo) {
        logger.info("==== Formulario findByIdRefMongo ====");
        logger.info("idRefMongo=" + idRefMongo);

        String key = "Formulario:" + idRefMongo;

        Map<String, String> hashGet = commands.hgetall(key);

        if (!hashGet.isEmpty()) {
            return mapToFormularioRedisDTO(hashGet);
        }

        return new FormularioRedisDTO();
    }

    public FormularioRedisDTO mapToFormularioRedisDTO(Map<String, String> map){
        FormularioRedisDTO formularioRedisDTO = new FormularioRedisDTO();
        map.forEach((k,v)->{
            if(k.equals("id")){
                formularioRedisDTO.setId(v);
            }
            if (k.equals("nombre")){
                formularioRedisDTO.setNombre(v);
            }
            if (k.equals("descripcion")){
                formularioRedisDTO.setDescripcion(v);
            }
            if (k.equals("campos")){
                formularioRedisDTO.setCampos(v);
            }
            if (k.equals("puedeEditarseNombre")){
                formularioRedisDTO.setPuedeEditarseNombre("1".equalsIgnoreCase(v) ? true : false);
            }
        });
        logger.info("formularioRedisDTO: " + formularioRedisDTO);
        return formularioRedisDTO;
    }

    public FormularioInscripcionRedisDTO mapToFormularioInscripcionRedisDTO(Map<String, String> map){
        FormularioInscripcionRedisDTO formularioInscripcionRedisDTO = new FormularioInscripcionRedisDTO();
        map.forEach((k,v)->{
            if(k.equals("id")){
                formularioInscripcionRedisDTO.setId(Long.valueOf(v));
            }
            if(k.equals("idFormulario")){
                formularioInscripcionRedisDTO.setIdFormulario(Long.valueOf(v));
            }
            if (k.equals("idRefMongo")){
                formularioInscripcionRedisDTO.setIdRefMongo(v);
            }
            if (k.equals("idInscripcion")){
                formularioInscripcionRedisDTO.setIdInscripcion(Long.valueOf(v));
            }
        });

        logger.info("formularioInscripcionRedisDTO: " + formularioInscripcionRedisDTO);
        return formularioInscripcionRedisDTO;
    }
}
