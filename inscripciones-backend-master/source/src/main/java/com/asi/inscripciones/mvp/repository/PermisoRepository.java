package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Permiso;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PermisoRepository extends JpaRepository<Permiso, Long> {
    
    @Query("SELECT r FROM Permiso r WHERE UPPER(r.nombre) = UPPER(?1)")
    Permiso findByName(String name);

    List<Permiso> findByEstadoLike(Integer estado, Pageable pageable);
    
    @Query(value = "SELECT r FROM Permiso r WHERE r.estado=:estado")
    List<Permiso> getStateAll( final @Param("estado") Integer estado);
}
