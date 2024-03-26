package com.asi.inscripciones.mvp.repository;


import com.asi.inscripciones.mvp.entity.ClaseProfesor;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.Sede;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InscripcionRepository extends PagingAndSortingRepository<Inscripcion, Long> {


    @Query("SELECT i FROM Inscripcion i WHERE i.id IN (:idList)")
    List<Inscripcion> findById(final @Param("idList") List<Long> idList, Pageable pageable);

    @Query("SELECT i FROM Inscripcion i WHERE i.id IN (:idList)")
    List<Inscripcion> findByIdWithOutPage(final @Param("idList") List<Long> idList);

    @Query("SELECT i FROM Inscripcion i WHERE i.id = :id")
    Inscripcion getInscripcionById(final @Param("id") Long inscripcionId);

    @Query("SELECT r FROM Inscripcion r WHERE UPPER(r.nombre) = UPPER(?1)")
    Inscripcion findByName(String name);

    @Query("SELECT r FROM Inscripcion r WHERE UPPER(r.nombre) LIKE UPPER(CONCAT('%', ?1, '%'))")
    List<Inscripcion> findByNameLike(String name);

    @Query(value = "SELECT r FROM Inscripcion r WHERE r.estado=:estado")
    List<Inscripcion> getStateAll( final @Param("estado") Integer estado);
    
    List<Inscripcion> findByEstadoLike(Integer estado, Pageable pageable);
    
    @Query(value = "SELECT r FROM Inscripcion r WHERE r.organismoCategoria.organismo.id =:id AND r.estado=:estado ORDER BY r.creado DESC")
    List<Inscripcion> findByIdOrganismoCategoria(@Param("id") Long id, @Param("estado") Integer estado);

//     @Query(value = "SELECT r FROM Inscripcion r WHERE r.organismoCategoria.organismo.id =:organismoId AND r.tipo.id=:tipoId AND r.estado=:estado ORDER BY r.creado DESC")
//     List<Inscripcion> findByIdOrganismoAndTipo(final @Param("organismoId") Long organismoId,
//                                                final @Param("tipoId") Long tipoId,
//                                                final @Param("estado") Integer estado);


    @Query(value = """
    SELECT
    cp.clase.instanciaSede.instancia.inscripcion.id
    FROM ClaseProfesor cp
    WHERE cp.usuario.id =:usuarioProfesorId
    """)
    List<Long> findByUsuarioProfesor(final @Param("usuarioProfesorId") Long usuarioProfesorId);

    @Query(value = """
        SELECT
        cp.clase.instanciaSede.instancia.inscripcion.id
        FROM ClaseProfesor cp
        WHERE cp.usuario.id =:usuarioProfesorId
        AND UPPER(cp.clase.instanciaSede.instancia.inscripcion.nombre) LIKE UPPER(:filter)
        OR UPPER(cp.clase.instanciaSede.instancia.inscripcion.organismoCategoria.categoria.nombre) LIKE UPPER(:filter)
        """)
    List<Long> findByUsuarioProfesorWithFilter(
        @Param("usuarioProfesorId") Long usuarioProfesorId,
        @Param("filter") String filter);


    @Query(value = "SELECT r FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id =:organismoId " +
            " AND r.tipo.id=:tipoId " +
            " AND r.organismoCategoria.categoria.id IN (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId) " +
            " AND r.estado=:estado")
    List<Inscripcion> findByIdOrganismoAndTipo(final @Param("organismoId") Long organismoId,
                                               final @Param("tipoId") Long tipoId,
                                               final @Param("usuarioId") Long usuarioId,
                                               @Param("estado") Integer estado,
                                               Pageable pageable);

    @Query(value = "SELECT COUNT(r) FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id =:organismoId " +
            " AND r.tipo.id=:tipoId " +
            " AND r.organismoCategoria.categoria.id IN (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId) " +
            " AND r.estado=:estado " +
            " ORDER BY r.creado DESC")
    long findByIdOrganismoAndTipoCount(final @Param("organismoId") Long organismoId,
                                               final @Param("tipoId") Long tipoId,
                                               final @Param("usuarioId") Long usuarioId,
                                               @Param("estado") Integer estado);

    @Query(value = "SELECT r FROM Inscripcion r WHERE r.organismoCategoria.organismo.id =:id AND r.estado=:estado")
    List<Inscripcion> findByIdOrganismoCategoriaAll(final @Param("id") Long id,
                                                    final @Param("estado") Integer estado,
                                                    Pageable pageable);
    @Query(value = "SELECT COUNT(r) FROM Inscripcion r WHERE r.organismoCategoria.organismo.id =:id AND r.estado=:estado")
    long findByIdOrganismoCategoriaAllCount(final @Param("id") Long id,
                                            final @Param("estado") Integer estado);


    @Query(value = "SELECT r FROM Inscripcion r WHERE r.organismoCategoria.organismo.id =:organismoId AND r.tipo.id=:tipoId AND r.estado=:estado")
    List<Inscripcion> findByOrganisoAndTipo(final @Param("organismoId") Long organismoId,
                                            final @Param("tipoId") Long tipoId,
                                            final @Param("estado") Integer estado);


    @Query(value = "SELECT r FROM Inscripcion r WHERE r.tipo.id=:id AND r.estado=:estado")
    List<Inscripcion> findInscripcionsByTipo(final @Param("id") Long id,
                                             final @Param("estado") Integer estado,
                                             Pageable pageable);
    @Query(value = "SELECT COUNT(r) FROM Inscripcion r WHERE r.tipo.id=:id AND r.estado=:estado")
    long findInscripcionsByTipoCount(final @Param("id") Long id,
                                     final @Param("estado") Integer estado);


    @Query(value = "SELECT r FROM Inscripcion r WHERE r.tipo.id=:idTipo AND r.organismoCategoria.organismo.id=:idOrganismo AND r.estado=:estado")
    List<Inscripcion> findInscripcionByTipoAndOrganismoAll(final @Param("idTipo")Long idTipo,
                                                           final @Param("idOrganismo") Long idOrganismo,
                                                           final @Param("estado")Integer estado,
                                                           Pageable pageable);

    @Query(value = "SELECT i.instancia.inscripcion FROM InstanciaSede i WHERE i.sede.id=:sede AND i.instancia.inscripcion.estado=:estado")
    List<Inscripcion> getBySede(final @Param("sede") Long sede, final @Param("estado") Integer estado);

    @Query(value = "SELECT DISTINCT i.instancia.inscripcion FROM InstanciaSede i WHERE i.sede.id=:sedeId AND i.instancia.inscripcion.tipo.id=:tipoId")
    List<Inscripcion> getBySedeAndTipo(final @Param("sedeId") Long sedeId,
                                       final @Param("tipoId") Long tipoId,
                                       Pageable pageable);

    @Query(value = "SELECT COUNT(DISTINCT i.instancia.inscripcion) FROM InstanciaSede i WHERE i.sede.id=:sedeId AND i.instancia.inscripcion.tipo.id=:tipoId")
    long getBySedeAndTipoCount(final @Param("sedeId") Long sedeId,
                               final @Param("tipoId") Long tipoId);

    @Query(value = "SELECT i.instancia.inscripcion FROM InstanciaSede i " +
            " WHERE i.sede.id=:sedeId " +
            " AND i.instancia.inscripcion.tipo.id=:tipoId " +
            " AND i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId " +
            " AND i.estado=:estado")
    List<Inscripcion> getBySedeAndTipoAndOrganismo(final @Param("sedeId") Long sedeId,
                                                   final @Param("tipoId") Long tipoId,
                                                   final @Param("organismoId") Long organismoId,
                                                   final @Param("estado") Integer estado);


    @Query(value = """
            SELECT i.instancia.inscripcion 
            FROM InstanciaSede i
            WHERE i.sede.id=:sedeId
            AND i.instancia.inscripcion.tipo.id=:tipoId
            AND i.instancia.inscripcion.organismoCategoria.organismo.id=:organismoId
            AND i.instancia.inscripcion.organismoCategoria.categoria.id 
                IN (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId)
            AND i.estado=:estado
            """)
    List<Inscripcion> getBySedeAndTipoAndOrganismoAndUsuario(final @Param("sedeId") Long sedeId,
                                                            final @Param("tipoId") Long tipoId,
                                                            final @Param("organismoId") Long organismoId,
                                                            final @Param("usuarioId") Long usuarioId,
                                                            final @Param("estado") Integer estado);

        long countByEstado(Integer estado);

        @Query("""
                SELECT
                i
                FROM Inscripcion i 
                WHERE i.estado =:estado 
                AND 
                (UPPER(i.nombre) LIKE CONCAT('%',UPPER(:filter),'%') 
                OR UPPER(i.organismoCategoria.categoria.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.organismoCategoria.organismo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.tipo.nombre) LIKE CONCAT('%',UPPER(:filter),'%'))
        """)
        List<Inscripcion> findByEstadoAndNombreLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);
        
        @Query("""
                SELECT COUNT(i) FROM Inscripcion i
                WHERE i.estado = :estado
                AND 
                (UPPER(i.nombre) LIKE CONCAT('%',UPPER(:filter),'%') 
                OR UPPER(i.organismoCategoria.categoria.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.organismoCategoria.organismo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.tipo.nombre) LIKE CONCAT('%',UPPER(:filter),'%'))
        """)
        long countByEstadoAndNombreLike(@Param("estado") Integer estado, @Param("filter") String filter);


        @Query(value = "SELECT r FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id =:organismoId " +
            " AND r.tipo.id=:tipoId " +
            " AND r.organismoCategoria.categoria.id IN (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId) " +
            " AND r.estado=:estado " +
            " AND (UPPER(r.nombre) LIKE UPPER(:filter) " +
            " OR UPPER(r.organismoCategoria.categoria.nombre) LIKE UPPER(:filter))" +
            " ORDER BY r.creado DESC")
        List<Inscripcion> findByOrganismoTipoUsuarioAndNombreFilter(
                @Param("organismoId") Long organismoId,
                @Param("tipoId") Long tipoId,
                @Param("usuarioId") Long usuarioId,
                @Param("estado") Integer estado,
                @Param("filter") String filter,
                Pageable pageable);

        @Query(value = "SELECT COUNT(r) FROM Inscripcion r " +
                " WHERE r.organismoCategoria.organismo.id =:organismoId " +
                " AND r.tipo.id=:tipoId " +
                " AND r.organismoCategoria.categoria.id IN (SELECT u.organismoCategoria.categoria.id FROM UsuarioOrganismoCategoria u WHERE u.usuario.id=:usuarioId) " +
                " AND r.estado=:estado " +
                " AND UPPER(r.nombre) LIKE UPPER(:filter) " +
                " OR UPPER(r.organismoCategoria.categoria.nombre) LIKE UPPER(:filter)" +
                " ORDER BY r.creado DESC")
        long countByOrganismoTipoUsuarioAndNombreFilter(
                @Param("organismoId") Long organismoId,
                @Param("tipoId") Long tipoId,
                @Param("usuarioId") Long usuarioId,
                @Param("estado") Integer estado,
                @Param("filter") String filter);

    @Query(value = "SELECT r FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id =:organismoId " +
            " AND r.organismoCategoria.categoria.id =:categoriaId" +
            " AND r.estado=:estado " +
            " ORDER BY r.creado DESC")
    List<Inscripcion> findByOrganismoAndCategoriaFilter(
            @Param("organismoId") Long organismoId,
            @Param("categoriaId") Long categoriaId,
            @Param("estado") Integer estado);

    @Query(value = "SELECT r FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id =:organismoId " +
            " AND r.organismoCategoria.categoria.id =:categoriaId" +
            " AND r.estado=:estado " +
            " ORDER BY r.creado DESC")
    List<Inscripcion> findByOrganismoAndCategoriaFilterPage(
            @Param("organismoId") Long organismoId,
            @Param("categoriaId") Long categoriaId,
            @Param("estado") Integer estado,
            Pageable pageable);


    @Query(value = "SELECT r FROM Inscripcion r " +
            " WHERE r.organismoCategoria.organismo.id = :organismoId " +
            " AND r.organismoCategoria.categoria.id = :categoriaId" +
            " AND r.estado = :estado " +
            "AND UPPER(r.nombre) LIKE CONCAT('%', UPPER(:filter), '%') " +
            " ORDER BY r.creado DESC")
    List<Inscripcion> findByOrganismoAndCategoriaFilterByName(
            @Param("organismoId") Long organismoId,
            @Param("categoriaId") Long categoriaId,
            @Param("estado") Integer estado,
            @Param("filter") String filter,
            Pageable pageable);

        @Query(value = "SELECT DISTINCT INS.INSCRIPCION_ID "
                +"FROM CLASE_PROFESOR CLA_PRO "
                +"INNER JOIN CLASE CLA ON CLA_PRO.CLASE_ID = CLA.ID "
                +"INNER JOIN INSTANCIA_SEDE INS_SED ON INS_SED.ID = CLA.INSTANCIA_SEDE_ID "
                +"INNER JOIN INSTANCIA INS ON INS_SED.INSTANCIA_ID = INS.ID "
                +"INNER JOIN SEDE SED ON SED.ID = INS_SED.SEDE_ID "
                +"WHERE "
                +"CLA_PRO.USUARIO_ID=:usuarioId "
                +"AND SED.ID =:sedeId", nativeQuery = true)
        List<Long> findLongListForInscription(
                @Param("usuarioId") Long usuarioId,
                @Param("sedeId") Long sedeId);

        @Query("""
                SELECT COUNT(i) FROM Inscripcion i
                WHERE i.estado = :estado
                AND 
                (UPPER(i.nombre) LIKE CONCAT('%',UPPER(:filter),'%') 
                OR UPPER(i.organismoCategoria.categoria.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.organismoCategoria.organismo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
                OR UPPER(i.tipo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')) 
                AND i.organismoCategoria.categoria.id = :categoria 
                AND i.organismoCategoria.organismo.id = :organismo
        """)
        long countByEstadoAndNombreLike(@Param("estado") Integer estado, @Param("filter") String filter,
                                                @Param("categoria") Long categoria,@Param("organismo") Long organismo);

        @Query("""
                SELECT COUNT(i) FROM Inscripcion i
                WHERE i.estado = :estado
                AND i.organismoCategoria.categoria.id = :categoria 
                AND i.organismoCategoria.organismo.id = :organismo
        """)
        long countByEstadoAndCategoriaAndOrganismo(@Param("estado") Integer estado, @Param("categoria") Long categoria,@Param("organismo") Long organismo);
}
