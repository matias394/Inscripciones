package com.asi.inscripciones.mvp.config;

import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.repository.RoleRepository;

import javax.annotation.PostConstruct;


//@Component
public class DataDemo {
    //    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    private void initRoles() {
        roleRepository.deleteAll();
        Rol rol1 = new Rol();
        rol1.setNombre("SUPER ADMIN");

        Rol rol2 = new Rol();
        rol2.setNombre("ADMIN");

        Rol rol3 = new Rol();
        rol3.setNombre("EDITOR");

        Rol rol4 = new Rol();
        rol4.setNombre("USER");

        roleRepository.save(rol1);
        roleRepository.save(rol2);
        roleRepository.save(rol3);
        roleRepository.save(rol4);
    }
}
