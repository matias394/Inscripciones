package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.Organismo;
import com.asi.inscripciones.mvp.entity.OrganismoCategoria;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

    List<Categoria> findByEstadoLike(final Integer estado, final Pageable pageable);

    @Query("SELECT c FROM  Categoria c WHERE c.nivel=:nivel")
    List<Categoria> findByNivel(final @Param("nivel") String nivel);

    @Query("SELECT c FROM Categoria c WHERE c.id=:categoriaId AND c.estado=1")
    public Optional<Categoria> findByIdCategoria(@Param("categoriaId") Long categoriaId);

    @Query("SELECT c FROM  Categoria c WHERE c.padreId=:parent")
    List<Categoria> findByParent(final @Param("parent") String parent);

    @Query("SELECT c FROM Categoria c WHERE UPPER(c.nombre) = UPPER(?1)")
    Optional<Categoria> findByName(String nombre);

    long countByEstado(Integer estado);

    @Query("FROM Categoria c WHERE c.estado = :estado AND (CAST(c.id AS string) like :filter OR UPPER(c.nombre) LIKE UPPER(:filter))")
    List<Categoria> findByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Categoria c WHERE c.estado = :estado AND (CAST(c.id AS string) like :filter OR UPPER(c.nombre) LIKE UPPER(:filter))")
    long countByEstadoAndIdOrNombreLike(@Param("estado") Integer estado, @Param("filter") String filter);

    @Query("SELECT c FROM Categoria c JOIN OrganismoCategoria oc ON c.id = oc.categoria.id WHERE oc.organismo.id = :organismoId AND c.estado = :estado")
    List<Categoria> findByOrganismoIdAndEstado(@Param("organismoId") Long organismoId, @Param("estado") Integer estado, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Categoria c JOIN OrganismoCategoria oc ON c.id = oc.categoria.id WHERE oc.organismo.id = :organismoId AND c.estado = :estado")
    long countByOrganismoIdAndEstado(@Param("organismoId") Long organismoId, @Param("estado") Integer estado);

    @Query("SELECT c FROM Categoria c JOIN OrganismoCategoria oc ON c.id = oc.categoria.id WHERE oc.organismo.id = :organismoId AND c.estado = :estado AND (CAST(c.id AS string) LIKE :filter OR UPPER(c.nombre) LIKE UPPER(:filter))")
    List<Categoria> findByOrganismoIdAndEstadoAndIdOrNombreLike(@Param("organismoId") Long organismoId, @Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Categoria c JOIN OrganismoCategoria oc ON c.id = oc.categoria.id WHERE oc.organismo.id = :organismoId AND c.estado = :estado AND (CAST(c.id AS string) LIKE :filter OR UPPER(c.nombre) LIKE UPPER(:filter))")
    long countByOrganismoIdAndEstadoAndIdOrNombreLike(@Param("organismoId") Long organismoId, @Param("estado") Integer estado, @Param("filter") String filter);


}
