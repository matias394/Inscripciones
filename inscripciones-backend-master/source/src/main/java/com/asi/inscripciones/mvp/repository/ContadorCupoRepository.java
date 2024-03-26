package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;

import reactor.core.publisher.Mono;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ContadorCupoRepository extends ReactiveMongoRepository<ContadorCupo, String> {
    Mono<ContadorCupo> findByInstanciaId(Long InstanciaId);
    Mono<ContadorCupo> findByInstanciaSedeId(Long InstanciaSedeId);
}
