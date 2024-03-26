package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.Instancia;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped

public class InstanciaRepository  implements PanacheRepository<Instancia> {


    public Object[] findInscripcionById1(final Long id) {

        Object[] result = getEntityManager()
                .createQuery(" SELECT i.id, i.nombre, i.estado, i.fechaInicio, i.fechaFin " +
                        " FROM Instancia i " +
                        " WHERE  i.id=?1",Object[].class)
                .setParameter(1,id)
                .getSingleResult();

        return  result;
    }
    public Optional<Instancia> findInstanciaById(final Long id) {

        Map<String, Object> params = new HashMap<>();
        params.put("id", id);

        PanacheQuery<Instancia> query = find("id=:id",params);
        return query.firstResultOptional();
    }
}
