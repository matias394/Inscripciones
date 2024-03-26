package com.asi.inscripcion.serviciosexternos.facade;


import com.asi.inscripcion.dto.UsuarioDTO;
import com.asi.inscripcion.serviciosexternos.service.MibaService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@ApplicationScoped
public class MibaFacade {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    MibaService mibaService;


    public String getToken(String code) {

        return mibaService.getToken(code);
    }

    public String getLogout(String token) {

        return mibaService.getLogout(token);
    }

    public UsuarioDTO getDataUser(String token) {

        return mibaService.getDataUser(token);
    }
}
