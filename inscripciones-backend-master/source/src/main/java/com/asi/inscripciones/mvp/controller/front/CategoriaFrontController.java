package com.asi.inscripciones.mvp.controller.front;

import com.asi.inscripciones.mvp.dto.CategoriaDTO;
import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import com.asi.inscripciones.mvp.mapper.CategoriaMapper;
import com.asi.inscripciones.mvp.service.CategoriaService;
import com.asi.inscripciones.mvp.service.OrganismoCategoriaService;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.FRONT+Url.CATEGORIAS)
public class CategoriaFrontController {
    @Autowired
    CategoriaService categoriaService;

    @Autowired
    CategoriaMapper categoriaMapper;

    @Autowired
    OrganismoCategoriaService organismoCategoriaService;

    @GetMapping("/{categoriaId}")
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
    public ResponseEntity<Page<CategoriaDTO>> categoriasByOrganismoIDPage(
            @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter,
            final @PathVariable Long categoriaId
    ){

        List<Categoria> categoria = categoriaService.getAllByCategoriaIDPage(ConstanteEstados.ACTIVO, categoriaId, filter, pageable);
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


        long totalCount = categoriaService.countCategoriasByOrganismoIDAndEstadoAndNombre(ConstanteEstados.ACTIVO, categoriaId, filter);

        Page<CategoriaDTO> pageReturn = new PageImpl<>(categoriaDTOListParse, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }
}
