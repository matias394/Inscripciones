package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;


public class UsuarioRepositoryTest extends AbstractGenericTest {
    
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    OrganismoRepository organismoRepository;

    Long id = 1L;


    @Test
    @Order(1)
    public void saveTest(){

        Optional<Organismo> organismo = organismoRepository.findById(id);
    
        Usuario usuario = new Usuario();

        usuario.setDni("12345678");
        usuario.setApellido("apellido prueba");
        usuario.setNombre("Nombre de Prueba");
        usuario.setOrganismo(organismo.get());
        usuario.setEmail("test@test.com");
        usuario.setEstado(ConstanteEstados.ACTIVO);
        
        usuario = usuarioRepository.save(usuario);

        assertNotNull(usuario.getId());
        
    }

    @Test
    @Order(2)
    public void findByIdTest(){
       Optional<Usuario>  usuario =  usuarioRepository.findById(id);
       assertTrue(usuario.get().getId()>0);
    }

    @Test
    @Order(3)
    public void updateTest(){

        String nombreModificado="Nombre de Prueba 2";
    
        Optional<Usuario>  usuario =  usuarioRepository.findById(id);
        usuario.get().setNombre(nombreModificado);
        Usuario usuarioTest = usuarioRepository.save(usuario.get());

        assertEquals(usuarioTest.getNombre(), nombreModificado);
    }


    @Test
    @Order(4)
    public void countTest(){

        Long cantidad =  usuarioRepository.count();

        assertTrue(cantidad>0);

    }


    @Test
    @Order(4)
    public void findByCuilAndPassword(){

        Optional<Usuario> usuarioOptional = usuarioRepository.findByCuilAndPassword("123456789","1234", ConstanteEstados.ACTIVO);
        assertNotNull(usuarioOptional.get().getCuil());
    }

}
