package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Modalidad;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ModalidadRepository extends JpaRepository<Modalidad,Long>{
    
    @Query("SELECT m FROM Modalidad m WHERE UPPER(m.nombre) = UPPER(?1)")
    Optional<Modalidad> findByName(String nombre);

    @Query(value = "SELECT m FROM Modalidad m WHERE m.estado=:estado")
    List<Modalidad> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT m FROM Modalidad m WHERE m.estado=:estado")
    List<Modalidad> findAllPage( final @Param("estado") Integer estado, Pageable pageable);
    
}
