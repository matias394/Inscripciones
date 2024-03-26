package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.repository.ModalidadRepository;
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
public class ModalidadService {
   
    
    @Autowired
    final ModalidadRepository modalidadRepository;

    public Modalidad getByName(String nombre){

        Optional<Modalidad> modalidad = modalidadRepository.findByName(nombre);
        return modalidad.orElse(new Modalidad());
    }

    public Modalidad getModalidadById(Long id){
        
        Optional<Modalidad> modalidad = modalidadRepository.findById(id);
        
        return modalidad.orElse(new Modalidad());

    }

    public List<Modalidad> getAllPage(final Integer estado, final Pageable pageable){

        List<Modalidad> modalidadListAll = modalidadRepository.findAllPage(estado, pageable);
        return modalidadListAll;
    }


    public List<Modalidad> getStateAll(final Integer estado){
        
        List<Modalidad> modalidadList = modalidadRepository.getStateAll(estado);
        return modalidadList;
    }


    public Modalidad saveModalidad(Modalidad modalidad){

        Modalidad modalidadSave = modalidadRepository.save(modalidad);
        return modalidadSave;
    }

    @Transactional
    public Modalidad updateModalidad(Modalidad modalidad){

      return modalidadRepository.save(modalidad);        
        
    }

    public void deleteModalidadById(final Long id) {

        Optional<Modalidad> modalidad = modalidadRepository.findById(id);  
        modalidad.get().setEstado(ConstanteEstados.INACTIVO);
        modalidadRepository.save(modalidad.get());
 
     }  
}
