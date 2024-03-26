package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;


@Import(TestFactory.class)
public class RolServiceTest extends AbstractGenericTest {
    

    @Autowired
    RoleService roleService;

    
    @Test
    public void getTest() {
    
        Rol rol = roleService.getRolById(id);

        assertNotNull(rol);
        
    }
    

}
