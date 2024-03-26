package com.asi.inscripciones.mvp.apiext;

import com.asi.inscripciones.mvp.dto.UsuarioAdDTO;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.UnirestException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class ActiveDirectoryService {

    @Value("${custom.servicio-autentificacion-AD.url}")
    private String urlServicioAutentificacionAD;

    @Value("${custom.servicio-autentificacion-AD.client-id}")
    private String clientIDServicioAutentificacionAD;

    @Value("${custom.servicio-autentificacion-AD.client-secret}")
    private String clientSecretServicioAutentificacionAD;
    



    public UsuarioAdDTO getUserAd(String cuil){
        String baseUrl = urlServicioAutentificacionAD + "/cuentas/" + cuil.replace("-", "");

        try {
            HttpResponse<JsonNode> response = Unirest.get(baseUrl)
                    .header("client_id", clientIDServicioAutentificacionAD)
                    .header("client_secret", clientSecretServicioAutentificacionAD)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Cache-Control", "no-cache")
                    .asJson();

            if( response.getStatus() != HttpStatus.OK.value())
                throw new GenericException(CodigoError.E003.getCodigo(),CodigoError.E003.getMensaje());

            UsuarioAdDTO usuarioAdDto;

            try {
                usuarioAdDto = new ObjectMapper().readValue(response.getBody().getObject().toString(), UsuarioAdDTO.class);
            } catch (JsonProcessingException e) {
                log.info("AD: Error al obtener información del usuario. "+e.getStackTrace());
                throw new GenericException(CodigoError.E004.getCodigo(),CodigoError.E004.getMensaje());
            }
            return usuarioAdDto;

        } catch (UnirestException e) {
            log.info("AD: No se tiene respuesta del servicio de autenticación. "+e.getStackTrace());
            throw new GenericException(CodigoError.E005.getCodigo(),CodigoError.E005.getMensaje());
        }

    }



    public Boolean authenticate(String cuil, String password) {
        Boolean validation = false;
        
        log.info("Autentificando contra: " + urlServicioAutentificacionAD);
        String baseUrl = urlServicioAutentificacionAD + "/cuentas/" + cuil + "/validar";

        try {
            HttpResponse <JsonNode> response = Unirest.post(baseUrl)
                    .header("client_id", clientIDServicioAutentificacionAD)
                    .header("client_secret", clientSecretServicioAutentificacionAD)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Cache-Control", "no-cache")
                    .field("password", password)
                    .asJson();

            if (response.getStatus() == HttpStatus.OK.value()){
                validation = true;
            }
        } catch (UnirestException e) {
            log.info("AD: No se tiene respuesta del servicio de autenticación. " + e.getStackTrace());
            throw new GenericException(CodigoError.E005.getCodigo(),CodigoError.E005.getMensaje());
        
        }

        return validation;
        
    }
    
}
