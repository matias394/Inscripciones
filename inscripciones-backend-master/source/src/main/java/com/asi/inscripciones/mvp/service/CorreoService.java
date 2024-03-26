package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.repository.CorreoRepository;
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
public class CorreoService {
   
    @Autowired
    final private CorreoRepository correoRepository;
    
    public Correo getByname(String nombre){
        
        Optional<Correo> correo = correoRepository.findByName(nombre);
        return correo.orElse(new Correo());
    }
    
    public Correo getCorreoById(Long id){
        
        Correo correo = correoRepository.findById(id);

        return correo;
    }

    public List<Correo> getStateAll(final Integer estado){
        List<Correo> sedeList = correoRepository.getStateAll(estado);
        return sedeList;
    }

    
    public List<Correo> getAllPage(final Integer estado, final Pageable pageable){

        List<Correo> correoList = correoRepository.findAllPage(estado, pageable);
        return correoList;
    }

    public Correo saveCorreo(Correo correo){

        Correo correoSave = correoRepository.save(correo);
        return correoSave;
    }
    
    @Transactional
    public Correo updateCorreo(Correo correo){

      return correoRepository.save(correo);        
        
    }

    public void deleteCorreoById(final Long id) {

        Correo correo = correoRepository.findById(id);  
        correo.setEstado(ConstanteEstados.INACTIVO);
        correoRepository.save(correo);
 
    }   
}

