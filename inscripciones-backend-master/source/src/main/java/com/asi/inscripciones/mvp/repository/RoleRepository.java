package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.Rol;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RoleRepository extends JpaRepository<Rol, Long> {

    @Query("SELECT r FROM Rol r WHERE UPPER(r.nombre) = UPPER(?1)")
    Optional<Rol> findByName(String name);

    @Query("SELECT r FROM Rol r WHERE r.estado=:estado")
    Page<Rol> findByEstado(@Param("estado") Integer estado, Pageable pageable);
    
    @Query("SELECT r FROM Rol r WHERE r.id=:roleId AND r.estado=1")
    public List<Rol> findByIdRole(@Param("roleId") Long roleId);

    @Query(value = "SELECT r FROM Rol r WHERE r.estado=:estado")
    List<Rol> getStateAll(final @Param("estado") Integer estado);
}
