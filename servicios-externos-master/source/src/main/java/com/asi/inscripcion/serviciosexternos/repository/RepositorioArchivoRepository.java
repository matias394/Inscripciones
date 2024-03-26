package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.RepositorioArchivo;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.ejb.Lock;
import jakarta.ejb.LockType;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class RepositorioArchivoRepository implements PanacheRepository<RepositorioArchivo> {

    @Lock(LockType.READ)
    public Uni<RepositorioArchivo> findRepositorioArchivoById(final Long id) {
        return Uni.createFrom().item(() -> find("id", id).firstResult());
    }

    public Optional<RepositorioArchivo> findRepositorioArchivoByCuilInscripcionInstancia(final String cuil, Long inscripcion, Long instancia) {
        Map<String, Object> params = new HashMap<>();
        params.put("cuil", cuil);
        params.put("inscripcion", inscripcion);
        params.put("instancia", instancia);
        PanacheQuery<RepositorioArchivo> query = find("cuil=:cuil AND inscripcion.id=:inscripcion AND instancia.id=:instancia",params);
        return query.firstResultOptional();
    }
}
