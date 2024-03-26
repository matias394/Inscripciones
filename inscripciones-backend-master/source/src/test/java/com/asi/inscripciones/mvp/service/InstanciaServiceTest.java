package com.asi.inscripciones.mvp.service;


import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import com.asi.inscripciones.mvp.dto.InstanciaSedeResponseDTO;
import com.asi.inscripciones.mvp.entity.Modalidad;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.repository.InscripcionRepository;
import com.asi.inscripciones.mvp.repository.InstanciaRepository;
import com.asi.inscripciones.mvp.repository.UsuarioRepository;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class InstanciaServiceTest extends AbstractGenericTest{
    
    @Autowired
    InstanciaRepository instanciaRepository;

    @Autowired
    InscripcionRepository inscripcionRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    InstanciaService instanciaService;

    @Autowired
    ModalidadService modalidadService;

    @Autowired
    ClaseSedeService claseSedeService;

    Long id = 1L;

    @Test
    @Order(1)
    public void saveInstancia(){

        Inscripcion inscripcion = inscripcionRepository.findById(id).get();
        Modalidad modalidad = modalidadService.getModalidadById(id);
        List<ClaseSede> claseSedeList = claseSedeService.getClaseSedeByInstancia(id);

        Instancia instancia = new Instancia();

        instancia.setNombre("Instacia Test");
        instancia.setInscripcion(inscripcion);
        instancia.setModalidad(modalidad);
        instancia.setDuracionSemana(4);
        instancia.setFechaInicio(LocalDate.now());
        instancia.setFechaFin(LocalDate.now());
        instancia.setLimiteInscripcion(LocalDate.now());
        instancia.setBloqueado(0);
        instancia.setClaseSedeList(claseSedeList);

        instancia = instanciaService.saveInstancia(instancia);

        assertNotNull(instancia.getId());
    }

    @Test
    @Order(2)
    public void getInstanciaByTipoSede(){

        Long idSede = 1L;
        Long idTipo = 2L;

        List<InstanciaSedeResponseDTO> instanciaSedeResponseDTOList = instanciaService.getInstanciaByTipoSede(idSede,idTipo);

        assertNotNull(instanciaSedeResponseDTOList);
    }
}
