package com.asi.inscripcion.serviciosexternos.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.asi.inscripcion.entity.Clase;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ClaseRepository implements PanacheRepository<Clase>{

    public List<Clase> findByInstanciaSedeId(final Long instanciaSedeId) {
        Map<String, Object> params = new HashMap<>();
        params.put("instanciaSede", instanciaSedeId);
        PanacheQuery<Clase> query = find("instanciaSede.id=:instanciaSede",params);
        return query.list();
    }
}
