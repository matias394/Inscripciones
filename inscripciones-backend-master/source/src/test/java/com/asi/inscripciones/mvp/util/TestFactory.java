package com.asi.inscripciones.mvp.util;

import com.asi.inscripciones.mvp.repository.*;
import com.asi.inscripciones.mvp.service.*;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.asi.inscripciones.mvp.apiext.ActiveDirectoryService;

@TestConfiguration
public class TestFactory {


    @Bean
    public InstanciaService instanciaService( InstanciaRepository instanciaRepository){
        return new  InstanciaService(instanciaRepository);
    }


    @Bean
    public ClaseProfesorService claseProfesorService( ClaseProfesorRepository claseProfesorRepository){
        return new ClaseProfesorService(claseProfesorRepository);
    }

    @Bean
    public UsuarioService usuarioService(UsuarioRepository usuarioRepository){
        return new UsuarioService(usuarioRepository);
    }

    @Bean
    public OrganismoService organismoService(OrganismoRepository organismoRepository){
        return new OrganismoService(organismoRepository);
    }

    @Bean
    public RoleService roleService(RoleRepository roleRepository){
        return new RoleService(roleRepository);
    }

    @Bean
    public PermisoService permisoService(PermisoRepository permisoRepository, MenuRepository menuRepository){
        return new PermisoService(permisoRepository, menuRepository);
    }

    @Bean
    public RolPermisoService rolPermisoService(RolPermisoRepository rolPermisoRepository){
        return new RolPermisoService(rolPermisoRepository);
    }

    @Bean
    public CategoriaService categoriaService(CategoriaRepository categoriaRepository){
        return new CategoriaService(categoriaRepository);
    }

    @Bean
    public OrganismoCategoriaService organismoCategoriaService(OrganismoCategoriaRepository organismoCategoriaRepository){
        return new OrganismoCategoriaService(organismoCategoriaRepository);
    }

    @Bean
    public UsuarioOrganismoCategoriaService usuarioOrganismoCategoriaService(UsuarioOrganismoCategoriaRepository usuarioOrganismoCategoriaRepository){
        return new UsuarioOrganismoCategoriaService(usuarioOrganismoCategoriaRepository);
    }

    @Bean
    public ActiveDirectoryService activeDirectoryService(){
        return new ActiveDirectoryService();
    }

    @Bean
    public SedeService sedeService(SedeRepository sedeRepository){
        return new SedeService(sedeRepository, null);
    }

    @Bean
    public InscripcionService inscripcionService( InscripcionRepository inscripcionRepository){
        return new InscripcionService(inscripcionRepository);
    }

    @Bean
    public CorreoService correoService(CorreoRepository correoRepository){
        return new CorreoService(correoRepository);
    }

    @Bean
    public NotificacionService notificacionService(NotificacionRepository notificacionRepository){
        return new NotificacionService(notificacionRepository);
    }

    @Bean
    public ModalidadService modalidadService(ModalidadRepository modalidadRepository){
        return new ModalidadService(modalidadRepository);
    }

    @Bean
    public TipoService tipoService( TipoRepository tipoRepository){
        return new  TipoService(tipoRepository);
    }

    @Bean
    public EstadoService estadoService(EstadoRepository estadoRepository){
        return new EstadoService(estadoRepository);
    }

    @Bean
    public FormularioInscripcionService formularioInscripcionService( FormularioInscripcionRepository formularioInscripcionRepository){
        return new  FormularioInscripcionService(formularioInscripcionRepository);
    }


    /*



    @Bean
    public ClaseAlumnoService claseAlumnoService(ClaseAlumnoRepository claseAlumnoRepository){
        return new  ClaseAlumnoService(claseAlumnoRepository);
    }







    








    @Bean
    public TokenService tokenService(){
        return new TokenService();
    }








    



















    */


}
