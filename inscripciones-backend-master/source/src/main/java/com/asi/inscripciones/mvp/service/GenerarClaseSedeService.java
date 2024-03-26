package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.GenerarClaseSedeDTO;
import com.asi.inscripciones.mvp.dto.InstanciaSedeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenerarClaseSedeService {

    @Autowired
    private ClaseService claseService;

    public InstanciaSedeDTO generarClaseSede(GenerarClaseSedeDTO generarClaseSedeDTO){

        InstanciaSedeDTO instanciaSedeDTO = claseService.generate(generarClaseSedeDTO);

        return instanciaSedeDTO;
    }
}