package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface UsuarioRepository extends PagingAndSortingRepository<Usuario, Long> {


    @Query(value = "FROM Usuario u WHERE u.creado BETWEEN :startDate AND :endDate")
    List<Usuario> findByCreatedOn(LocalDateTime startDate, LocalDateTime endDate);

    Page<Usuario> findAll(Pageable pageable);

    Page<Usuario> findByEstadoLike(Integer estado, Pageable pageable);

    @Query("FROM Usuario u WHERE u.estado = :estado AND u.rol.id > 0")
    Page<Usuario> findByEstadoAndRolAdminLike(@Param("estado") Integer estado, Pageable pageable);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByDni(String dni);


    Optional<Usuario> findByCuil(String cuil);

    List<Usuario> findByCuilAndEstado(String cuil, Integer estado);

    @Query(value = "FROM Usuario u WHERE u.cuil=:cuil AND u.estado=1")
    Usuario findByCuilActivo(String cuil);

    @Query(value = "FROM Usuario u WHERE u.cuil=:cuil AND u.password=:password AND u.estado=:estado AND u.rol.id>0")
    Optional<Usuario> findByCuilAndPassword(@Param("cuil")String cuil, @Param("password") String password,@Param("estado") Integer estado);

    Optional<Usuario> findByRol(Long rol);

    @Query(value = "SELECT u FROM Usuario u WHERE u.organismo.id=:organismo AND u.rol.id=3 AND u.estado=1")
    List<Usuario> findByOrganismo(@Param("organismo") Long organismo);


    @Query(value = "SELECT u FROM Usuario u WHERE u.organismo.id=:organismo AND u.organismo.id=:organismo AND u.rol.id=3 AND u.estado=1")
    List<Usuario> findByOrganismo(@Param("organismo") Long organismo, @Param("organismo") Long categoria);

    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.estado = :estado AND u.rol.id > 0")
    long countByEstadoAndRolAdmin(@Param("estado") Integer estado);

    @Query("""
        SELECT 
        u
        FROM Usuario u 
        WHERE u.estado =:estado 
        AND u.rol.id > 0
        AND UPPER(u.nombre) LIKE CONCAT('%',UPPER(:filter),'%') 
        OR UPPER(u.apellido) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.cuil) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.rol.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.organismo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
    """)
    Page<Usuario> findByEstadoAndNombreOrCuilOrApellidoLike(@Param("estado") Integer estado, @Param("filter") String filter, Pageable pageable);

    @Query("""
        SELECT COUNT(u) FROM Usuario u
        WHERE u.estado = :estado
        AND u.rol.id > 0
        AND UPPER(u.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.cuil) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.apellido) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.rol.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
        OR UPPER(u.organismo.nombre) LIKE CONCAT('%',UPPER(:filter),'%')
    """)
    long countByEstadoAndNombreOrCuilOrApellidoLike(@Param("estado") Integer estado, @Param("filter") String filter);

}
