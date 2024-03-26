package com.asi.inscripciones.mvp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.asi.inscripciones.mvp.entity.RepositorioArchivo;

public interface RepositorioArchivoRepository extends JpaRepository<RepositorioArchivo, Integer> {
    
    RepositorioArchivo findById(Long id);

    @Query("SELECT r FROM RepositorioArchivo r WHERE r.cuil = :cuil AND r.instancia_sede_id = :instancia AND r.inscripcion_id = :inscripcion")
    RepositorioArchivo findRepositorioArchivoFile(@Param("cuil") String cuil,
                                                  @Param("inscripcion") Long inscripcion,
                                                  @Param("instancia") Long instancia);
    
}
