package com.asi.inscripcion.serviciosexternos.service;

import java.util.List;

import com.asi.inscripcion.entity.Clase;
import com.asi.inscripcion.serviciosexternos.repository.ClaseRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ClaseService {

    @Inject
    ClaseRepository claseRepository;

    public List<Clase> getClasesById(Long instanciaSedeId){
        return claseRepository.findByInstanciaSedeId(instanciaSedeId);
    }
}
