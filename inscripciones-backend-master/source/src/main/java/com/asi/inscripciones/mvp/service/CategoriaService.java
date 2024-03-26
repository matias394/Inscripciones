package com.asi.inscripciones.mvp.service;
import com.asi.inscripciones.mvp.dto.CategoriaDTO;
import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.mapper.CategoriaMapper;
import com.asi.inscripciones.mvp.repository.CategoriaRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriaService {


    @Autowired
    private final CategoriaRepository categoriaRepository;
    
    @Autowired
    private OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    private CategoriaMapper categoriaMapper;

    @Value("${error.generic.id}")
    private String mensajeErrorId;

    public List<Categoria> getAll(){

        List<Categoria> response = categoriaRepository.findAll();
        return response;
    }

    public List<Categoria> getAll(final List<Long> ids){

        List<Categoria> response = categoriaRepository.findAllById(ids);
        return response;
    }

    
    public List<Categoria> getAllPage(final Integer estado, String filter, final Pageable pageable){

        if (filter != null && !filter.trim().isEmpty()) {
            return categoriaRepository.findByEstadoAndIdOrNombreLike(estado,  "%" + filter + "%", pageable);
        } else {
            return categoriaRepository.findByEstadoLike(estado, pageable);
        }

    }

    public List<Categoria> getAllByCategoriaIDPage(final Integer estado, Long organismoID, String filter, final Pageable pageable){

        if (filter != null && !filter.trim().isEmpty()) {
            return categoriaRepository.findByOrganismoIdAndEstadoAndIdOrNombreLike(organismoID, estado,  "%" + filter + "%", pageable);
        } else {
            return categoriaRepository.findByOrganismoIdAndEstado(organismoID, estado, pageable);
        }

    }


    public List<Categoria> getOrganismoList(final Long organismoId){

        List<OrganismoCategoria> organismoCategorias = organismoCategoriaService.getByIdOrganismo(organismoId);

        List<Categoria> categoriaList = organismoCategorias.stream().map(i->i.getCategoria()).toList();

        return categoriaList;

    }



    public Categoria getById(final Long id){

        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.orElse(new Categoria());
    }


    public List<Categoria> getNivel(final String level){
        List<Categoria> response = categoriaRepository.findByNivel(level);
        return response;
    }

    
    public List<Categoria> getParent(final String parent){
        List<Categoria> response = categoriaRepository.findByParent(parent);
        return response;
    }

    public Categoria save( @NotNull final Categoria categoria) {
        Categoria response = categoriaRepository.save(categoria);
        return response;
    }

    @Transactional
    public Categoria updateCategoria(Categoria categoria){

        return categoriaRepository.save(categoria);

    }

    public void deleteById(final Long id) {

        Categoria categoria = this.findById(id);
        categoria.setEstado(ConstanteEstados.INACTIVO);
        categoriaRepository.save(categoria);
    }

    public void valid(final CategoriaDTO categoriaDTO, final Accion accion){

        if (accion.equals(Accion.CREAR)) {

            Optional<Categoria> categoria = categoriaRepository.findByName(categoriaDTO.nombre());

            if (categoria.isPresent())
                throw new ResponseStatusException(HttpStatus.FOUND);

            if (ObjectUtils.isNotEmpty(categoriaDTO.id()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);

            if (ObjectUtils.isEmpty(categoriaDTO.nombre()))
                throw new ResponseStatusException(HttpStatus.CONFLICT);


        } else if (accion.equals(Accion.MODIFICAR)) {

            if (ObjectUtils.isEmpty(categoriaDTO.id()))
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);

            Optional<Categoria> categoria = categoriaRepository.findByIdCategoria(categoriaDTO.id());

            if (categoria.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);


        } else if (accion.equals((Accion.CONSULTAR))) {
            Optional<Categoria> categoria = categoriaRepository.findByIdCategoria(categoriaDTO.id());

            if (categoria.isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);


        } else if(accion.equals(Accion.ELIMINAR)){

            Categoria categoria = this.findById(categoriaDTO.id());
            if (ObjectUtils.isEmpty(categoria.getId()))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        }
    }

    public Categoria loadCategoria(final CategoriaDTO categoriaDTO, Accion accion){

        Categoria categoria = categoriaMapper.convertDtoToCategoria(categoriaDTO);

        if (accion.equals(Accion.MODIFICAR)) {

            Categoria categoriaActual = this.findById(categoriaDTO.id());

            categoria.setCreado(categoriaActual.getCreado());
            categoria.setCreadoPor(categoriaActual.getCreadoPor());
        }

        return categoria;
    }

    public Categoria findById( @NotNull final Long id) {
        Optional<Categoria> response = categoriaRepository.findById(id);
        return response.orElse(new Categoria());
    }
    
    public long countCategoriaByEstado(Integer estado) {
        return categoriaRepository.countByEstado(estado);
    }

    public long countCategoriasByEstadoAndNombre(Integer estado, String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return categoriaRepository.countByEstadoAndIdOrNombreLike(estado, "%" + filter + "%");
        } else {
            return categoriaRepository.countByEstado(estado);
        }
    }

    public long countCategoriasByOrganismoIDAndEstadoAndNombre(Integer estado, Long organismoID, String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return categoriaRepository.countByOrganismoIdAndEstadoAndIdOrNombreLike(organismoID, estado, "%" + filter + "%");
        } else {
            return categoriaRepository.countByOrganismoIdAndEstado(organismoID, estado);
        }
    }
}
