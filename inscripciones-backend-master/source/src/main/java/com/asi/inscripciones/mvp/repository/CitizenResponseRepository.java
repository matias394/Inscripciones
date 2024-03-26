package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import reactor.core.publisher.Flux;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;


public interface CitizenResponseRepository extends MongoRepository<CitizenResponse, String> {

    Optional<CitizenResponse> findById(String id);
    List<CitizenResponse> findByCuilAndInscripcionIdAndDeleted(String cuil, Long InscripcionId, boolean deleted);
    CitizenResponse findByCuilMibaAndInscripcionIdAndDeleted(String cuilMiba, Long InscripcionId, boolean deleted);
    CitizenResponse findByCuilAndInstanciaIdAndDeleted(String cuilMiba, Long InstanciaId, boolean deleted);
    CitizenResponse findByCuilMibaAndInstanciaIdAndDeleted(String cuilMiba, Long InstanciaId, boolean deleted);
    CitizenResponse findByIdAndDeleted(String id, boolean deleted);
    CitizenResponse findByCuilAndInstanciaSedeIdAndDeleted(String cuilMiba, Long InstanciaSedeId, boolean deleted);
    List<CitizenResponse> findByDeleted(boolean deleted);
}
