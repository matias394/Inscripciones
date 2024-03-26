package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.entity.Sede;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;


public interface InstanciaSedeRepository extends PagingAndSortingRepository<InstanciaSede,Long> {
     
     @Query("SELECT i FROM InstanciaSede i WHERE i.id=:instanciaSedeId AND i.estado=1")
     InstanciaSede findByIdInstanciaSede(@Param("instanciaSedeId") final Long instanciaSedeId);

    @Query("SELECT i FROM InstanciaSede i WHERE i.id=:id")
    Optional<InstanciaSede> findById(@Param("id") final Long id);

    @Query("SELECT i.id as id, " +
            "i.instancia.inscripcion.id as inscripcionId, " +
            "i.instancia.inscripcion.nombre as inscripcionNombre, " +
            "i.instancia.inscripcion.estado as inscripcionEstado, " +
            "i.instancia.id as instanciaId, " +
            "i.instancia.nombre as instanciaNombre, " +
            "i.instancia.estado as instanciaEstado, " +
            "i.instancia.fechaInicio as instanciaFechaInicio, " +
            "i.instancia.fechaFin as instanciaFechaFin, " +
            "i.sede.id as sedeId, " +
            "i.sede.nombre as sedeNombre, " +
            "i.sede.bloqueado as sedeBloqueado, " +
            "i.instancia.inscripcion.organismoCategoria.categoria.id as categoriaId, " +
            "i.instancia.inscripcion.organismoCategoria.categoria.nombre as categoriaNombre, " +
            "i.instancia.inscripcion.organismoCategoria.organismo.id as organismoId, " +
            "i.instancia.inscripcion.organismoCategoria.organismo.nombre as organismoNombre " +
            "FROM InstanciaSede i WHERE i.id=:id")
    Optional<InstanciaSedeProjection> getProjectionById(@Param("id") final Long id);

    @Query("SELECT i FROM InstanciaSede i WHERE i.instancia.id=:instaciaId AND i.estado=1")
    @EntityGraph(attributePaths = "clase", type = EntityGraph.EntityGraphType.LOAD)
    List<InstanciaSede> findByInstanciaId1(@Param("instaciaId") final Long instaciaId);

    @Query("SELECT i FROM InstanciaSede i WHERE i.estado=1")
    List<InstanciaSede> getAllAvailable();

    @Query("SELECT i FROM InstanciaSede i")
    List<InstanciaSede> getAll();

    @Query("SELECT i FROM InstanciaSede i WHERE i.instancia.id=:instaciaId AND i.estado=1")
    List<InstanciaSede> findByInstanciaId(@Param("instaciaId") final Long instaciaId);

    @Query("SELECT i FROM InstanciaSede i WHERE i.instancia.id=:instaciaId AND i.estado=1")
    List<InstanciaSede> findByInstanciaIdSecond(@Param("instaciaId") final Long instaciaId);

    @Query("SELECT i FROM InstanciaSede i WHERE i.instancia.id=:instaciaId AND i.sede.id=:sedeId")
    List<InstanciaSede> findByInstanciaAndSedeId(
            @Param("instaciaId") final Long instaciaId,
            @Param("sedeId") final Long sedeId);


    @Query(value = """
            SELECT i 
            FROM InstanciaSede i 
            WHERE i.instancia.id=:instanciaId
            AND i.instancia.estado=1
            AND i.instancia.inscripcion.estado=1
            """)
    List<InstanciaSede> getByInstancia(final @Param("instanciaId")
                              Long instanciaId,
                              Pageable pageable);

    @Query(value = """
            SELECT COUNT(i) 
            FROM InstanciaSede i 
            WHERE i.instancia.id=:instanciaId
            AND i.instancia.estado=1
            AND i.instancia.inscripcion.estado=1
            """)
    long getByInstanciaCount(final @Param("instanciaId") Long instanciaId);

    @Query(value = """
            SELECT i 
            FROM InstanciaSede i 
            WHERE i.instancia.inscripcion.id=:inscripcionId
            AND i.instancia.estado=1
            AND i.instancia.inscripcion.estado=1
            """)
    List<InstanciaSede> getByInscripcionId(final @Param("inscripcionId")
                                         Long inscripcionId);
    @Query(value = """
            SELECT i 
            FROM InstanciaSede i 
            WHERE i.instancia.inscripcion.id=:inscripcionId
            AND i.instancia.estado=1
            AND i.instancia.inscripcion.estado=1
            """)
    List<InstanciaSede> getByInscripcion(final @Param("inscripcionId")
                                                Long inscripcionId,
                                                Pageable pageable);


    @Query(value = """
            SELECT COUNT(i) 
            FROM InstanciaSede i 
            WHERE i.instancia.inscripcion.id=:inscripcionId
            AND i.instancia.estado=1
            AND i.instancia.inscripcion.estado=1
            """)
    long getByInscripcionCount(final @Param("inscripcionId") Long inscripcionId);
}
