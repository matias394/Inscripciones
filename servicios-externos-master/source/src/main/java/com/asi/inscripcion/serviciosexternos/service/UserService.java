package com.asi.inscripcion.serviciosexternos.service;


import com.asi.inscripcion.entity.Usuario;
import com.asi.inscripcion.serviciosexternos.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
import org.jboss.logging.Logger;

import java.util.Optional;

@ApplicationScoped
public class UserService {

    protected final Logger logger = Logger.getLogger(getClass());


    @Inject
    UserRepository userRepository;


    public boolean valid(final String cuil, final String password){

        logger.info("==== VALID USER ====");
        logger.info("cuil="+cuil);

        Optional<Usuario>  entity = userRepository.validByCuildAndPassword(cuil,password);
        return entity.isPresent();
    }

    public Usuario findByCuil(final String cuil){

        logger.info("==== VALID USER ====");
        logger.info("cuil="+cuil);

        Optional<Usuario>  entity = userRepository.findByCuil(cuil);
        return entity.orElseThrow(NotFoundException::new);
    }


}
