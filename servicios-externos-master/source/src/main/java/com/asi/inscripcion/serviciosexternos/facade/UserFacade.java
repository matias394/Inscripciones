package com.asi.inscripcion.serviciosexternos.facade;


import com.asi.inscripcion.dto.TokenDTO;
import com.asi.inscripcion.entity.Usuario;
import com.asi.inscripcion.jwt.TokenService;
import com.asi.inscripcion.serviciosexternos.service.UserService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class UserFacade {

    @Inject
    UserService userService;

    @Inject
    TokenService tokenService;


    public TokenDTO getTokenUser(final String cuil, final String password) {

        TokenDTO tokenDTO=null;

        if(userService.valid(cuil,password)){
            Usuario entity = userService.findByCuil(cuil);
            String token = tokenService.generateToken(entity);
            tokenDTO = new TokenDTO(token);
        } else {
            throw new NotFoundException();
        }

        return tokenDTO;
    }

}
