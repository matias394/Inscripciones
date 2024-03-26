package com.asi.inscripciones.mvp.repository;


import com.asi.inscripciones.mvp.entity.Instancia;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface InstanciaRepository extends JpaRepository<Instancia, Long> {

    @Query(value = "SELECT i From Instancia i WHERE i.estado=1")
    List<Instancia> getAll();

    @Query(value = "SELECT i From Instancia i WHERE i.inscripcion.id =:id AND i.estado=1")
    List<Instancia> findByIdInscripcion(@Param("id") Long id);

    @Query(value = "SELECT i From Instancia i WHERE i.inscripcion.id =:id")
    List<Instancia> findByIdInscripcionAll(@Param("id") Long id);


    @Query(value = "SELECT i From Instancia i WHERE i.inscripcion.id =:id AND i.estado=1")

    //@Query(value = "SELECT i From Instancia i LEFT JOIN FETCH i.instanciaSede WHERE i.inscripcion.id =:id AND i.estado=1")
    //@EntityGraph(attributePaths = {"instanciaSede"}, type = EntityGraph.EntityGraphType.LOAD)
    List<Instancia> findByIdInscricionWhitInstanciaSede(@Param("id") Long id);

    @Query(value = "SELECT i FROM Instancia i WHERE i.inscripcion.tipo.id=:id And i.fechaInicio<:fechaActual")
    List<Instancia> findInstanciaByTipo(final @Param("id") Long id, final @Param("fechaActual") LocalDate fechaActual);

    @Query(value = "SELECT i.instancia FROM InstanciaSede i WHERE i.instancia.inscripcion.id=:inscripcionId And i.sede.id=:sedeId")
    List<Instancia> findInstanciaBySede(final @Param("inscripcionId") Long inscripcionId, final @Param("sedeId") Long sedeId);

    @Query(value = "SELECT i.instancia FROM InstanciaSede i WHERE i.sede.id=:idSede AND i.instancia.inscripcion.tipo.id=:idTipo")
    List<Instancia> findInstanciaByTipoSede(final @Param("idSede") Long idSede, final @Param("idTipo") Long idTipo);

    @Query(value = "SELECT i.instancia FROM InstanciaSede i WHERE i.instancia.inscripcion.id=:inscripcionId And i.sede.id=:sedeId AND i.instancia.estado = 1")
    List<Instancia> findInstanciaBySedeAndEstado(final @Param("inscripcionId") Long inscripcionId, final @Param("sedeId") Long sedeId);


}