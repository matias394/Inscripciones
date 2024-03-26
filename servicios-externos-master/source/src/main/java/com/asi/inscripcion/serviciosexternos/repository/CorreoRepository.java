package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.Correo;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.ejb.Lock;
import jakarta.ejb.LockType;
import jakarta.enterprise.context.ApplicationScoped;
@ApplicationScoped
public class CorreoRepository implements PanacheRepositoryBase<Correo, Long> {

    @Lock(LockType.READ)
    public Uni<Correo> findCorreoById(final Long id) {
        return Uni.createFrom().item(() -> find("id", id).firstResult());
    }

   /* public Optional<Correo> findCorreoById(final Long id, final Integer estado) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        params.put("estado", estado);

        PanacheQuery<InstanciaSede> query = find("id=:id AND estado=:estado",params);
        return query.firstResultOptional();
    }*/
}
