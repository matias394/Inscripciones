package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.entity.Usuario;
import com.asi.inscripcion.serviciosexternos.ConstantTest;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class UserServiceTest {

    @Inject
    UserService userService;


    @Test
    public void validUserTrueTest(){

        boolean valid = userService.valid(
                ConstantTest.CUIL,
                ConstantTest.PASS_TRUE);

        assertTrue(valid);
    }

    @Test
    public void validUserFalseTest(){

        boolean valid = userService.valid(
                ConstantTest.CUIL,
                ConstantTest.PASS_FALSE);

        assertFalse(valid);
    }

    @Test
    public void findByCuilTest(){

        Usuario entity = userService.findByCuil( ConstantTest.CUIL);

        assertNotNull(entity);
    }

}
