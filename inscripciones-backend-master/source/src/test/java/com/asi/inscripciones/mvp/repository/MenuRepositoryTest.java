package com.asi.inscripciones.mvp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.asi.inscripciones.mvp.entity.Menu;
import com.asi.inscripciones.mvp.util.AbstractGenericTest;
import com.asi.inscripciones.mvp.util.ConstanteEstados;

public class MenuRepositoryTest extends AbstractGenericTest{

    @Autowired
    MenuRepository menuRepository;

    Long id=1L;

    @Test
    @Order(1)
    public void saveTest(){
        
        Menu menu = new Menu();
        menu.setNombre("Segundo Menu");
        menu.setBaja(ConstanteEstados.ACTIVO);
        menu.setHijoOrden(2L);
        menu.setColor("Yellow");
        menu.setEstilo("dark");
        menu.setIcono("female");
        menu.setPadreId(1L);
        menu.setRuta("C:documents");

        Menu menuTest = menuRepository.save(menu);

        assertNotNull(menuTest);

    }

    @Test
    @Order(2)
    public void findByIdTest(){

        Optional<Menu> menu = menuRepository.findById(id);

        assertNotNull(menu.get());
    }

    @Test
    @Order(3)
    public void updateTest(){

        String nuevoNombre = "nuevo";
        Optional<Menu> menu = menuRepository.findById(id);

        Menu menuTest = menu.get();
        menuTest.setNombre(nuevoNombre);

        menuTest = menuRepository.save(menuTest);

        assertEquals(menuTest.getNombre(), nuevoNombre);
        
    }

    @Test
    @Order(4)
    public void countTest(){
        Long  count = menuRepository.count();

        assertTrue(count>0);
    }

    @Test
    @Order(5)
    public void findByEstadoLike(){
        
        Pageable pageable = PageRequest.of(0, 10, Sort.by("id"));
        Page<Menu> menuPage = menuRepository.findAll(pageable);

        assertTrue(menuPage.getSize()>0);
    }
}
