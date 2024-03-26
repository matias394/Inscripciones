package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.entity.UsuarioOrganismoCategoria;
import com.asi.inscripciones.mvp.repository.UsuarioOrganismoCategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioOrganismoCategoriaService {

    @Autowired
    private final UsuarioOrganismoCategoriaRepository usuarioOrganismoCategoriaRepository;

    @Autowired
    private OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    private UsuarioService usuarioService;


    public List<Usuario> getUsuarioByOrganismoCategoriaId(final Long id){

        List<Usuario> usuarioList = usuarioOrganismoCategoriaRepository.findByIdOrganismoCategoriaProfesor(id);

        usuarioList.add(usuarioService.getUserById(1L));

        return usuarioList;
    }

    public List<Usuario> getUsuarioByOrganismoAndCategoriaId(final Long id){

        List<Usuario> usuarioList = usuarioOrganismoCategoriaRepository.findByIdOrganismoAndCategoria(id);

        return usuarioList;
    }

    public UsuarioOrganismoCategoria getByIdUsuarioCategoria(final Long usuarioId, final Long categoriaId){
        Optional<UsuarioOrganismoCategoria> response = usuarioOrganismoCategoriaRepository.findByIdUsuarioCategoria(usuarioId,categoriaId);
        return response.orElse(new UsuarioOrganismoCategoria());
    }


    public List<OrganismoCategoria> getByIdUsuario(final Long id){

        List<UsuarioOrganismoCategoria> list = usuarioOrganismoCategoriaRepository.findByIdUsuario(id);

        List<OrganismoCategoria> responseList = list.stream().map(item->item.getOrganismoCategoria()).toList();
    
        return responseList;
    }


    public List<UsuarioOrganismoCategoria> getByIdUsuarioList(final Long usuarioId, final Long organismoId){

        List<UsuarioOrganismoCategoria> list = usuarioOrganismoCategoriaRepository.findByIdUsuarioAndOrganismoId(usuarioId,organismoId);

        return list;
    }


    public List<Categoria> getCategoriasByIdUsuario(final Long usuarioId){

        List<UsuarioOrganismoCategoria> list = usuarioOrganismoCategoriaRepository.findByIdUsuario(usuarioId);

        List<Categoria> responseList = list.stream().map(item->item.getOrganismoCategoria().getCategoria()).toList();
    
        return responseList;
    }





    public List<UsuarioOrganismoCategoria> load(Usuario usuario, List<OrganismoCategoria> list){

        var responseList = new  ArrayList<UsuarioOrganismoCategoria>();
        
        list.forEach(item->{
            UsuarioOrganismoCategoria usuarioOrganismoCategoria = new UsuarioOrganismoCategoria();
            usuarioOrganismoCategoria.setUsuario(usuario);
            usuarioOrganismoCategoria.setOrganismoCategoria(item);

            responseList.add(usuarioOrganismoCategoria);
        });

        return responseList;
    }


    public List<UsuarioOrganismoCategoria> loadUsuarioCategorias(final Usuario usuario, final List<Categoria> list, Long organismoId){

        var responseList = new  ArrayList<UsuarioOrganismoCategoria>();

        if (list != null) {
            list.forEach(categoria->{

                OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdOrganismoCategoria(organismoId, categoria.getId());

                var usuarioOrganismoCategoria = new UsuarioOrganismoCategoria();

                organismoCategoria.setCategoria(categoria);
                organismoCategoria.setOrganismo(usuario.getOrganismo());

                usuarioOrganismoCategoria.setUsuario(usuario);
                usuarioOrganismoCategoria.setOrganismoCategoria(organismoCategoria);

                responseList.add(usuarioOrganismoCategoria);
            });
        }

        return responseList;
    }


    public void save(final UsuarioOrganismoCategoria usuarioOrganismoCategoria){

        usuarioOrganismoCategoriaRepository.save(usuarioOrganismoCategoria);
    }


    public void saveList(List<UsuarioOrganismoCategoria> list){
        list.forEach(usuarioOrganismoCategoriaRepository::save);
    }


    public void delete(final UsuarioOrganismoCategoria item){

        Optional<UsuarioOrganismoCategoria>  delete = usuarioOrganismoCategoriaRepository
                                                .findByIdUsuarioCategoria(item.getUsuario().getId(), item.getOrganismoCategoria().getCategoria().getId());

        usuarioOrganismoCategoriaRepository.delete(delete.get());
    }



    public List<Categoria> getCategoriasByIdUsuarioPage(final Long usuarioId, final Pageable pageable){

        List<UsuarioOrganismoCategoria> list = usuarioOrganismoCategoriaRepository.findByIdUsuario(usuarioId,pageable);

        List<Categoria> responseList = list.stream().map(item->item.getOrganismoCategoria().getCategoria()).toList();

        return responseList;
    }



}
