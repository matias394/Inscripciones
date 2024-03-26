package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.document.ContadorCupo;

import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ContadorCupoRepository implements ReactivePanacheMongoRepository<ContadorCupo> {
    
    public Uni<ContadorCupo> findByInstanciaSedeId(Long instanciaSedeId) {
        return find("instanciaSedeId", instanciaSedeId).firstResult();
    }

    public Uni<ContadorCupo> save(ContadorCupo contadorCupo){
        return persist(contadorCupo);
    }
}