package com.asi.inscripcion.escritura.repository;

import com.asi.inscripcion.document.ContadorCupo;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ContadorCupoRepository implements ReactivePanacheMongoRepository<ContadorCupo> {
    public Uni<ContadorCupo> save(ContadorCupo contadorCupo){
        return persist(contadorCupo);
    }

    public Uni<ContadorCupo> findByInstanciaSedeId(Long instanciaSedeId) {
        return find("instanciaSedeId", instanciaSedeId).firstResult();
    }

    public Uni<ContadorCupo> update(ContadorCupo contadorCupo) {
        return persistOrUpdate(contadorCupo);
    }

    public Uni<Long> getCounterByinstanciaSedeId(Long instanciaSedeId) {

        Uni<Long> result = count("instanciaSedeId = ?1", instanciaSedeId);
        return result;
    }
}
