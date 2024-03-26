package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Tipo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TipoRepository extends JpaRepository<Tipo,Long>{
   
    
    @Query("SELECT t FROM Tipo t WHERE UPPER(t.nombre) = UPPER(?1)")
    Optional<Tipo> findByName(String nombre);

    @Query(value = "SELECT c FROM Tipo c WHERE c.estado=:estado")
    List<Tipo> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT t FROM Tipo t WHERE t.estado=:estado")
    List<Tipo> findAllPage( final @Param("estado") Integer estado, Pageable pageable);

}
