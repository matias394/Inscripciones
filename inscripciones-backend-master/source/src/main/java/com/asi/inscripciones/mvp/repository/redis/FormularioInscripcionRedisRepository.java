package com.asi.inscripciones.mvp.repository.redis;

import com.asi.inscripciones.mvp.dto.redis.FormularioInscripcionRedisDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormularioInscripcionRedisRepository extends CrudRepository<FormularioInscripcionRedisDTO, Integer> {

    Optional<FormularioInscripcionRedisDTO> findByIdRefMongo(String idRefMongo);

}
