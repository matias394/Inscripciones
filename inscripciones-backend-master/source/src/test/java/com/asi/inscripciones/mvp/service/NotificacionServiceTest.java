package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.AbstractClassGenerator;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class NotificacionServiceTest extends AbstractGenericTest{

    @Autowired
    NotificacionService notificacionService;

    @Test
    public void getNotificacionByName(){
        
        Notificacion notificacion = notificacionService.getByName("plazos");
        assertNotNull(notificacion);
    }
    
    @Test
    public void getNotificacionById(){
        Notificacion notificacion = notificacionService.getNotificacionById(1L);

        assertNotNull(notificacion);
    }

    

    @Test
    public void saveTest(){

        Notificacion notificacion = new Notificacion();

        notificacion.setNombre("tiempos");
        notificacion.setDescripcion("sin guardar");
        notificacion.setEstado(ConstanteEstados.ACTIVO);        

        notificacion  = notificacionService.saveNotificacion(notificacion);

        assertNotNull(notificacion.getId());
    }

    @Test
    public void updateTest(){
        
        Notificacion notificacion = new Notificacion();

        notificacion.setId(1L);
        notificacion.setNombre("vencimiento");
        notificacion.setDescripcion("vencimiento de plazos");
        notificacion.setEstado(ConstanteEstados.ACTIVO);  

        notificacion  = notificacionService.updateNotificacion(notificacion);
        
        assertNotNull(notificacion);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        notificacionService.deleteNotificacionById(id);
        Notificacion notificacion = notificacionService.getNotificacionById(1L);

        assertEquals(notificacion.getEstado(),0);

    }

}
