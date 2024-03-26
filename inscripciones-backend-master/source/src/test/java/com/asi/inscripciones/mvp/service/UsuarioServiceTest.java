package com.asi.inscripciones.mvp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.asi.inscripciones.mvp.dto.UsuarioDTO;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.entity.Rol;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.repository.OrganismoRepository;
import com.asi.inscripciones.mvp.repository.RoleRepository;
import com.asi.inscripciones.mvp.repository.UsuarioRepository;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;


@Import(TestFactory.class)
public class UsuarioServiceTest extends AbstractGenericTest {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    OrganismoRepository organismoRepository;

    @Autowired
    UsuarioService usuarioService; 

    @Autowired
    CategoriaService categoriaService;



    @Test
    public void loadUsuarioTest(){
        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
        .nombre("nombre prueba")
        .apellido("apellido prueba")
        .email("prueba@prueba.com")
        .categoria(List.of(1L,2L))
        .organismo(1L)
        .rol(1L).build();    

    
        Usuario usuario = usuarioService.loadUsuario(usuarioDTO, Accion.CREAR);
    
        assertNotNull(usuario.getOrganismo());
    }

    @Test
    public void saveTest(){

        Organismo organismo = organismoRepository.findById(id).get();
        Rol rol = roleRepository.findById(id).get();



        Usuario usuario = new Usuario();

        usuario.setDni("12345678");
        usuario.setApellido("apellido prueba");
        usuario.setNombre("Nombre de Prueba");
        usuario.setOrganismo(organismo);
        usuario.setEmail("test@test.com");
        usuario.setEstado(ConstanteEstados.ACTIVO);
        usuario.setRol(rol);
        usuario.setPassword("1234");

        usuario  = usuarioService.saveUser(usuario);

        assertNotNull(usuario.getId());
    }


    public void getUserByIdTest(){

        Usuario usuario = usuarioService.getUserById(id);

        assertNotNull(usuario);
    }



    public void getAllUsersTest(){

        Pageable pageable = PageRequest.of(0, 10);

        Page<Usuario> pageUsuario = usuarioService.getAllByRole(ConstanteEstados.ACTIVO, pageable);

        assertTrue(pageUsuario.getSize()>0);

    }



    public void updateUserTest(){

        String apellidoCambiado = "Apellido Cambiado";

        Usuario usuario = usuarioService.getUserById(id);

        usuario.setApellido(apellidoCambiado);

        usuarioService.updateUser(usuario);

    }



    public void updateUserCategoriaTest(){

        Usuario usuario = usuarioService.getUserById(id);

        var categoriaList = categoriaService.getById(id);

        usuario.setCategorias(List.of(categoriaList));

        usuarioService.updateUser(usuario);

    }


    public void validUserTest(){

        Usuario usuario = usuarioService.validUser("123456789","1234");

        assertNotNull(usuario.getCuil());
    }


    
    public void deleteUserTest(){

        usuarioService.deleteById(id);

        Usuario usuario = usuarioService.getUserById(id);

        assertEquals(usuario.getEstado(), ConstanteEstados.INACTIVO);
    }
}
