package com.asi.inscripciones.mvp.repository.redis;

import com.asi.inscripciones.mvp.dto.redis.InstanciaSedeRedisDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstanciaSedeRedisRepository extends CrudRepository<InstanciaSedeRedisDTO, Long> {
}
