package com.asi.inscripcion.escritura.repository;

import com.asi.inscripcion.document.CitizenResponse;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class CitizenResponseRepository implements ReactivePanacheMongoRepository<CitizenResponse> {

    public Uni<CitizenResponse> save(CitizenResponse response){
        return persist(response);
    }

    public Uni<CitizenResponse> findById(String id) {
        return find("cuil", id).firstResult();
    }

    public Uni<CitizenResponse> findByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId) {
        Uni<CitizenResponse> result = find("cuil = ?1 and instanciaSedeId = ?2", cuil, instanciaSedeId)
                .firstResult();
        return result;
    }

    public Uni<Long> countByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId) {
        Uni<Long> result = count("cuil = ?1 and instanciaSedeId = ?2", cuil, instanciaSedeId);
        return result;
    }

    public Uni<Long> countByCuilAndInscripcionId(String cuil, Long inscripcionId) {
        Uni<Long> result = count("cuil = ?1 and inscripcionId = ?2", cuil, inscripcionId);
        return result;
    }
}

