package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.InstanciaSede;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.ejb.Lock;
import jakarta.ejb.LockType;
import jakarta.enterprise.context.ApplicationScoped;
@ApplicationScoped
public class InstanciaSedeRepository implements PanacheRepository<InstanciaSede> {

    public Object[] findByInstanciaSedeId1(final Long id) {

        Object[] result = getEntityManager().createQuery("SELECT i.sede.id, i.sede.nombre, i.sede.bloqueado FROM InstanciaSede i WHERE  i.id=?1",Object[].class)
                .setParameter(1,id)
                .getSingleResult();

        return  result;
    }

    @Lock(LockType.READ)
    public Uni<InstanciaSede> findByInstanciaSedeId(final Long id) {
        return Uni.createFrom().item(() -> find("id", id).firstResult());
    }

}
