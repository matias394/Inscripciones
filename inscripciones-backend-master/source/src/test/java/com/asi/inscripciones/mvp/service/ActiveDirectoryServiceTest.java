package com.asi.inscripciones.mvp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.apiext.ActiveDirectoryService;
import com.asi.inscripciones.mvp.dto.UsuarioAdDTO;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;

import lombok.extern.log4j.Log4j2;

/**
 * Datos de usuario de prueba
 * 
 * 
 *  CUIL:20407321384
 *  CUIL:20266221488
 *  PASS:Troquel1
 */
@Log4j2
public class ActiveDirectoryServiceTest extends AbstractGenericTest {
    
    @Autowired
    ActiveDirectoryService activeDirectoryService;


    String cuil="20407321384";
    String pass="Troquel1";

    
    @Test
    public void authenticateTest(){

        activeDirectoryService.authenticate(cuil, pass);
    }




    //@Test
    public void getUserAdTest(){

        UsuarioAdDTO usuario = activeDirectoryService.getUserAd(cuil);

        log.info("null");
    }

}
