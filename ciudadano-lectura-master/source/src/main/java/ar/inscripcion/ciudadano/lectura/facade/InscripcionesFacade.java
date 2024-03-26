package ar.inscripcion.ciudadano.lectura.facade;

import ar.inscripcion.ciudadano.lectura.service.RedisInscripcionesService;
import com.asi.inscripcion.dto.redis.InscripcionRedisDTO;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class InscripcionesFacade {


    @Inject
    RedisInscripcionesService redisInscripcionesService;

    @Inject
    MeterRegistry registry;

    private Timer timer;

    @PostConstruct
    public void init() {
        timer = registry.timer("time_findById");
    }


    public Boolean validInscription(final String inscriptionId, final String hash){
        return redisInscripcionesService.validInscription(inscriptionId,hash);
    }


    public InscripcionRedisDTO findById(String id) {
        return timer.record(()->
            redisInscripcionesService.findById(id)
        );
    }

}
