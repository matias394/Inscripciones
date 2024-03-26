package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface OrganismoCategoriaRepository extends JpaRepository<OrganismoCategoria,Long> {

    @Query("SELECT u FROM OrganismoCategoria u WHERE u.organismo.id=:organismoId AND u.categoria.id=:categoriaId AND u.estado=1")
    public OrganismoCategoria findByIdOrganismoAndIdCategoria(@Param("organismoId") Long organismoId, @Param("categoriaId") Long categoriaId);


    @Query("SELECT u FROM OrganismoCategoria u WHERE u.organismo.id=:organismoId AND u.estado=1")
    public List<OrganismoCategoria> findByIdOrganismo(@Param("organismoId") Long organismoId);

    @Query("SELECT u FROM OrganismoCategoria u WHERE u.categoria.id=:categoriaId AND u.estado=1")
    public OrganismoCategoria findByIdCategoria(@Param("categoriaId") Long categoriaId);

}
