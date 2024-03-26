package com.asi.inscripcion.serviciosexternos.repository;


import com.asi.inscripcion.entity.OrganismoCategoria;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class OrganismoCategoriaRepository implements PanacheRepository<OrganismoCategoria> {

    public Object[] findByIdGetObject(Long id){

        Object[] result = getEntityManager().createQuery("" +
                        " SELECT o.categoria.id, o.categoria.nombre, " +
                        "   o.organismo.id, o.organismo.nombre " +
                        " FROM OrganismoCategoria o " +
                        " WHERE  o.id=?1",Object[].class)
                .setParameter(1,id)
                .getSingleResult();

        return result;

    }

}
