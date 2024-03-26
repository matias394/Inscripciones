package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Estado;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EstadoRepository extends JpaRepository<Estado,Long>{
    

    @Query("SELECT e FROM Estado e WHERE UPPER(e.nombre) = UPPER(?1)")
    Optional<Estado> findByName(String nombre);

    @Query(value = "SELECT e FROM Estado e WHERE e.estado=:estado")
    List<Estado> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT c FROM Estado c WHERE c.estado=:estado")
    List<Estado> findAllPage( final @Param("estado") Integer estado, Pageable pageable);
}
