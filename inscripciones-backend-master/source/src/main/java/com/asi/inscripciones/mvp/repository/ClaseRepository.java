package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.dto.ClaseDTO;
import com.asi.inscripciones.mvp.dto.ClaseDTOMapper;
import com.asi.inscripciones.mvp.entity.Clase;
import com.asi.inscripciones.mvp.entity.InstanciaSede;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ClaseRepository extends JpaRepository <Clase, Long> {

    @Query("SELECT c FROM Clase c WHERE c.instanciaSede.id=:instanciaSedeId")
    List<Clase> findByInstanciaSedeId(@Param("instanciaSedeId") final Long instanciaSedeId);

    @Query("SELECT c FROM Clase c WHERE c.instanciaSede.id=:instanciaSedeId AND c.instanciaSede.sede.id=:sedeId")
    List<Clase> findByInstanciaSedeAndSede(@Param("instanciaSedeId") final Long instanciaSedeId, @Param("sedeId") final Long sedeId);

    @Query("SELECT c FROM Clase c WHERE c.instanciaSede.instancia.id=:instanciaId AND c.instanciaSede.sede.id=:sedeId")
    List<Clase> findByInstanciaAndSede(@Param("instanciaId") final Long instanciaId, @Param("sedeId") final Long sedeId);

    @Query("SELECT c FROM Clase c WHERE c.instanciaSede.instancia.id=:instanciaId")
    List<Clase> findByInstanciaId(@Param("instanciaId") final Long instanciaId);

    @Query("SELECT c.instanciaSede.instancia.nombre FROM Clase c WHERE c.id=:claseId")
    String findInstanciaNameByClaseID(@Param("claseId") final Long claseId);

    @Query("SELECT c.instanciaSede.instancia.inscripcion.nombre FROM Clase c WHERE c.id=:claseId")
    String findInscripcionNameByClaseID(@Param("claseId") final Long claseId);

    @Query("SELECT c FROM Clase c WHERE c.instanciaSede.id=:instanciaSedeId AND c.fecha =:date")
    List<Clase> findByInstanciaSedeIdAndDate(@Param("instanciaSedeId") final Long instanciaSedeId, @Param("date") final LocalDate today);

    @Query(value = "SELECT " +
                "CLA.ID AS id, " +
                "CLA.NOMBRE AS nombre, " +
                "CLA.FECHA AS fecha, " +
                "CLA.HORA_INICIO AS horaInicio, " +
                "CLA.HORA_FIN AS horaFin, " +
                "CLA.ESTADO AS estado, " +
                "INS_SED.ID AS instanciaSedeId, " +
                "SED.NOMBRE AS sede " +
                "FROM CLASE CLA " +
                "INNER JOIN CLASE_PROFESOR CLA_PRO ON CLA.ID = CLA_PRO.CLASE_ID " +
                "INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID " +
                "INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID " +
                "WHERE INS_SED.ID = :instanciaSedeId", nativeQuery = true)
    List<ClaseDTOMapper> findClaseByInstanciaSedeId(@Param("instanciaSedeId") Long instanciaSedeId);
    
    @Query(value = "SELECT " +
            "CLA.ID AS id, " +
            "CLA.NOMBRE AS nombre, " +
            "CLA.FECHA AS fecha, " +
            "CLA.HORA_INICIO AS horaInicio, " +
            "CLA.HORA_FIN AS horaFin, " +
            "CLA.ESTADO AS estado, " +
            "INS_SED.ID AS instanciaSedeId, " +
            "SED.NOMBRE AS sede " +
            "FROM CLASE CLA " +
            "INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID " +
            "INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID " +
            "WHERE INS_SED.ID = :instanciaSedeId", nativeQuery = true)
List<ClaseDTOMapper> findClaseByInstanciaSedeIdInscription(@Param("instanciaSedeId") Long instanciaSedeId);


    }
