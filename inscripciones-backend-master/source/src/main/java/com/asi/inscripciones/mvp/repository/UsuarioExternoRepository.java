package com.asi.inscripciones.mvp.repository;
import com.asi.inscripciones.mvp.entity.UsuarioExterno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface UsuarioExternoRepository extends PagingAndSortingRepository<UsuarioExterno, Long> {


    @Query(value = "FROM UsuarioExterno u WHERE u.creado BETWEEN :startDate AND :endDate")
    List<UsuarioExterno> findByCreatedOn(LocalDateTime startDate, LocalDateTime endDate);

    Page<UsuarioExterno> findAll(Pageable pageable);

    Page<UsuarioExterno> findByEstadoLike(Integer estado, Pageable pageable);

    @Query("FROM UsuarioExterno u WHERE u.estado = :estado AND u.rol.id > 0")
    Page<UsuarioExterno> findByEstadoAndRolAdminLike(@Param("estado") Integer estado, Pageable pageable);

    Optional<UsuarioExterno> findByEmail(String email);

    Optional<UsuarioExterno> findByDni(String dni);


    Optional<UsuarioExterno> findByCuil(String cuil);

    @Query(value = "FROM UsuarioExterno u WHERE u.cuil=:cuil AND u.password=:password AND u.estado=:estado AND u.rol.id>0")
    Optional<UsuarioExterno> findByCuilAndPassword(@Param("cuil")String cuil, @Param("password") String password,@Param("estado") Integer estado);

    Optional<UsuarioExterno> findByRol(Long rol);

    @Query(value = "SELECT u FROM UsuarioExterno u WHERE u.organismo.id=:organismo AND u.rol.id=3 AND u.estado=1")
    List<UsuarioExterno> findByOrganismo(@Param("organismo") Long organismo);


    @Query(value = "SELECT u FROM UsuarioExterno u WHERE u.organismo.id=:organismo AND u.organismo.id=:organismo AND u.rol.id=3 AND u.estado=1")
    List<UsuarioExterno> findByOrganismo(@Param("organismo") Long organismo, @Param("organismo") Long categoria);

}
