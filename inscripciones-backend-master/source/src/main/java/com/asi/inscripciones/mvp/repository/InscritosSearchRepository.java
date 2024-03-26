package com.asi.inscripciones.mvp.repository;


import com.asi.inscripciones.mvp.entity.InscritosSearch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscritosSearchRepository extends ElasticsearchRepository<InscritosSearch, String> {
    List<InscritosSearch> findByNombre(String name);
    
    List<InscritosSearch> findByNombreContains (String name);

    List<InscritosSearch> findByCuilAndInscripcionId(String cuil, Long inscripcionId);

    List<InscritosSearch> findByInscripcionId(Long inscripcionId);
}
