package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class NotificacionRepositoryTest extends AbstractGenericTest{
    
    @Autowired
    NotificacionRepository notificacionRepository;

    @Test
    @Order(1)
    public void saveTest(){
        
        Notificacion notificacion = new Notificacion();
        notificacion.setNombre("notificacion");
        notificacion.setDescripcion("notificacion");
        notificacion.setCreadoPor("admin");
        notificacion.setModificadoPor("admin");
        notificacion.setEstado(ConstanteEstados.ACTIVO);

        Notificacion notificacionTest = notificacionRepository.save(notificacion);

        assertNotNull(notificacionTest);
    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Notificacion> notificacion = notificacionRepository.findById(id);

        assertNotNull(notificacion.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

       String nuevoNombre = "solicitud";
       Optional<Notificacion> notificacion = notificacionRepository.findById(id);

       Notificacion notificacionTest = notificacion.get();
       notificacionTest.setNombre(nuevoNombre);

       notificacionTest = notificacionRepository.save(notificacionTest);
       assertEquals(notificacionTest.getNombre(), nuevoNombre);

    }
}
