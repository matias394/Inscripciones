package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.entity.RolPermiso;
import com.asi.inscripciones.mvp.repository.PermisoRolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermisoRolService {

    @Autowired
    final private PermisoRolRepository permisoRolRepository;


    public void savePermisoRolList(final  List<Rol> rolList, final Permiso permiso) {
        
        rolList.forEach(item->{

            RolPermiso rolPermiso = new RolPermiso();
            rolPermiso.setPermiso(permiso);
            rolPermiso.setRol(item);
            
            permisoRolRepository.save(rolPermiso);
        });
    }
    
}
