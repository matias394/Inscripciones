package com.asi.inscripciones.mvp.repository.redis;

import com.asi.inscripciones.mvp.dto.redis.InscripcionRedisDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InscripcionRedisRepository extends CrudRepository<InscripcionRedisDTO, Long> {
}
