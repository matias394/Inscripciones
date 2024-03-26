package com.asi.inscripciones.mvp.security;

import com.asi.inscripciones.mvp.entity.Rol;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.stream.Collectors;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {
    
    @Override
    public boolean hasPermission(Authentication auth, Object targetDomainObject, Object permission) {

        if ((auth == null) || (targetDomainObject == null) || !(permission instanceof String)){
            return false;
        }

        String targetType = targetDomainObject.getClass().getSimpleName().toUpperCase();

        return hasPrivilege(auth, targetType, permission.toString().toUpperCase());
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if ((authentication == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }
        return hasPrivilege( authentication, targetType.toUpperCase(), permission.toString().toUpperCase() );
    }

    /**
     * El sistema maneja el acceso por permisos
     *  => Evaluamos si el usuario tiene permiso conforme el dominio del sistema
     * @param auth
     * @param targetType
     * @param permission
     * @return
     */
    private boolean hasPrivilege(Authentication auth, String targetType, String permission)  {
        if( auth.getAuthorities().size() ==0 )
            return false;

        return auth.getAuthorities().stream()
                .map(   grantedAuthority ->
                        containsPermiso(grantedAuthority,permission)).collect(Collectors.toList())
                .contains(true);
    }

    private boolean containsPermiso(GrantedAuthority grantedAuth, String permission) {
        Rol rol = (Rol) grantedAuth;
        return rol.getPermisos().stream()
                .map(unPermiso->unPermiso.getNombre().contains(permission)).toList()
                .contains(true);
    }
}
