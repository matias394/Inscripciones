package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Permiso;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.entity.RolPermiso;
import com.asi.inscripciones.mvp.repository.RolPermisoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RolPermisoService {
    
    @Autowired
    final private RolPermisoRepository rolPermisoRepository;

    @Autowired
    private PermisoService permisoService;


    public RolPermiso saveRolPermiso(final RolPermiso rolPermiso){

        RolPermiso response = rolPermisoRepository.save(rolPermiso);
        return response;
    }

    public void saveRolPermisoList(final List<RolPermiso> rolPermiso){

        rolPermiso.forEach(rolPermisoRepository::save);
    }

    public RolPermiso getById(final Long id){
        
        Optional<RolPermiso> rolPermiso = rolPermisoRepository.findById(id);
        return rolPermiso.orElse(new RolPermiso());
    }


    public List<RolPermiso> getByIdRol(final Long id){

        List<RolPermiso> rolPermisoList = rolPermisoRepository.findByIdRol(id);
        return rolPermisoList;
    }


    public List<Permiso> getPermisoByIdRol(final Long id){

        List<Permiso> permisoList = rolPermisoRepository.findByIdRol(id)
                                .stream().map(item->item.getPermiso()).toList();
        return permisoList;
    }


    public void deleteByIdRolAndIdPermiso(final RolPermiso rolPermiso){

        rolPermisoRepository.deleteByIdRolAndIdPermiso(rolPermiso.getRol().getId(), rolPermiso.getPermiso().getId());
    }


    public List<RolPermiso> load(Rol rol, List<Long> permisos){

        List<RolPermiso> list = new ArrayList<>();

        permisos.forEach(id->{

            RolPermiso rolPermiso = new RolPermiso();
            Permiso permiso = permisoService.getById(id);

            rolPermiso.setRol(rol);
            rolPermiso.setPermiso(permiso);
            
            list.add(rolPermiso);
        });

        return list;
    }


    public List<RolPermiso> loadRolPermisos(Rol rol, List<Permiso> permisos){

        List<RolPermiso> list = new ArrayList<>();

        permisos.forEach(permiso->{

            RolPermiso rolPermiso = new RolPermiso();
        
            rolPermiso.setRol(rol);
            rolPermiso.setPermiso(permiso);
            
            list.add(rolPermiso);
        });

        return list;
    }

    

}
