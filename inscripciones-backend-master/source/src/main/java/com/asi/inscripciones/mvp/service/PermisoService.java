package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.PermisoDTO;
import com.asi.inscripciones.mvp.entity.Menu;
import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.PermisoMapper;
import com.asi.inscripciones.mvp.repository.MenuRepository;
import com.asi.inscripciones.mvp.repository.PermisoRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PermisoService {

    @Autowired
    final private PermisoRepository permisoRepository;

    @Autowired
    final private MenuRepository menuRepository;



    @Value("${error.generic.id}")
    private String mensajeErrorId;


    @Autowired 
    private PermisoMapper permisoMapper;

    public void registerDefaultPermiso(Permiso permiso) {
       // Menu menuUser = menuRepository.findByName("TODOS");
        //permiso.addMenu(menuUser);
        permisoRepository.save(permiso);
    }

    public List<Permiso> getStateAll(final Integer estado){
        List<Permiso> permisoList = permisoRepository.getStateAll(estado);
        return permisoList;
    }

    public Iterable<Permiso> listAll() {
        return permisoRepository.findAll();
    }

    public Permiso getById(@NotNull final Long id) {

        Optional<Permiso> permiso = permisoRepository.findById(id);
        return validAndGet(permiso);
    }

    public List<Permiso> getAllPermiso(Integer estado, Pageable pageable) {
        List<Permiso> permisoPage = permisoRepository.findByEstadoLike(estado, pageable);
        return permisoPage;
    }

    public List<Menu> listMenus() {
        return menuRepository.findAll();
    }

    public Permiso savePermiso(Permiso permiso) {
        Permiso response = permisoRepository.save(permiso);
        return response;
    }

    public Permiso update(Permiso user) {
        return permisoRepository.save(user);
    }

    public void deleteById(final Long id) {
        
        Permiso permiso = this.getById(id);
        permiso.setEstado(ConstanteEstados.INACTIVO);
        permisoRepository.save(permiso);
    }


    public void valid(PermisoDTO permisoDTO, Accion accion){

        if(accion.equals(Accion.CREAR)){

            Permiso permiso = permisoRepository.findByName(permisoDTO.nombre());
            
            if (ObjectUtils.isNotEmpty(permiso))
                throw new ResponseStatusException(HttpStatus.FOUND);

            if (ObjectUtils.isNotEmpty(permisoDTO.id()))
                throw new GenericException(mensajeErrorId);
        
        } else if (accion.equals(Accion.CONSULTAR)) {

            Permiso permiso = this.getById(permisoDTO.id());

            if(ObjectUtils.isEmpty(permiso.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

    }


    public Permiso loadPermiso(final PermisoDTO permisoDTO, final Accion accion){

        Permiso permiso = permisoMapper.convertDtoToPermiso(permisoDTO);

        if(accion.equals(Accion.MODIFICAR)){
        
            Permiso permisoActual = this.getById(permisoDTO.id());

            permiso.setCreado(permisoActual.getCreado());
            permiso.setCreadoPor(permisoActual.getCreadoPor());
        }

        return permiso;
    }


    public List<Permiso> getAll(List<Long> id){
        
        List<Permiso> list = permisoRepository.findAllById(id);
        return list;
    }

    private Permiso validAndGet(Optional<Permiso> permiso) {
    
        if (permiso.isEmpty()) 
            return new Permiso();

        return permiso.get();
    }

}
