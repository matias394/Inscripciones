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
import org.springframework.data.domain.jaxb.SpringDataJaxb.PageRequestDto;

import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.TestFactory;

@Import(TestFactory.class)
public class OrganismoServiceTest extends AbstractGenericTest  {
    
    @Autowired
    OrganismoService organismoService;
    
    @Test
    public void getOrganismoByName(){

        Organismo organismo = organismoService.getByName("Sin Organismo");
        assertNotNull(organismo);
    }

    @Test
    public void getOrganismoById(){

        Organismo organismo = organismoService.findById(1L);
        assertNotNull(organismo);
    }

    @Test
    public void saveOrganismoTest(){
        
        Organismo organismo = new Organismo();
        organismo.setNombre("ogranismo 1");
        organismo.setCreadoPor("admin");
        organismo.setModificadoPor("superUsuario");

        organismo = organismoService.save(organismo);

        assertNotNull(organismo);
    }

    @Test
    public void getOrganismoAll(){
        
        Pageable pageable = PageRequest.of(0, 10);
        
        List<Organismo> organismos = organismoService.getOrganismoAll(ConstanteEstados.ACTIVO, pageable);

        assertTrue(organismos.size()>0);
    }

    @Test
    public void updateTest(){
        
        Organismo organismo = new Organismo();

        organismo.setId(1L);
        organismo.setNombre("organismo organismo");
        organismo.setEstado(ConstanteEstados.ACTIVO);  

        organismo  = organismoService.updateOrganismo(organismo);
        
        assertNotNull(organismo);
    }

    @Test
    public void deleteTest(){
                
        id = 1L;
        organismoService.deleteById(id);
        Organismo organismo = organismoService.findById(1L);

        assertEquals(organismo.getEstado(),0);

    }
}
