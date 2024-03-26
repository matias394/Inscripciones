package com.asi.inscripcion.serviciosexternos.repository;

import com.asi.inscripcion.entity.RepositorioQR;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped

public class RepositorioQrRepository implements PanacheRepository<RepositorioQR>  {

    @Transactional
    public void save(RepositorioQR repositorioQR) {
        persist(repositorioQR);
    }

}
