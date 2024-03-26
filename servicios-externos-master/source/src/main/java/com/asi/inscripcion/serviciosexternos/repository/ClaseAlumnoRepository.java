package com.asi.inscripcion.serviciosexternos.repository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.HashMap;
import java.util.Map;

import com.asi.inscripcion.entity.Clase;
import com.asi.inscripcion.entity.ClaseAlumno;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class ClaseAlumnoRepository implements PanacheRepository<ClaseAlumno>{

    public void softDeleteByClaseId(Long claseId, Long usuarioId) {
      update("UPDATE ClaseAlumno ca SET ca.estado = 0 WHERE ca.clase.id = ?1 AND ca.usuario.id= ?2",
        "SET estado = ?1 WHERE clase_id = ?2 AND usuario_id = ?3", 0, claseId, usuarioId);
    }

    @Transactional
    public void save(Long claseId, Long userId) {
        ClaseAlumno claseAlumno = findByIdAndUserId(claseId, userId);
        claseAlumno.setEstado(0);
        persist(claseAlumno);
    }

    public ClaseAlumno findByIdAndUserId(final Long claseId, final Long userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("claseId", claseId);
        params.put("userId", userId);
        PanacheQuery<ClaseAlumno> query = find("clase.id=:claseId AND usuario.id=:userId",params);
        return query.firstResult();
    }
}
