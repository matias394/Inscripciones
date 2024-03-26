package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.ClaseProfesor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClaseProfesorRepository extends JpaRepository<ClaseProfesor, Long> {

    @Query("SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId")
    List<ClaseProfesor> findByUsuarioId(final @Param("usuarioId") Long usuarioId);


    @Query("SELECT c FROM ClaseProfesor c WHERE c.id IN (:idList)")
    List<ClaseProfesor> findById(final @Param("idList") List<Long> idList, Pageable pageable);


    @Query("SELECT c FROM ClaseProfesor c WHERE c.id IN (:idList)")
    List<ClaseProfesor> findById(final @Param("idList") List<Long> idList);

    @Query("SELECT DISTINCT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId AND c.clase.instanciaSede.sede.id=:sedeId")
    List<ClaseProfesor> findByUsuarioAndSedeObject(final @Param("usuarioId") Long usuarioId,
                                                        final @Param("sedeId") Long sedeId);

    @Query("""
        SELECT c.id 
        FROM ClaseProfesor c 
        WHERE c.usuario.id=:usuarioId 
        AND c.clase.instanciaSede.sede.id=:sedeId
        """)
    List<Long> findByUsuarioAndSede(final @Param("usuarioId") Long usuarioId,
                                             final @Param("sedeId") Long sedeId);

    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:profesorId" +
            " AND c.clase.instanciaSede.sede.id=:sedeId " +
            " AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId ")
    List<ClaseProfesor> findByProfesorAndSedeAndInscripcion(final @Param("profesorId") Long profesorId,
                                                            final @Param("sedeId") Long sedeId,
                                                            final @Param("inscripcionId") Long inscripcionId);


    @Query(" SELECT c FROM ClaseProfesor c WHERE c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId ")
    List<ClaseProfesor> findByInscripcion(final @Param("inscripcionId") Long inscripcionId);


    @Query(" SELECT c FROM ClaseProfesor c WHERE c.clase.instanciaSede.instancia.id=:instanciaId ")
    List<ClaseProfesor> findByInstancia(final @Param("instanciaId") Long instanciaId);

    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:profesorId" +
            " AND c.clase.instanciaSede.sede.id=:sedeId " +
            " AND c.clase.instanciaSede.instancia.id=:instanciaId " +
            " AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId ")
    List<ClaseProfesor> findByProfesorAndSedeAndInscripcionAndInstancia(final @Param("profesorId") Long profesorId,
                                                            final @Param("sedeId") Long sedeId,
                                                            final @Param("inscripcionId") Long inscripcionId,
                                                            final @Param("instanciaId") Long instanciaId);



    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:profesorId" +
            " AND c.clase.instanciaSede.sede.id=:sedeId " +
            " AND c.clase.instanciaSede.instancia.id=:instanciaId ")
    List<ClaseProfesor> findByProfesorAndSedeAndInstancia(final @Param("profesorId") Long profesorId,
                                                          final @Param("sedeId") Long sedeId,
                                                          final @Param("instanciaId") Long instanciaId);

    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:profesorId" +
            " AND c.clase.instanciaSede.sede.id=:sedeId " +
            " AND c.clase.instanciaSede.id=:instanciaSedeId " +
            " AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId" +
            " AND c.clase.instanciaSede.instancia.id=:instanciaId ")
    List<ClaseProfesor> findByProfesorAndSedeAndInscripcionAndInstancia(final @Param("profesorId") Long profesorId,
                                                            final @Param("sedeId") Long sedeId,
                                                            final @Param("inscripcionId") Long inscripcionId,
                                                            final @Param("instanciaId") Long instanciaId,
                                                            final @Param("instanciaSedeId") Long instanciaSedeId);


    @Query("SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId")
    List<ClaseProfesor> findByUsuarioIdAndInscripcionId(final @Param("usuarioId") Long usuarioId,
                                                        final @Param("inscripcionId") Long inscripcionId);


    @Query("SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId AND c.clase.instanciaSede.instancia.id=:instanciaId")
    List<ClaseProfesor> findByUsuarioIdAndInstanciaId(final @Param("usuarioId") Long usuarioId,
                                                        final @Param("instanciaId") Long instanciaId);


    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId " +
            " AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId " +
            " AND c.clase.instanciaSede.instancia.id=:instanciaId")
    List<ClaseProfesor> findByUsuarioIdAndInscripcionIdAndInstanciaId(
            final @Param("usuarioId") Long usuarioId,
            final @Param("inscripcionId") Long inscripcionId,
            final @Param("instanciaId") Long instanciaId);


    @Query(" SELECT c FROM ClaseProfesor c WHERE c.usuario.id=:usuarioId " +
            " AND c.clase.instanciaSede.instancia.inscripcion.id=:inscripcionId " +
            " AND c.clase.instanciaSede.instancia.id=:instanciaId " +
            " AND c.clase.instanciaSede.id=:instanciaSedeId ")
    List<ClaseProfesor> findByUsuarioAndInscripcionAndInstanciaAndInstanciaSede(
            final @Param("usuarioId") Long usuarioId,
            final @Param("inscripcionId") Long inscripcionId,
            final @Param("instanciaId") Long instanciaId,
            final @Param("instanciaSedeId") Long instanciaSedeId);

    @Query("SELECT c FROM ClaseProfesor c WHERE c.clase.id=:claseId")
    List<ClaseProfesor> findByClaseId(final @Param("claseId") Long claseId);



}
