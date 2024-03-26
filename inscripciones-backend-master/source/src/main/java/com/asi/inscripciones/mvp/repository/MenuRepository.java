package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query("SELECT r FROM Menu r WHERE r.nombre = ?1")
    Menu findByName(String nombre);
    
}
