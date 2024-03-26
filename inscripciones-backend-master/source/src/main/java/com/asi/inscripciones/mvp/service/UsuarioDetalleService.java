package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Usuario;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsuarioDetalleService implements UserDetailsService {

    @Autowired
    private final UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String cuil) throws UsernameNotFoundException {
       
        Usuario usuario = usuarioService.getUserByCuil(cuil);


        UserDetails userDetails = User.withUsername(usuario.getEmail())
            .password("gswe34rt65gtyhuihgh")
            .roles(usuario.getRol().getNombre())
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build();

        return userDetails;    
    }
    
}
