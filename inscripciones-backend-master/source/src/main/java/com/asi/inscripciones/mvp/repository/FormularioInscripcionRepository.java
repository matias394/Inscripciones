package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.FormularioInscripcion;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FormularioInscripcionRepository extends PagingAndSortingRepository<FormularioInscripcion, Long>{
    
    @Query(value = " SELECT f From FormularioInscripcion f WHERE f.id =:id")
    List<FormularioInscripcion> findByIdFormularioInscripcion(@Param("id") Long id);

    @Query(value = " SELECT f From FormularioInscripcion f WHERE f.inscripcion.id =:id AND f.estado=1")
    List<FormularioInscripcion> findByIdInscripcionList(@Param("id") Long id);

    @Query(value = " SELECT f From FormularioInscripcion f WHERE f.inscripcion.id =:inscripcionId AND f.estado=1")
    FormularioInscripcion findByIdInscripcion(@Param("inscripcionId") Long inscripcionId);

}
