package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Notificacion;
import com.asi.inscripciones.mvp.repository.NotificacionRepository;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificacionService {
    
    @Autowired
    final private NotificacionRepository notificacionRepository;

    public Notificacion getByName(String nombre){
        
        Optional<Notificacion> notificacion = notificacionRepository.findByName(nombre);
        return notificacion.orElse(new Notificacion());
    }

    public Notificacion getNotificacionById(Long id){
        
        Optional<Notificacion> notificacion = notificacionRepository.findById(id);
        
        return notificacion.orElse(new Notificacion());

    }

    public List<Notificacion> getAllPage(final Integer estado, final Pageable pageable){

        List<Notificacion> notificacionListAll = notificacionRepository.findAllPage(estado, pageable);
        return notificacionListAll;
    }


    public List<Notificacion> getStateAll(final Integer estado){
        List<Notificacion> notificacionList = notificacionRepository.getStateAll(estado);
        return notificacionList;
    }


    public Notificacion saveNotificacion(Notificacion notificacion){
        Notificacion notificacionSave = notificacionRepository.save(notificacion);
        return notificacionSave;
    }

    @Transactional
    public Notificacion updateNotificacion(Notificacion notificacion){

      return notificacionRepository.save(notificacion);        
        
    }

    public void deleteNotificacionById(final Long id) {

        Optional<Notificacion> notificacion = notificacionRepository.findById(id);  
        notificacion.get().setEstado(ConstanteEstados.INACTIVO);
        notificacionRepository.save(notificacion.get());
 
    }  






}
