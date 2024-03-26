package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.ClaseAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClaseAlumnoRepository extends JpaRepository<ClaseAlumno, Long> {

    @Query("SELECT c FROM ClaseAlumno c WHERE c.clase.id=:claseId")
    List<ClaseAlumno> findByClaseId(final @Param("claseId") Long claseId);

    @Query("SELECT c FROM ClaseAlumno c WHERE c.clase.id=:claseId AND c.usuario.id=:usuarioId")
    ClaseAlumno findByClaseIdUsuarioId(final @Param("claseId") Long claseId, final @Param("usuarioId") Long usuarioId);

    @Query("SELECt c FROM ClaseAlumno c WHERE c.usuario.id=:usuarioId")
    ClaseAlumno findByUsuarioId(final @Param("usuarioId") Long usuarioId);

    @Query("SELECT c FROM ClaseAlumno c WHERE c.clase.id IN (:claseId) AND c.usuario.cuil=:cuil AND c.asistencia = 0")
    List<ClaseAlumno> findByCuilAndClase(final @Param("claseId") List<Long> claseId, final @Param("cuil") String cuil);

    @Modifying
    @Query("UPDATE ClaseAlumno c SET c.estado = 0 WHERE c.clase.id = :claseId AND c.usuario.id=:usuarioId")
    void softDeleteByClaseId(@Param("claseId") Long claseId, @Param("usuarioId") Long usuarioId);

    @Query("SELECT c FROM ClaseAlumno c WHERE c.clase.id=:claseId AND c.usuario.id=:usuarioId")
    ClaseAlumno findByClaseIdUsiarioId(Long claseId, Long usuarioId);

}
