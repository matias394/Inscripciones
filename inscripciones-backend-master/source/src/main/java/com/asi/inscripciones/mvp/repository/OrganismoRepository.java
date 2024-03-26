package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Organismo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrganismoRepository extends JpaRepository<Organismo,Long> {
    
    List<Organismo> findByEstadoLike(Integer estado, Pageable pageable);

    @Query("SELECT o FROM Organismo o WHERE UPPER(o.nombre) = UPPER(?1)")
    Optional<Organismo> findByName(String nombre);

    @Query(value = "SELECT o FROM Organismo o WHERE o.estado=:estado")
    List<Organismo> getStateAll( final @Param("estado") Integer estado);

    long countByEstado(Integer estado);
    
    @Query("FROM Organismo o WHERE o.estado = :estado AND (CAST(o.id AS string) LIKE :filter OR UPPER(o.nombre) LIKE UPPER(:filter))")
    List<Organismo> findByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);
    
    @Query("SELECT COUNT(o) FROM Organismo o WHERE o.estado = :estado AND (CAST(o.id AS string) LIKE :filter OR UPPER(o.nombre) LIKE UPPER(:filter))")
    long countByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter);

}
