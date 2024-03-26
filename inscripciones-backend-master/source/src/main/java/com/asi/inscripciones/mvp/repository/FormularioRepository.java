package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Formulario;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import java.util.List;

public interface FormularioRepository extends JpaRepository<Formulario, Long>{
    
    @Query(value = "SELECT f From Formulario f WHERE f.id =:id")
    List<Formulario> findByIdFormulario(@Param("id") Long id);

    @Query(value = "SELECT f FROM Formulario f WHERE f.estado=:estado")
    List<Formulario> getStateAll( final @Param("estado") Integer estado);

    @Query(value = "SELECT f FROM Formulario f WHERE f.estado=:estado")
    List<Formulario> findAllPage(final @Param("estado") Integer estado, Pageable pageable);
    
    @Query(value = "SELECT f FROM Formulario f WHERE f.idRefMongo=:idRefMongo")
    Optional<Formulario> findByidRefMongo(final @Param("idRefMongo") String idRefMongo);
    
    long countByEstado(Integer estado);

    @Query("FROM Formulario f WHERE f.estado = :estado AND (CAST(f.id AS string) LIKE :filter OR UPPER(f.nombre) LIKE UPPER(:filter))")
    List<Formulario> findByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);
    
    @Query("SELECT COUNT(f) FROM Formulario f WHERE f.estado = :estado AND (CAST(f.id AS string) LIKE :filter OR UPPER(f.nombre) LIKE UPPER(:filter))")
    long countByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter);
}



