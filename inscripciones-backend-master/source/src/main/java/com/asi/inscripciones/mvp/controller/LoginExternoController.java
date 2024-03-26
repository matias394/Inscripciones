package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.TokenDTO;
import com.asi.inscripciones.mvp.dto.UsuarioExternoValidacionDTO;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.entity.UsuarioExterno;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.UsuarioExternoMapper;
import com.asi.inscripciones.mvp.service.TokenService;
import com.asi.inscripciones.mvp.service.UsuarioExternoService;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.EXTERNO)
public class LoginExternoController {

    @Autowired
    private UsuarioExternoService usuarioExternoService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioExternoMapper usuarioExternoMapper;

    @PostMapping()
    public ResponseEntity<TokenDTO> loginExterno(@RequestParam("cuil") String cuil, @RequestParam("password") String password){
        HttpStatus status = null;
        String respuesta="";
        Map<String,Object> claims = new HashMap<>();
        UsuarioExterno superAdmin;
        UsuarioExternoValidacionDTO validationAD = new UsuarioExternoValidacionDTO();

        /* Super Admin */
        if(cuil.equals(Constante.CUIL_ADMIN)){
            superAdmin = usuarioExternoService.validUser(cuil,password);
            if(superAdmin.getCuil()!=null){
                claims.put("rol", superAdmin.getRol().getNombre());
                claims.put("id_rol", superAdmin.getRol().getId());
                Usuario usuario = usuarioExternoMapper.mapUsuarioExternotoUsuario(superAdmin);
                respuesta = tokenService.generateToken(usuario, claims);
                status = HttpStatus.OK;
            } else {
                status = HttpStatus.CONFLICT;
            }
        } else {
            /* Validación por AD */
            validationAD = usuarioExternoService.validUserBack(cuil,password);
            if(validationAD.getValidacion()){
                if(validationAD.getUsuario().getCuil() != null){
                    claims.put("rol", validationAD.getUsuario().getRol().getNombre());
                    claims.put("id_rol", validationAD.getUsuario().getRol().getId());
                    Usuario usuario = usuarioExternoMapper.mapUsuarioExternotoUsuario(validationAD.getUsuario());
                    respuesta = tokenService.generateToken(usuario, claims);
                    status = HttpStatus.OK;
                }else{
                   status = HttpStatus.CONFLICT;
                }
            }else{
                throw new GenericException(CodigoError.E038.getCodigo(),CodigoError.E038.getMensaje());
            }
        }

        return ResponseEntity.status(status).body(new TokenDTO(respuesta));
    }

    @PostMapping(Url.REFRESH)
    public ResponseEntity<TokenDTO> refreshToken(@RequestParam("token") String token) {

        String respuesta="";
        Map<String,Object> claims = new HashMap<>();

        tokenService.validate(token);

        String cuil = tokenService.getUserFromToken(token);

        UsuarioExterno usuarioExterno = usuarioExternoService.getUserByCuil(cuil);

        if(usuarioExterno.getCuil()!=null){

            claims.put("rol", usuarioExterno.getRol().getNombre());
            claims.put("id_rol", usuarioExterno.getRol().getId());
            Usuario usuario = usuarioExternoMapper.mapUsuarioExternotoUsuario(usuarioExterno);
            respuesta= tokenService.generateToken(usuario, claims);

        } else {
            throw new GenericException(CodigoError.E038.getCodigo(),CodigoError.E038.getMensaje());
        }


        return ResponseEntity.status(HttpStatus.OK).body(new TokenDTO(respuesta));
    }

    @PostMapping(Url.UNLOCK)
    public void unlockUser(@RequestParam("cuil") String cuil){
        usuarioExternoService.unlockUser(cuil);
    }

}
