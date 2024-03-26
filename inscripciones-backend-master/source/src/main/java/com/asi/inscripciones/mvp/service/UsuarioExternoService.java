package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.apiext.ActiveDirectoryService;
import com.asi.inscripciones.mvp.dto.UsuarioAdDTO;
import com.asi.inscripciones.mvp.dto.UsuarioExternoDTO;
import com.asi.inscripciones.mvp.dto.UsuarioExternoValidacionDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.UsuarioExternoMapper;
import com.asi.inscripciones.mvp.repository.UsuarioExternoRepository;
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

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UsuarioExternoService {

    @Autowired
    final private UsuarioExternoRepository usuarioExternoRepository;

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
    private UsuarioExternoMapper usuarioExternoMapper;

    public UsuarioExterno getUserById(final Long id) {

        Optional<UsuarioExterno>  usuario = usuarioExternoRepository.findById(id);

        if(usuario.isPresent()){
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(usuario.get().getId());
            usuario.get().setCategorias(categoriaList);    
        }
        
        return usuario.orElse(new UsuarioExterno());
    }

    
    public UsuarioExterno getUserByEmail(final String email) {
        Optional<UsuarioExterno> usuario = usuarioExternoRepository.findByEmail(email);
        return usuario.orElse(new UsuarioExterno());
    }

    public List<UsuarioExterno> getUserByOrganismoAndProfesor(final Long organismo) {
        List<UsuarioExterno> usuarioList = usuarioExternoRepository.findByOrganismo(organismo);
        return usuarioList;
    }



    
    public UsuarioExterno getUserByDni(final String dni) {

        Optional<UsuarioExterno> usuario = usuarioExternoRepository.findByDni(dni);
        return usuario.orElse(new UsuarioExterno());
    }


    public UsuarioExterno getUserByCuil(final String cuil) {

        Optional<UsuarioExterno> usuario = usuarioExternoRepository.findByCuil(cuil);
        return usuario.orElse(new UsuarioExterno());
    }



    public Page<UsuarioExterno> getAllByRole(final Integer estado, final Pageable pageable) {
        
        Page<UsuarioExterno> usuarioPage = usuarioExternoRepository.findByEstadoLike(estado, pageable);

        usuarioPage.forEach(item->{
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(item.getId());
            item.setCategorias(categoriaList); 
        });

        return usuarioPage;
    }


    public Page<UsuarioExterno> getAllUserAdmin(final Integer estado, final Pageable pageable) {

        Page<UsuarioExterno> usuarioPage = usuarioExternoRepository.findByEstadoAndRolAdminLike(estado, pageable);

        usuarioPage.forEach(item->{
            List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(item.getId());
            item.setCategorias(categoriaList);
        });

        return usuarioPage;
    }


    public UsuarioExterno saveUser(final UsuarioExterno user) {
        // Save users and UserOrganismoCategoria records.
        List<UsuarioOrganismoCategoria> nuevoList = new ArrayList<>();

        nuevoList = uocService.loadUsuarioCategorias(usuarioExternoMapper.mapUsuarioExternotoUsuario(user), user.getCategorias(), user.getOrganismo().getId());
        // System.out.println(nuevoList);

        UsuarioExterno usuario = usuarioExternoRepository.save(user);

        nuevoList.forEach(uocService::save);

        return usuario;
    }


    @Transactional
    public void updateUser(final UsuarioExterno usuario) {

        UsuarioExterno usuarioActual = getUserById(usuario.getId());
        if(usuarioActual.getEstado() != 2){
        
            List<Categoria> categoriaActual = uocService.getCategoriasByIdUsuario(usuario.getId());

            List<Categoria> categoriaEliminar = new ArrayList<>();

            List<Categoria> categoriaNuevos = new ArrayList<>();

            List<UsuarioOrganismoCategoria> eliminarList = new ArrayList<>();

            List<UsuarioOrganismoCategoria> nuevoList = new ArrayList<>();

        if(ObjectUtils.isNotEmpty(usuario.getCategorias()) && ObjectUtils.isNotEmpty(categoriaActual)){

            categoriaNuevos  = usuario.getCategorias().stream().filter(item -> ! categoriaActual.contains(item)).toList();

            categoriaEliminar = categoriaActual.stream().filter(item -> ! usuario.getCategorias().contains(item)).toList();

            eliminarList = uocService.loadUsuarioCategorias(usuarioExternoMapper.mapUsuarioExternotoUsuario(usuarioActual), categoriaEliminar,usuarioActual.getOrganismo().getId());

            nuevoList = uocService.loadUsuarioCategorias(usuarioExternoMapper.mapUsuarioExternotoUsuario(usuario), categoriaNuevos, usuario.getOrganismo().getId());

        } else if(ObjectUtils.isNotEmpty(usuario.getCategorias())){

            nuevoList = uocService.loadUsuarioCategorias(usuarioExternoMapper.mapUsuarioExternotoUsuario(usuario), usuario.getCategorias(),usuario.getOrganismo().getId());

        }
            usuarioExternoRepository.save(usuario);

            eliminarList.forEach(uocService::delete);

            nuevoList.forEach(uocService::save);
        }else{
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }

    
    public void deleteById(final Long id) {

        UsuarioExterno usuario = this.getUserById(id);
        usuario.setEstado(ConstanteEstados.INACTIVO);
        usuarioExternoRepository.save(usuario);
    }


    public UsuarioExterno validUser(final String cuil, final String password){

        Optional<UsuarioExterno> optional = usuarioExternoRepository.findByCuilAndPassword(cuil,password, ConstanteEstados.ADMIN);

        return optional.orElse(new UsuarioExterno());
    }

    public UsuarioExternoValidacionDTO validUserBack(final String cuil, final String password){
        UsuarioExternoValidacionDTO response = new UsuarioExternoValidacionDTO();

        Boolean validation = activeDirectoryService.authenticate(cuil, password);

        Optional<UsuarioExterno> usuarioValid = usuarioExternoRepository.findByCuil(cuil);

        if(validation && !usuarioValid.isEmpty() && usuarioValid.get().getEstado() == ConstanteEstados.ACTIVO){
            Optional<UsuarioExterno> usuarioResponse = usuarioExternoRepository.findById(usuarioValid.get().getId());
            if(usuarioResponse.isPresent()){
                List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(usuarioResponse.get().getId());
                usuarioResponse.get().setCategorias(categoriaList);
            }
            UsuarioExterno usuarioActual = getUserById(usuarioValid.get().getId());
            usuarioActual.setIntentos(0);
            usuarioExternoRepository.save(usuarioActual);
            response.setUsuario(usuarioActual);
            response.setValidacion(true);
        }else if(usuarioValid.get().getEstado() != ConstanteEstados.INACTIVO){
            Integer intentos;
            response.setValidacion(false);
            UsuarioExterno usuarioActual = getUserById(usuarioValid.get().getId());
             if(usuarioActual.getIntentos() != null){
                intentos = usuarioActual.getIntentos()+1;
            }else{
                intentos = 1;
            }
            if(intentos >= 10){
                usuarioActual.setIntentos(intentos);
                usuarioActual.setEstado(0);
                usuarioExternoRepository.save(usuarioActual);
                throw new GenericException(CodigoError.E039.getCodigo(),CodigoError.E039.getMensaje());
            }else{
                usuarioActual.setIntentos(intentos);
                usuarioExternoRepository.save(usuarioActual);
            }
        }else{
            response.setValidacion(false);
        }
        return response;
    }


    public UsuarioExternoDTO getUserFromAD(String cuil){

        UsuarioAdDTO usuarioAD = activeDirectoryService.getUserAd(cuil);

        if(ObjectUtils.isEmpty(usuarioAD))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        UsuarioExternoDTO response = UsuarioExternoDTO.builder()
                                .cuil(usuarioAD.getNumeroCui())
                                .nombre(usuarioAD.getNombre())
                                .apellido(usuarioAD.getApellido())
                                .email(usuarioAD.getEmail())
                                .build();

        return response;
    }


    public void valid(final UsuarioExternoDTO usuarioDTO, final Accion accion){

        if(accion.equals(Accion.CREAR)){
            
            if(ObjectUtils.isNotEmpty( usuarioDTO.getId()))
                throw new GenericException(CodigoError.E002.getCodigo(),CodigoError.E002.getMensaje());

            UsuarioExterno response = this.getUserByEmail(usuarioDTO.getEmail());
            if (ObjectUtils.isNotEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.FOUND);

            response = this.getUserByCuil(usuarioDTO.getCuil());
            if (ObjectUtils.isNotEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.FOUND);   
                
        


        } else if(accion.equals(Accion.MODIFICAR)){

            UsuarioExterno response = this.getUserById(usuarioDTO.getId());
            if (ObjectUtils.isEmpty(response.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        } else if(accion.equals(Accion.ELIMINAR)){

            UsuarioExterno usuario = this.getUserById(usuarioDTO.getId());
            if (ObjectUtils.isEmpty(usuario.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        
    }


    public UsuarioExterno loadUsuario(final UsuarioExternoDTO usuarioDTO, final Accion accion){



        UsuarioExterno usuario = usuarioExternoMapper.convertDtoToUsuario(usuarioDTO);

        Organismo organismo = organismoService.findById(usuarioDTO.getOrganismo());
        usuario.setOrganismo(organismo);
        
        Rol rol = roleService.getRolById(usuarioDTO.getRol());
        usuario.setRol(rol);



        if(accion.equals(Accion.MODIFICAR)){

            UsuarioExterno response = this.getUserById(usuarioDTO.getId());

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
        Optional<UsuarioExterno> usuarioValid = usuarioExternoRepository.findByCuil(cuil);
        UsuarioExterno usuarioActual = getUserById(usuarioValid.get().getId());
        usuarioActual.setIntentos(0);
        usuarioActual.setEstado(1);
        usuarioExternoRepository.save(usuarioActual);
    }

}
