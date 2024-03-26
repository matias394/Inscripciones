package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Estado;
import com.asi.inscripciones.mvp.repository.EstadoRepository;
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
public class EstadoService {
    
    @Autowired
    final private EstadoRepository estadoRepository;

    public Estado getByName(String nombre){
        
        Optional<Estado> estado = estadoRepository.findByName(nombre);
        return estado.orElse(new Estado());
    }

    public Estado getEstadoById(Long id){
        
        Optional<Estado> estado = estadoRepository.findById(id);
        
        return estado.orElse(new Estado());

    }

    public List<Estado> getAllPage(final Integer estado, final Pageable pageable){

        List<Estado> estadoListAll = estadoRepository.findAllPage(estado, pageable);
        return estadoListAll;
    }

    public Estado saveEstado(Estado estado){

        Estado estadoSave = estadoRepository.save(estado);
        return estadoSave;
    }

    @Transactional
    public Estado updateEstado(Estado estado){

      return estadoRepository.save(estado);        
        
    }

    public void deleteEstadoById(final Long id) {

        Optional<Estado> estado = estadoRepository.findById(id);  
        estado.get().setEstado(ConstanteEstados.INACTIVO);
        estadoRepository.save(estado.get());
 
    } 

    public List<Estado> getStateAll(final Integer estado){
        List<Estado> sedeList = estadoRepository.getStateAll(estado);
        return sedeList;
    }
}
