package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Tipo;
import com.asi.inscripciones.mvp.repository.TipoRepository;
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
public class TipoService {
    
    @Autowired
    final private TipoRepository tipoRepository;

    public Tipo getByName(String nombre){
        
        Optional<Tipo> tipo = tipoRepository.findByName(nombre);
        return tipo.orElse(new Tipo());
    }

    public Tipo getTipoById(Long id){
        
        Optional<Tipo> tipo = tipoRepository.findById(id);
        
        return tipo.orElse(new Tipo());

    }

    public List<Tipo> getAllPage(final Integer estado, final Pageable pageable){

        List<Tipo> tipoList = tipoRepository.findAllPage(estado, pageable);
        return tipoList;
    }

    public List<Tipo> getStateAll(final Integer estado){
        List<Tipo> tipoList = tipoRepository.getStateAll(estado);
        return tipoList;
    }

    public Tipo saveTipo(Tipo tipo){

        Tipo tipoSave = tipoRepository.save(tipo);
        return tipoSave;
    }

    @Transactional
    public Tipo updateTipo(Tipo tipo){

      return tipoRepository.save(tipo);        
        
    }

    public void deleteTipoById(final Long id) {

        Optional<Tipo> tipo = tipoRepository.findById(id);  
        tipo.get().setEstado(ConstanteEstados.INACTIVO);
        tipoRepository.save(tipo.get());
 
    }  


}
