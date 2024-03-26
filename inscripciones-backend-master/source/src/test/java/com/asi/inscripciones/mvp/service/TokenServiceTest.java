package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.TestFactory;


@Import(TestFactory.class)
public class TokenServiceTest extends AbstractGenericTest  {
    
    @Autowired
    TokenService tokenService;

    @Autowired
    UsuarioService usuarioService;

    Map<String, Object> claims; 

    String token;


    @BeforeEach
    public void before(){

        Usuario usuario = usuarioService.getUserById(1L);

        claims = new HashMap<>();
        claims.put("prueba", "probando");
        claims.put("prueba", "probando");
        claims.put("rol", usuario.getRol().getNombre());

        token = tokenService.generateToken(usuario, claims);
    }



    @Test
    public void validTokenFailTest(){

        GenericException thrown = Assertions.assertThrows(GenericException.class, () -> {
            tokenService.validate("ssssssssssss");
        });
 
        Assertions.assertEquals("Invalid JWT token", thrown.getMessage());
    }


    @Test
    public void validToken1SuccessTest(){

        tokenService.validate(token);
    }


    @Test
    public void getUserFromTokenTest(){

        String nombre = tokenService.getUserFromToken(token);
        assertEquals("12345",nombre);
    }

}
