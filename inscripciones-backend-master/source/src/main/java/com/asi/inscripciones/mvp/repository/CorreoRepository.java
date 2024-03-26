package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Correo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CorreoRepository extends JpaRepository<Correo, Integer>{
    
    @Query("SELECT c FROM Correo c WHERE UPPER(c.nombre) = UPPER(?1)")
    Optional<Correo> findByName(String nombre);

    @Query(value = "SELECT c FROM Correo c WHERE c.estado=:estado")
    List<Correo> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT c FROM Correo c WHERE c.estado=:estado")
    List<Correo> findAllPage( final @Param("estado") Integer estado, Pageable pageable);

    Correo findById(Long id);

}
