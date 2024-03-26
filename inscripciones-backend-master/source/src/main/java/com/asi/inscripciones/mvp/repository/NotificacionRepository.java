package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Notificacion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotificacionRepository extends JpaRepository<Notificacion,Long>{
    
    @Query("SELECT n FROM Notificacion n WHERE UPPER(n.nombre) = UPPER(?1)")
    Optional<Notificacion> findByName(String nombre);

    @Query(value = "SELECT n FROM Notificacion n WHERE n.estado=:estado")
    List<Notificacion> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT n FROM Notificacion n WHERE n.estado=:estado")
    List<Notificacion> findAllPage( final @Param("estado") Integer estado, Pageable pageable);

    
}
