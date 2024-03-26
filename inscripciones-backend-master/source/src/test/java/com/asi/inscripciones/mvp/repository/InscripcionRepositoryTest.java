package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class InscripcionRepositoryTest extends AbstractGenericTest{
    
    @Autowired
    InscripcionRepository inscripcionRepository;

    @Autowired
    OrganismoCategoriaRepository organismoCategoriaRepository;

    @Autowired
    SedeRepository sedeRepository;

    @Autowired
    CorreoRepository correoRepository;

    @Autowired
    NotificacionRepository notificacionRepository;

    @Autowired
    ModalidadRepository modalidadRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    TipoRepository tipoRepository;

    @Autowired
    EstadoRepository estadoRepository;



    Long id = 1L;

    @Test
    @Order(1)
    public void getTest(){
        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);
        assertTrue(inscripcion.get().getId()>0);
    }

    @Test
    @Order(2)
    public void saveTest(){

        Optional<OrganismoCategoria> organismoCategoria = organismoCategoriaRepository.findById(id);
        Optional<Sede> sede = sedeRepository.findById(id);
        Optional<Correo> correo = correoRepository.findById(id);
        Optional<Notificacion> notificacion = notificacionRepository.findById(id);
        Optional<Modalidad> modalidad = modalidadRepository.findById(id);
        Optional<Tipo> tipo = tipoRepository.findById(id);
        Optional<Estado> estadoInscripcion = estadoRepository.findById(id);
    
        Inscripcion inscripcion = new Inscripcion();

        inscripcion.setOrganismoCategoria(organismoCategoria.get());
        inscripcion.setSede(sede.get());
        inscripcion.setCorreo(correo.get());
        inscripcion.setNotificacion(notificacion.get());
        inscripcion.setTipo(tipo.get());
        inscripcion.setEstadoInscripcion(estadoInscripcion.get());
        inscripcion.setFeriado(5);
        inscripcion.setCuposGrupales(10);
        inscripcion.setLoginMiba(12);
        inscripcion.setCantidadMaxima(30);
        inscripcion.setCuposInscripcion(30);
        inscripcion.setNombre("Nombre de Prueba");
        inscripcion.setUrl("url prueba");
        inscripcion.setEstado(ConstanteEstados.ACTIVO);
        
        inscripcion = inscripcionRepository.save(inscripcion);

        assertNotNull(inscripcion.getId());
        
    }

    @Test
    @Order(3)
    public void getInscripcionByTipo(){

        //Pageable pageable = PageRequest.of(0,10, Sort.by("id"));
        List<Inscripcion> inscripcionList = inscripcionRepository.findInscripcionsByTipo(2L,1,null);

        assertTrue(inscripcionList.size()>0);
    }
}
