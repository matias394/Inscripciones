package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.mapper.CategoriaMapper;
import com.asi.inscripciones.mvp.service.CategoriaService;
import com.asi.inscripciones.mvp.service.OrganismoCategoriaService;
import com.asi.inscripciones.mvp.service.OrganismoService;
import com.asi.inscripciones.mvp.service.UsuarioService;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

/**
 * https://programmerclick.com/article/1254485947/
 */
@Log4j2
@RestController
@RequestMapping(Url.API+Url.CATEGORIAS)
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    @Autowired
    CategoriaMapper categoriaMapper;

    @Autowired
    OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    UsuarioService usuarioService;


    @GetMapping(Url.ALL)
    @ApiOperation(value = "Get All Categoria",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CategoriaDTO>> sedeList(){
        List<Categoria> categoria = categoriaService.getAll();
        List<CategoriaDTO> categoriaDTOList =  categoriaMapper.mapEntitytToDTO(categoria);
        List<CategoriaDTO> categoriaDTOListParse = new ArrayList<CategoriaDTO>(categoriaDTOList.size());
        for ( CategoriaDTO categoriaDTOs : categoriaDTOList ) {
            OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdCategoria(categoriaDTOs.id());
            if(organismoCategoria != null){
                CategoriaDTO categoriaDTO = CategoriaDTO.builder()
                        .id(categoriaDTOs.id())
                        .nombre(categoriaDTOs.nombre())
                        .nivel(categoriaDTOs.nivel())
                        .padreId(categoriaDTOs.padreId())
                        .seq(categoriaDTOs.seq())
                        .organismoId(organismoCategoria.getOrganismo().getId())
                        .estado(categoriaDTOs.estado()).build();

                categoriaDTOListParse.add(categoriaDTO);
            }

        }
        return ResponseEntity.status(HttpStatus.OK).body(categoriaDTOListParse);
    }


    @GetMapping
    @ApiOperation(value = "Get All Categortia",  produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
                    value = "Results page you want to retrieve (0..N)", defaultValue = "0"),
            @ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
                    value = "Number of records per page.", defaultValue = "10"),
            @ApiImplicitParam(name = "sort", allowMultiple = true, dataType = "string", paramType = "query",
                    value = "Sorting criteria in the format: property(,asc|desc). " +
                            " Default sort order is ascending. Multiple sort criteria are supported.")
    })
    public ResponseEntity<Page<CategoriaDTO>> categorias(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ){

        List<Categoria> categoria = categoriaService.getAllPage(ConstanteEstados.ACTIVO, filter, pageable);
        List<CategoriaDTO> categoriaDTOList =  categoriaMapper.mapEntitytToDTO(categoria);
        List<CategoriaDTO> categoriaDTOListParse = new ArrayList<CategoriaDTO>(categoriaDTOList.size());
        for ( CategoriaDTO categoriaDTOs : categoriaDTOList ) {
            OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdCategoria(categoriaDTOs.id());
            if(organismoCategoria != null){
                CategoriaDTO categoriaDTO = CategoriaDTO.builder()
                        .id(categoriaDTOs.id())
                        .nombre(categoriaDTOs.nombre())
                        .nivel(categoriaDTOs.nivel())
                        .padreId(categoriaDTOs.padreId())
                        .seq(categoriaDTOs.seq())
                        .nombreOrganismo(organismoCategoria.getOrganismo().getNombre())
                        .organismoId(organismoCategoria.getOrganismo().getId())
                        .estado(categoriaDTOs.estado()).build();

                categoriaDTOListParse.add(categoriaDTO);
            }

        }


        long totalCount = categoriaService.countCategoriasByEstadoAndNombre(ConstanteEstados.ACTIVO, filter);

        Page<CategoriaDTO> pageReturn = new PageImpl<>(categoriaDTOListParse, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ORGANISMOS+Url.ALL+"/{id}")
    @ApiOperation(value = "Get All Categorias por Organinismo",  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CategoriaDTO>> categoriaList(final @PathVariable Long id){

        List<Categoria> categoriaList = categoriaService.getOrganismoList(id);

        List<CategoriaDTO> categoriaDTOList =  categoriaMapper.mapEntitytToDTO(categoriaList);

        List<CategoriaDTO> categoriaDTOListParse = new ArrayList<CategoriaDTO>(categoriaDTOList.size());
        for ( CategoriaDTO categoriaDTOs : categoriaDTOList ) {
            OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdCategoria(categoriaDTOs.id());
            if(organismoCategoria != null){
                CategoriaDTO categoriaDTO = CategoriaDTO.builder()
                        .id(categoriaDTOs.id())
                        .nombre(categoriaDTOs.nombre())
                        .nivel(categoriaDTOs.nivel())
                        .padreId(categoriaDTOs.padreId())
                        .seq(categoriaDTOs.seq())
                        .organismoId(organismoCategoria.getOrganismo().getId())
                        .estado(categoriaDTOs.estado()).build();

                categoriaDTOListParse.add(categoriaDTO);
            }

        }

        return ResponseEntity.status(HttpStatus.OK).body(categoriaDTOListParse);
    }

    @ApiOperation(value = "Search Categoria by Id",  produces = MediaType.APPLICATION_JSON_VALUE)
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> getCategoriaById(@PathVariable Long id) {


        Categoria categoria;
        CategoriaDTO categoriaDTOParse = null;

        CategoriaDTO categoriaDTO = CategoriaDTO.builder().id(id).build();

        categoriaService.valid(categoriaDTO, Accion.CONSULTAR);

        try {

            categoria = categoriaService.findById(id);

            categoriaDTO = categoriaMapper.convertCategoriaToDto(categoria);

            OrganismoCategoria organismoCategoria = organismoCategoriaService.getByIdCategoria(categoriaDTO.id());
            if(organismoCategoria != null){
                categoriaDTOParse = CategoriaDTO.builder()
                        .id(categoriaDTO.id())
                        .nombre(categoriaDTO.nombre())
                        .nivel(categoriaDTO.nivel())
                        .padreId(categoriaDTO.padreId())
                        .seq(categoriaDTO.seq())
                        .organismoId(organismoCategoria.getOrganismo().getId())
                        .estado(categoriaDTO.estado()).build();

            }


        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return ResponseEntity.status(HttpStatus.OK).body(categoriaDTOParse);
    }

    @ApiOperation(value = "Add New Categoria", produces = MediaType.APPLICATION_JSON_VALUE)
    @PostMapping(value ="/{organismoId}")
    public ResponseEntity<Boolean> saveCategoria(@PathVariable Long organismoId, @RequestBody CategoriaDTO categoriaDTO) {
        Boolean create=false;
        Categoria categoria;
        OrganismoCategoria organismoCategoria ;
        categoriaService.valid(categoriaDTO, Accion.CREAR);

        try {

            categoria = categoriaService.loadCategoria(categoriaDTO, Accion.CREAR);

            categoria = categoriaService.save(categoria);

            organismoCategoria = organismoCategoriaService.load(organismoId, categoria);
            organismoCategoria = organismoCategoriaService.save(organismoCategoria);
            create=true;

        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, Constante.REASON,ex);
        } catch (Exception e){
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(create);

    }

    @PutMapping(value =Url.EDIT+"/{organismoId}")
    public ResponseEntity<Boolean> updateCategoria(@PathVariable Long organismoId, @RequestBody CategoriaDTO categoriaDTO) {
        boolean update = false;
        Categoria categoria;
        OrganismoCategoria organismoCategoria ;
        categoriaService.valid(categoriaDTO, Accion.MODIFICAR);

        try {
            categoria = categoriaService.loadCategoria(categoriaDTO, Accion.MODIFICAR);
            categoria = categoriaService.updateCategoria(categoria);

            organismoCategoria = organismoCategoriaService.getByIdCategoria(categoria.getId());

            if(organismoId != organismoCategoria.getOrganismo().getId()){
                organismoCategoria = organismoCategoriaService.loadUpdate(organismoId, organismoCategoria);
                organismoCategoria = organismoCategoriaService.save(organismoCategoria);
            }


            update = true;

        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON,ex);
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }

    @ApiOperation(value = "Delete Categoria by Id", produces = MediaType.APPLICATION_JSON_VALUE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCategoria(final @PathVariable Long id) {
        Boolean delete = false;
        CategoriaDTO categoriaDTO =  CategoriaDTO.builder().id(id).build();

        categoriaService.valid(categoriaDTO, Accion.ELIMINAR);

        OrganismoCategoriaDTO organismoCategoriaDTO = OrganismoCategoriaDTO.builder().categoria(id).build();
        organismoCategoriaService.valid(organismoCategoriaDTO, Accion.ELIMINAR);

        try {

            categoriaService.deleteById(id);
            organismoCategoriaService.deleteById(id);
            delete = true;
        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).body(delete);
    }

    @GetMapping("filtro" + "/{usuarioId}")
    public ResponseEntity<List<CategoriaFiltroDTO>> categoriaFilter(@PathVariable Long usuarioId) {
            List<CategoriaFiltroDTO> categoriaList = new ArrayList<>();
        try {

            Usuario usuarioDTO =  usuarioService.getUserById(usuarioId);
            usuarioDTO.getCategorias().forEach(categoria -> {
                CategoriaFiltroDTO categoriaFiltroDTO = CategoriaFiltroDTO.builder()
                        .id(categoria.getId())
                        .nombre(categoria.getNombre())
                        .estado(categoria.getEstado()).build();
                categoriaList.add(categoriaFiltroDTO);
            });

        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoriaList);

    }

}
