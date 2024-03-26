package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RolPermisoRepository extends JpaRepository<RolPermiso, Long>{

    @Query(value = "From RolPermiso p WHERE p.permiso.id =:id")
    List<RolPermiso> findByIdPermisos(@Param("id") Long id);

    @Query(value = "From RolPermiso p WHERE p.rol.id =:id")
    List<RolPermiso> findByIdRol(@Param("id") Long id);

    @Modifying
    @Query(value = "DELETE FROM RolPermiso p WHERE p.rol.id =:rolId AND p.permiso.id=:permisoId")
    void deleteByIdRolAndIdPermiso(@Param("rolId") Long rolId, @Param("permisoId") Long permisoId);
    
}
