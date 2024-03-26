package com.asi.inscripciones.mvp.controller.front;

import com.asi.inscripciones.mvp.dto.OrganismoDTO;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.mapper.OrganismoMapper;
import com.asi.inscripciones.mvp.service.OrganismoService;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping(Url.FRONT+Url.ORGANISMOS)
public class OrganismoFrontController {


    @Autowired
    private OrganismoService organismoService;

    @Autowired
    private OrganismoMapper organismoMapper;

    @GetMapping
    public ResponseEntity<Page<OrganismoDTO>> organismos(
            @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter
    ){

        List<Organismo> organismos = organismoService.getOrganismoAll(ConstanteEstados.ACTIVO, filter, pageable);

        List<OrganismoDTO> organismoDTOList =  organismoMapper.map(organismos);

        long totalCount = organismoService.countOrganismosByEstadoAndNombre(ConstanteEstados.ACTIVO, filter);

        Page<OrganismoDTO> pageReturn = new PageImpl<>(organismoDTOList, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }
}
