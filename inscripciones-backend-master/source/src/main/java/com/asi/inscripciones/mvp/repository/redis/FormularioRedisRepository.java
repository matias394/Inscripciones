package com.asi.inscripciones.mvp.repository.redis;

import com.asi.inscripciones.mvp.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.FormularioRedisDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormularioRedisRepository extends CrudRepository<FormularioRedisDTO, Integer> {
}
