package com.asi.inscripciones.mvp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.RepositorioQR;

public interface RepositorioQRRepository extends JpaRepository<RepositorioQR,Long> {

    @Query("SELECT r FROM RepositorioQR r WHERE r.estado = 1")
    List<RepositorioQR> getAll();
    
}
