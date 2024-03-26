package com.asi.inscripcion.serviciosexternos.service;

import java.util.List;

import org.jboss.logging.Logger;

import com.asi.inscripcion.entity.Clase;
import com.asi.inscripcion.serviciosexternos.repository.ClaseAlumnoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClaseAlumnoService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    ClaseAlumnoRepository claseAlumnoRepository;
    
    public void softDeleteClaseAlumnoByUsuarioId(Long usuarioId, List<Clase> clases){
        for (Clase clase : clases) {
            claseAlumnoRepository.save(clase.getId() , usuarioId);
        }
    }
}
