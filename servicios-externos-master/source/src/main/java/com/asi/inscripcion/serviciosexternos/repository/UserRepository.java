package com.asi.inscripcion.serviciosexternos.repository;


import com.asi.inscripcion.entity.Usuario;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepository<Usuario> {

    public Optional<Usuario> validByCuildAndPassword(final String cuil, final String password) {

        Map<String, Object> params = new HashMap<>();
        params.put("cuil", cuil);
        params.put("password", password);

        PanacheQuery<Usuario> query = find("cuil=:cuil AND password=:password",params);
        return query.firstResultOptional();
    }


    public Optional<Usuario> findByCuil(final String cuil) {

        Map<String, Object> params = new HashMap<>();
        params.put("cuil", cuil);

        PanacheQuery<Usuario> query = find("cuil=:cuil",params);
        return query.firstResultOptional();
    }

}
