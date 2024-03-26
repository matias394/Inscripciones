package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.repository.CorreoRepository;
import com.asi.inscripciones.mvp.repository.EstadoRepository;
import com.asi.inscripciones.mvp.repository.InscripcionRepository;
import com.asi.inscripciones.mvp.repository.ModalidadRepository;
import com.asi.inscripciones.mvp.repository.NotificacionRepository;
import com.asi.inscripciones.mvp.repository.OrganismoCategoriaRepository;
import com.asi.inscripciones.mvp.repository.SedeRepository;
import com.asi.inscripciones.mvp.repository.TipoRepository;
import com.asi.inscripciones.mvp.repository.UsuarioRepository;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;

//@Import(TestFactory.class)
public class InscripcionServiceTest extends AbstractGenericTest{
    
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

    @Autowired
    InscripcionService inscripcionService;


    public void saveInscripcion(){

        OrganismoCategoria organismoCategoria = organismoCategoriaRepository.findByIdOrganismoAndIdCategoria(id, id);
        Sede sede = sedeRepository.findById(id).get();
        Correo correo = correoRepository.findById(id).get();
        Notificacion notificacion = notificacionRepository.findById(id).get();
        Modalidad modalidad = modalidadRepository.findById(id).get();
         Tipo tipo = tipoRepository.findById(id).get();
        Estado estado = estadoRepository.findById(id).get();
        

        Inscripcion inscripcion = new Inscripcion();

        inscripcion.setFeriado(1);
        inscripcion.setCuposGrupales(10);
        inscripcion.setLoginMiba(12);
        inscripcion.setCantidadMaxima(20);
        inscripcion.setCuposInscripcion(20);
        inscripcion.setNombre("notificacion notificacion");
        inscripcion.setUrl("inscripcion.com");
        inscripcion.setOrganismoCategoria(organismoCategoria);
        inscripcion.setSede(sede);
        inscripcion.setCorreo(correo);
        inscripcion.setNotificacion(notificacion);
        inscripcion.setTipo(tipo);
        inscripcion.setEstadoInscripcion(estado);
        
        

        inscripcion = inscripcionService.saveInscripcion(inscripcion);

        assertNotNull(inscripcion.getId());

    }


    public void getInscripcionByIdTest(){

        Inscripcion inscripcion = inscripcionService.getInscripcionById(id);

        assertNotNull(inscripcion);
    }


    public void upadateInscripcionTest(){

        String nombreCambiado = "nombre cambiado";

        Inscripcion inscripcion = inscripcionService.getInscripcionById(id);

        inscripcion.setNombre(nombreCambiado);

        inscripcionService.updateInscripcion(inscripcion);
    }



    public void getInscripcionByOrganisoId(){
        
        List<Inscripcion> inscripcionList = inscripcionService.getInscripcionByOrganisoId(id);
        
        assertNotNull(inscripcionList);
    }


    public void getInscripcionByTipo(){

        List<Inscripcion> inscripcionList = inscripcionService.getInscripcionByOrganisoId(id);

        assertTrue(inscripcionList.size()>0);
    }
}
