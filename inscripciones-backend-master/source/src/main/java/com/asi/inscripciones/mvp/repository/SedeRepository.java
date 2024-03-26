package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Sede;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface SedeRepository extends JpaRepository<Sede,Long> {
  
    @Query("SELECT s FROM Sede s WHERE UPPER(s.nombre) = UPPER(?1)")
    Optional<Sede> findByName(String nombre);

    @Query("SELECT s FROM Sede s WHERE s.id IN (:idList)")
    List<Sede> findById(final @Param("idList") List<Long> idList, Pageable pageable);

    @Query("SELECT s FROM Sede s WHERE s.id IN (:idList)")
    List<Sede> findByIdList(final @Param("idList") List<Long> idList);

    @Query(value = "SELECT s FROM Sede s WHERE s.estado=:estado")
    List<Sede> getStateAll( final @Param("estado") Integer estado);


    @Query(value = "SELECT s FROM Sede s WHERE s.estado=:estado")
    List<Sede> findAllPage( final @Param("estado") Integer estado, Pageable pageable);

    @Query(value = "SELECT i.sede FROM InstanciaSede i Where i.instancia.inscripcion.tipo=:idTipo")
    List<Sede> findSedesByTipo(final @Param("idTipo") Long idTipo);

    @Query(value = "SELECT i.sede FROM InstanciaSede i Where i.instancia.id=:instanciaId AND i.sede.estado=:estado")
    List<Sede> findSedesByInstanciaId(final @Param("instanciaId") Long instanciaId, final @Param("estado") Integer estado);

    @Query(value = "SELECT i.sede FROM InstanciaSede i Where i.instancia.id=:instanciaId")
    List<Sede> findAllSedesByInstanciaId(final @Param("instanciaId") Long instanciaId);

    @Query(value = "SELECT i.sede FROM InstanciaSede i Where i.instancia.id=:instanciaId AND i.sede.estado=:estado")
    List<Sede> findSedesVirtualByInstanciaId(final @Param("instanciaId") Long instanciaId, final @Param("estado") Integer estado);

    @Query(value = "SELECT i.sede FROM InstanciaSede i WHERE i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId " +
            " AND i.instancia.inscripcion.tipo.id=:tipoId")
    List<Sede> findByOrganismoidTipoid(final @Param("organismoId") Long organismoId,
                                       final @Param("tipoId") Long tipoId,
                                       Pageable pageable);
    @Query(value = "SELECT COUNT(i.sede) FROM InstanciaSede i WHERE i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId " +
            " AND i.instancia.inscripcion.tipo.id=:tipoId")
    long findByOrganismoidTipoidCount(final @Param("organismoId") Long organismoId,
                                       final @Param("tipoId") Long tipoId);



    @Query(value = """
            SELECT distinct cp.clase.instanciaSede.sede.id
            FROM ClaseProfesor cp
            WHERE cp.usuario.id=:usuarioId
            """)
    @QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false"))
    List<Long> getByUsuarioProfesor(final @Param("usuarioId") Long usuarioId);



    @Query(value = """
            SELECT distinct i.sede.id 
            FROM InstanciaSede i
            WHERE i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId
            AND i.instancia.inscripcion.tipo.id=:tipoId
            AND i.instancia.inscripcion.organismoCategoria.categoria.id IN
                (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId)
            AND i.estado = 1
            """)
    List<Long> getByOrganisoAndTipoAndUsuario(final @Param("organismoId") Long organismoId,
                                              final @Param("tipoId") Long tipoId,
                                              final @Param("usuarioId") Long usuarioId);


        long countByEstado(Integer estado);
        
        List<Sede> findByEstadoAndNombreLike(Integer estado, String nombreFilter, Pageable pageable);
        
        long countByEstadoAndNombreLike(Integer estado, String nombreFilter);

        @Query("FROM Sede s WHERE s.estado = :estado AND (CAST(s.id AS string) like :filter OR UPPER(s.nombre) LIKE UPPER(:filter) OR UPPER(s.direccion) LIKE UPPER(:filter) OR UPPER(s.piso) LIKE UPPER(:filter) OR UPPER(s.email) LIKE UPPER(:filter))")
        List<Sede> findByEstadoAndIdOrNombreOrDireccionOrPisoOrEmailLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);
        
        @Query("SELECT COUNT(s) FROM Sede s WHERE s.estado = :estado AND (CAST(s.id AS string) like :filter OR UPPER(s.nombre) LIKE UPPER(:filter) OR UPPER(s.direccion) LIKE UPPER(:filter) OR UPPER(s.piso) LIKE UPPER(:filter) OR UPPER(s.email) LIKE UPPER(:filter))")
        long countByEstadoAndIdOrNombreOrDireccionOrPisoOrEmailLike(@Param("estado") Integer estado, @Param("filter") String filter);

        @Query(value = """
                SELECT distinct i.sede.id 
                FROM InstanciaSede i
                WHERE i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId
                AND i.instancia.inscripcion.tipo.id=:tipoId
                AND UPPER(i.sede.nombre) LIKE UPPER(:filter)
                AND i.instancia.inscripcion.organismoCategoria.categoria.id IN
                (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId)
                AND i.estado = 1
        """)
        List<Long> getByOrganisoAndTipoAndUsuarioAndNombreLike(
        @Param("organismoId") Long organismoId,
        @Param("tipoId") Long tipoId,
        @Param("usuarioId") Long usuarioId,
        @Param("filter") String filter);

        @Query(value = """
                SELECT distinct cp.clase.instanciaSede.sede.id
                FROM ClaseProfesor cp
                WHERE cp.usuario.id=:usuarioId
                AND cp.clase.instanciaSede.sede.nombre LIKE :filter
        """)
        @QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_PASS_DISTINCT_THROUGH, value = "false"))
        List<Long> getByUsuarioProfesorAndNombreLike(
        @Param("usuarioId") Long usuarioId,
        @Param("filter") String filter);

        @Query(value = "SELECT ID FROM ( SELECT DISTINCT SED.ID AS ID "
                +"FROM CLASE_PROFESOR CLA_PRO "
                +"INNER JOIN CLASE CLA ON CLA_PRO.CLASE_ID = CLA.ID "
                +"INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID "
                +"INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID "
                +"WHERE CLA_PRO.USUARIO_ID=:usuarioId ORDER BY SED.ID ) A GROUP BY ID", nativeQuery = true)
        List<Long> findLongListForSede(
                @Param("usuarioId") Long usuarioId,
                Pageable pageable);
        
        @Query(value = "SELECT DISTINCT SED.ID "
                +"FROM CLASE_PROFESOR CLA_PRO "
                +"INNER JOIN CLASE CLA ON CLA_PRO.CLASE_ID = CLA.ID "
                +"INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID "
                +"INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID "
                +"WHERE CLA_PRO.USUARIO_ID=:usuarioId ", nativeQuery = true)
        List<Long> findLongListForSedeCount(
                @Param("usuarioId") Long usuarioId);
        
        @Query(value = "SELECT DISTINCT SED.ID "
                +"FROM CLASE_PROFESOR CLA_PRO "
                +"INNER JOIN CLASE CLA ON CLA_PRO.CLASE_ID = CLA.ID "
                +"INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID "
                +"INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID "
                +"WHERE "
                +"CLA_PRO.USUARIO_ID=:usuarioId AND "
                +"SED.NOMBRE LIKE :filter", nativeQuery = true)
        List<Long> findLongListForSedeWithFilter(
                @Param("usuarioId") Long usuarioId,
                @Param("filter") String filter);

}
