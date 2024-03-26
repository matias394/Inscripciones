package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.Inscripcion;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.ejb.Lock;
import jakarta.ejb.LockType;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class InscripcionRepository implements PanacheRepository<Inscripcion> {

    @Lock(LockType.READ)
    public Uni<Inscripcion> findInscripcionById(final Long id) {
        return Uni.createFrom().item(() -> find("id", id).firstResult());
    }

    public Object[] findInscripcionById1(final Long id) {

        Object[] result = getEntityManager().createQuery("SELECT i.id, i.nombre, i.estado, i.organismoCategoria.id FROM Inscripcion i WHERE  i.id=?1",Object[].class)
                .setParameter(1,id)
                .getSingleResult();

        return  result;
    }
}
