package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.apiext.ActiveDirectoryService;
import com.asi.inscripciones.mvp.dto.UsuarioAdDTO;
import com.asi.inscripciones.mvp.dto.UsuarioDTO;
import com.asi.inscripciones.mvp.dto.UsuarioValidacionDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.UsuarioMapper;
import com.asi.inscripciones.mvp.repository.UsuarioRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UsuarioService {

    @Autowired
    final private UsuarioRepository usuarioRepository;

    @Autowired
    private OrganismoService organismoService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private UsuarioOrganismoCategoriaService uocService;

    @Autowired
    private ActiveDirectoryService activeDirectoryService;

    @Autowired
    private UsuarioMapper usuarioMapper;

    public Usuario getUserById(final Long id) {

        Optional<Usuario>  usuario = usuarioRepository.findById(id);

        if(usuario.isPresent()){
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(usuario.get().getId());
            usuario.get().setCategorias(categoriaList);    
        }
        
        return usuario.orElse(new Usuario());
    }

    
    public Usuario getUserByEmail(final String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario.orElse(new Usuario());
    }

    public List<Usuario> getUserByOrganismoAndProfesor(final Long organismo) {
        List<Usuario> usuarioList = usuarioRepository.findByOrganismo(organismo);
        return usuarioList;
    }



    
    public Usuario getUserByDni(final String dni) {

        Optional<Usuario> usuario = usuarioRepository.findByDni(dni);
        return usuario.orElse(new Usuario());
    }


    public Usuario getUserByCuil(final String cuil) {

        Optional<Usuario> usuario = usuarioRepository.findByCuil(cuil);
        return usuario.orElse(new Usuario());
    }



    public Page<Usuario> getAllByRole(final Integer estado, final Pageable pageable) {
        
        Page<Usuario> usuarioPage = usuarioRepository.findByEstadoLike(estado, pageable);

        usuarioPage.forEach(item->{
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(item.getId());
            item.setCategorias(categoriaList); 
        });

        return usuarioPage;
    }


    public Page<Usuario> getAllUserAdmin(final Integer estado, final Pageable pageable) {

        Page<Usuario> usuarioPage = usuarioRepository.findByEstadoAndRolAdminLike(estado, pageable);

        usuarioPage.forEach(item->{
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(item.getId());
            item.setCategorias(categoriaList);
        });

        return usuarioPage;
    }


    public Usuario saveUser(final Usuario user) {

        user.setCuil(user.getCuil().replace("-",""));

        List<UsuarioOrganismoCategoria> nuevoList = new ArrayList<>();

        nuevoList = uocService.loadUsuarioCategorias(user, user.getCategorias(), user.getOrganismo().getId());

        Usuario usuario = usuarioRepository.save(user);

        nuevoList.forEach(uocService::save);

        return usuario;
    }


    @Transactional
    public void updateUser(final Usuario usuario) {

        Usuario usuarioActual = getUserById(usuario.getId());

        if(usuarioActual.getEstado() != 2){
        
            List<Categoria> categoriaActual = uocService.getCategoriasByIdUsuario(usuario.getId());

            List<Categoria> categoriaEliminar = new ArrayList<>();

            List<Categoria> categoriaNuevos = new ArrayList<>();

            List<UsuarioOrganismoCategoria> eliminarList = new ArrayList<>();

            List<UsuarioOrganismoCategoria> nuevoList = new ArrayList<>();

        if(ObjectUtils.isNotEmpty(usuario.getCategorias()) && ObjectUtils.isNotEmpty(categoriaActual)){

            categoriaNuevos  = usuario.getCategorias().stream().filter(item -> ! categoriaActual.contains(item)).toList();

            categoriaEliminar = categoriaActual.stream().filter(item -> ! usuario.getCategorias().contains(item)).toList();

            eliminarList = uocService.loadUsuarioCategorias(usuarioActual, categoriaEliminar,usuarioActual.getOrganismo().getId());

            nuevoList = uocService.loadUsuarioCategorias(usuario, categoriaNuevos, usuario.getOrganismo().getId());

        } else if(ObjectUtils.isNotEmpty(usuario.getCategorias())){

            nuevoList = uocService.loadUsuarioCategorias(usuario, usuario.getCategorias(),usuario.getOrganismo().getId());

        }
            usuarioRepository.save(usuario);

            eliminarList.forEach(uocService::delete);

            nuevoList.forEach(uocService::save);
        }else{
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    
    public void deleteById(final Long id) {
        
        Usuario usuario = this.getUserById(id);
        usuario.setEstado(ConstanteEstados.INACTIVO);
        usuarioRepository.save(usuario);
    }


    public Usuario validUser(final String cuil, final String password){

        Optional<Usuario> optional = usuarioRepository.findByCuilAndPassword(cuil,password, ConstanteEstados.ADMIN);

        return optional.orElse(new Usuario());
    }

    public UsuarioValidacionDTO validUserBack(final String cuil, final String password){
        UsuarioValidacionDTO response = new UsuarioValidacionDTO();

        Boolean validation = activeDirectoryService.authenticate(cuil, password);

        Optional<Usuario> usuarioValid = usuarioRepository.findByCuil(cuil);

        if(validation && !usuarioValid.isEmpty() && usuarioValid.get().getEstado() == ConstanteEstados.ACTIVO){
            Optional<Usuario> usuarioResponse = usuarioRepository.findById(usuarioValid.get().getId());
            if(usuarioResponse.isPresent()){
                List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(usuarioResponse.get().getId());
                usuarioResponse.get().setCategorias(categoriaList);
            }
            Usuario usuarioActual = getUserById(usuarioValid.get().getId());
            usuarioActual.setIntentos(0);
            usuarioRepository.save(usuarioActual);
            response.setUsuario(usuarioActual);
            response.setValidacion(true);
        }else if(usuarioValid.get().getEstado() != ConstanteEstados.INACTIVO){
            Integer intentos;
            response.setValidacion(false);
            Usuario usuarioActual = getUserById(usuarioValid.get().getId());
             if(usuarioActual.getIntentos() != null){
                intentos = usuarioActual.getIntentos()+1;
            }else{
                intentos = 1;
            }
            if(intentos >= 10){
                usuarioActual.setIntentos(intentos);
                usuarioActual.setEstado(0);
                usuarioRepository.save(usuarioActual);
                throw new GenericException(CodigoError.E039.getCodigo(),CodigoError.E039.getMensaje());
            }else{
                usuarioActual.setIntentos(intentos);
                usuarioRepository.save(usuarioActual);
            }
        }else{
            response.setValidacion(false);
        }
        return response;
    }


    public UsuarioDTO getUserFromAD(String cuil){

        UsuarioAdDTO usuarioAD = activeDirectoryService.getUserAd(cuil);

        if(ObjectUtils.isEmpty(usuarioAD))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        
        UsuarioDTO response = UsuarioDTO.builder()
                                .cuil(usuarioAD.getNumeroCui())
                                .nombre(usuarioAD.getNombre())
                                .apellido(usuarioAD.getApellido())
                                .email(usuarioAD.getEmail())
                                .build();

        return response;
    }


    public void valid(final UsuarioDTO usuarioDTO, final Accion accion){

        if(accion.equals(Accion.CREAR)){
            
            if(ObjectUtils.isNotEmpty( usuarioDTO.getId()))
                throw new GenericException(CodigoError.E002.getCodigo(),CodigoError.E002.getMensaje());

            Usuario response = this.getUserByEmail(usuarioDTO.getEmail());
            if (ObjectUtils.isNotEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.FOUND);

            response = this.getUserByCuil(usuarioDTO.getCuil());
            if (ObjectUtils.isNotEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.FOUND);   
                
        


        } else if(accion.equals(Accion.MODIFICAR)){

            Usuario response = this.getUserById(usuarioDTO.getId());
            if (ObjectUtils.isEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        } else if(accion.equals(Accion.ELIMINAR)){
        
            Usuario usuario = this.getUserById(usuarioDTO.getId());
            if (ObjectUtils.isEmpty(usuario.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        
    }


    public Usuario loadUsuario(final UsuarioDTO usuarioDTO, final Accion accion){


    
        Usuario usuario = usuarioMapper.convertDtoToUsuario(usuarioDTO);

        Organismo organismo = organismoService.findById(usuarioDTO.getOrganismo());
        usuario.setOrganismo(organismo);
        
        Rol rol = roleService.getRolById(usuarioDTO.getRol());
        usuario.setRol(rol);



        if(accion.equals(Accion.MODIFICAR)){

            Usuario response = this.getUserById(usuarioDTO.getId());

            usuario.setCreado(response.getCreado());
            usuario.setCreadoPor(response.getCreadoPor());
        }
        
        if(accion.equals(Accion.CONSULTAR) || accion.equals(Accion.CREAR) || accion.equals(Accion.MODIFICAR)){

            List<Categoria> categoriaList =  categoriaService.getAll(usuarioDTO.getCategoria());
            usuario.setCategorias(categoriaList);
        }
        
        return usuario;
        
    }

    public void unlockUser(final String cuil){
        Optional<Usuario> usuarioValid = usuarioRepository.findByCuil(cuil);
        Usuario usuarioActual = getUserById(usuarioValid.get().getId());
        usuarioActual.setIntentos(0);
        usuarioActual.setEstado(1);
        usuarioRepository.save(usuarioActual);
    }

    public Usuario findUsuarioByCuil(final String cuil) {
        Optional<Usuario> usuario = usuarioRepository.findByCuil(cuil);
        return usuario.orElseThrow(()->new EntityNotFoundException(cuil));
    }

    public Page<Usuario> getAllUserAdmin(final Integer estado, final String filter, final Pageable pageable) {

        Page<Usuario> usuarioPage;
    
        if (filter != null && !filter.trim().isEmpty()) {
            usuarioPage = usuarioRepository.findByEstadoAndNombreOrCuilOrApellidoLike(estado, filter, pageable);
        } else {
            usuarioPage = usuarioRepository.findByEstadoAndRolAdminLike(estado, pageable);
        }
    
        usuarioPage.forEach(item->{
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(item.getId());
            item.setCategorias(categoriaList);
        });
    
        return usuarioPage;
    }
    
    public long countAllUserAdmin(final Integer estado, final String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return usuarioRepository.countByEstadoAndNombreOrCuilOrApellidoLike(estado, "%" + filter + "%");
        } else {
            return usuarioRepository.countByEstadoAndRolAdmin(estado);
        }
    }

    public List<Usuario> getUserByCuilAndEstado(final String cuil) {
        List<Usuario> usuario = usuarioRepository.findByCuilAndEstado(cuil, ConstanteEstados.ACTIVO);
        return usuario;
    }

    public Usuario getUserByCuilActivo(final String cuil) {
        Usuario usuario = usuarioRepository.findByCuilActivo(cuil);
        return usuario;
    }
}
