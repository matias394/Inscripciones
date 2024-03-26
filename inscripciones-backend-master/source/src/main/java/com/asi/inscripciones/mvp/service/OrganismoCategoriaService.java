package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.CategoriaDTO;
import com.asi.inscripciones.mvp.dto.OrganismoCategoriaDTO;
import com.asi.inscripciones.mvp.dto.UsuarioDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.repository.OrganismoCategoriaRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganismoCategoriaService {
    
    private final OrganismoCategoriaRepository organismoCategoriaRepository;

    @Autowired
    private UsuarioOrganismoCategoriaService uocService;

    @Autowired
    private OrganismoService organismoService;


    public OrganismoCategoria getOrganismoCategoriaById(Long id){
        
        Optional<OrganismoCategoria> organismoCategoria = organismoCategoriaRepository.findById(id);
        return organismoCategoria.orElse(new OrganismoCategoria());
    }

    public List<OrganismoCategoria> getAllById(List<Long> idList){

        List<OrganismoCategoria> response = organismoCategoriaRepository.findAllById(idList);

        return response;

    }


    public List<OrganismoCategoria> getByIdOrganismoCategoriaID(Long organismoId, List<Long> categoriaList){

        List<OrganismoCategoria> responseList = new ArrayList<>();
        
        categoriaList.forEach(item->{
            var organismoCategoria = organismoCategoriaRepository.findByIdOrganismoAndIdCategoria(organismoId,item);
            if (organismoCategoria != null)
                responseList.add(organismoCategoria);
        });

        return responseList;
    }


    public OrganismoCategoria getByIdOrganismoCategoria(final Long organismoId, final Long categoriaId){

        OrganismoCategoria organismoCategoria = organismoCategoriaRepository.findByIdOrganismoAndIdCategoria(organismoId,categoriaId);

        return organismoCategoria;
    }


    public List<OrganismoCategoria> getByIdOrganismo(final Long organismoId){

        List<OrganismoCategoria> organismoCategoria = organismoCategoriaRepository.findByIdOrganismo(organismoId);

        return organismoCategoria;
    }

    public OrganismoCategoria getByIdCategoria(final Long categoriaId){

        OrganismoCategoria organismoCategoria = organismoCategoriaRepository.findByIdCategoria(categoriaId);

        return organismoCategoria;
    }


    public void valid(final OrganismoCategoriaDTO organismoCategoriaDTO, final Accion accion){

        if (accion.equals(Accion.CONSULTAR)) {
            
            if ((ObjectUtils.isEmpty(organismoCategoriaDTO.organismo())) || (ObjectUtils.isEmpty(organismoCategoriaDTO.organismo())))
                throw new GenericException(CodigoError.E037.getCodigo(),CodigoError.E037.getMensaje());
        }
        else if (accion.equals(Accion.CREAR)) {

            Optional<OrganismoCategoria> organismoCategoria = Optional.ofNullable(organismoCategoriaRepository.findByIdOrganismoAndIdCategoria(organismoCategoriaDTO.organismo(), organismoCategoriaDTO.categoria()));

            if (organismoCategoria.isPresent())
                throw new ResponseStatusException(HttpStatus.FOUND);

            if (org.apache.commons.lang3.ObjectUtils.isNotEmpty(organismoCategoriaDTO.id()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);

            if (org.apache.commons.lang3.ObjectUtils.isEmpty(organismoCategoriaDTO.organismo()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);


        } else if (accion.equals(Accion.MODIFICAR)) {

            if (org.apache.commons.lang3.ObjectUtils.isEmpty(organismoCategoriaDTO.id()))
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);

            Optional<OrganismoCategoria> organismoCategoria = Optional.ofNullable(organismoCategoriaRepository.findByIdOrganismoAndIdCategoria(organismoCategoriaDTO.organismo(), organismoCategoriaDTO.categoria()));

            if (organismoCategoria.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        } else if(accion.equals(Accion.ELIMINAR)){

            OrganismoCategoria organismoCategoria = this.organismoCategoriaRepository.findByIdCategoria(organismoCategoriaDTO.categoria());
            if (org.apache.commons.lang3.ObjectUtils.isEmpty(organismoCategoria.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

            List<Usuario> usuario = this.uocService.getUsuarioByOrganismoAndCategoriaId(organismoCategoria.getId());
            if (org.apache.commons.lang3.ObjectUtils.isNotEmpty(usuario))
                throw new GenericException(CodigoError.E041.getCodigo(), CodigoError.E041.getMensaje());

        }
    }


    public OrganismoCategoria getById(final Long id){

        Optional<OrganismoCategoria> organismoCategoria = organismoCategoriaRepository.findById(id);

        return organismoCategoria.orElse(new OrganismoCategoria());
    }

    public OrganismoCategoria save(OrganismoCategoria organismoCategoria) {
        OrganismoCategoria response = organismoCategoriaRepository.save(organismoCategoria);
        return response;
    }

    public void deleteById(final Long id) {

        OrganismoCategoria organismoCategoria = organismoCategoriaRepository.findByIdCategoria(id);
        organismoCategoria.setEstado(ConstanteEstados.INACTIVO);
        organismoCategoriaRepository.save(organismoCategoria);
    }

    public OrganismoCategoria load (Long organismoId, Categoria categoria){

        OrganismoCategoria organismoCategoria = new OrganismoCategoria();

        Organismo organismo = organismoService.findById(organismoId);

        organismoCategoria.setCategoria(categoria);
        organismoCategoria.setOrganismo(organismo);
        organismoCategoria.setEstado(1);


        return organismoCategoria;
    }

    public OrganismoCategoria loadUpdate (Long organismoId, OrganismoCategoria organismoCategoria){

        Organismo organismo = organismoService.findById(organismoId);

        organismoCategoria.setCategoria(organismoCategoria.getCategoria());
        organismoCategoria.setOrganismo(organismo);
        organismoCategoria.setEstado(1);


        return organismoCategoria;
    }





    public void saveOrganismoCategoria(UsuarioDTO usuarioDTO, Usuario usuario, Accion accion){

        List<OrganismoCategoria> organismoCategoriaNuevoList;
        List<UsuarioOrganismoCategoria> usuarioOrganismoCategoria;

        if ((usuarioDTO.getOrganismo() != null) && (usuarioDTO.getOrganismo() != null)) {
            organismoCategoriaNuevoList =  getByIdOrganismoCategoriaID(usuarioDTO.getOrganismo(),usuarioDTO.getCategoria());
        } else {
            organismoCategoriaNuevoList = new ArrayList<>();
        }

        if(Accion.CREAR.equals(accion)){

            if (organismoCategoriaNuevoList.size() > 0){
                List<UsuarioOrganismoCategoria> uocList =  uocService.load(usuario, organismoCategoriaNuevoList);
                uocService.saveList(uocList);
            }


        } else if(Accion.MODIFICAR.equals(accion)){

            usuarioOrganismoCategoria = uocService.getByIdUsuarioList(usuario.getId(), usuario.getOrganismo().getId());

            List<OrganismoCategoria> organismoCategoriaActualList = usuarioOrganismoCategoria.stream().map(UsuarioOrganismoCategoria::getOrganismoCategoria).toList();

            List<OrganismoCategoria> nuevoList = new ArrayList<>();
            List<OrganismoCategoria> eliminarList = new ArrayList<>();


            for (OrganismoCategoria nuevo: organismoCategoriaNuevoList) {

                Optional<OrganismoCategoria>  optional =  organismoCategoriaActualList.stream().filter(item-> item.getCategoria().getId().equals(nuevo.getCategoria().getId())).findFirst();

                if(optional.isEmpty())
                    nuevoList.add(nuevo);

            }


            for (OrganismoCategoria actualOrganismo: organismoCategoriaActualList) {

                eliminarList = organismoCategoriaNuevoList.stream()
                        .filter(item->
                                ! (item.getOrganismo().getId().equals(actualOrganismo.getOrganismo().getId()) && item.getCategoria().getId().equals(actualOrganismo.getCategoria().getId())))
                        .toList();
            }


            if (nuevoList.size() > 0){
                List<UsuarioOrganismoCategoria> uocList =  uocService.load(usuario, nuevoList);
                uocService.saveList(uocList);
            }

            if (eliminarList.size() > 0){
                List<UsuarioOrganismoCategoria> uocList =  uocService.load(usuario, eliminarList);

                uocList.forEach(uocService::delete);
            }

        }

    }

}
