package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PermisoRolRepository extends JpaRepository<RolPermiso, Long> {

    @Query(value = "FROM RolPermiso u WHERE u.permiso.id =:id")
    List<RolPermiso> findByIdPermiso(@Param("id") Long id);
    
}
