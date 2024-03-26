package com.asi.inscripcion.serviciosexternos.service;


import com.asi.inscripcion.dto.UsuarioDTO;
import jakarta.enterprise.context.ApplicationScoped;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.ws.rs.core.MediaType;


@ApplicationScoped
public class MibaService {


    protected final Logger logger = Logger.getLogger(getClass());


    @ConfigProperty(name ="miba.grant_type")
    private String grantType;

    @ConfigProperty(name ="miba.redirect_uri_token")
    private String redirectUriToken;

    @ConfigProperty(name ="miba.redirect_uri_logout")
    private String redirectUriLogout;

    @ConfigProperty(name ="miba.client_id")
    private String clientId;

    @ConfigProperty(name ="miba.client_secret")
    private String clientSecret;

    @ConfigProperty(name ="miba.getToken.urlToken")
    private String urlToken;

    @ConfigProperty(name ="miba.getToken.urlLogout")
    private String urlLogout;

    @ConfigProperty(name ="miba.urlUserInfo")
    private String urlUserInfo;


    public String getToken(String code){

        String body = "";

        body = body.concat("grant_type=").concat(grantType)
                .concat("&code=").concat(code)
                .concat("&redirect_uri=").concat(redirectUriToken)
                .concat("&client_id=").concat(clientId)
                .concat("&client_secret=").concat(clientSecret);

        HttpResponse<JsonNode> request = Unirest.post(urlToken)
                .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED)
                .header("Cache-Control", "no-cache")
                .body(body)
                .asJson();

        return request.getBody().getObject().toString();
    }


    public String getLogout(String token){

        String response = "";
        String body = "";

        body = body
                .concat("&refresh_token=").concat(token)
                .concat("&client_id=").concat(clientId)
                .concat("&client_secret=").concat(clientSecret);

        HttpResponse<JsonNode> request = Unirest.post(urlLogout)
                .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED)
                .header("Accept","*/*")
                .header("Cache-Control", "no-cache").asJson();
        return response;
    }


    public JSONObject getUrlUserInfo(String token){

        HttpResponse<JsonNode> request = Unirest.get(urlUserInfo)
                .header("Authorization", "Bearer "+token)
                .asJson();

        JSONObject data = request.getBody().getObject();

        logger.info(request.getBody().getObject().toString());

        return data;
    }


    public UsuarioDTO getDataUser(String token){

        JSONObject object = getUrlUserInfo(token);

        String cuil = object.get("document_number").toString();
        String name = object.get("first_name").toString();
        String lastName = object.get("last_name").toString();
        String phone = object.get("phones").toString();
        String email =  object.get("email").toString();
        String gender =  object.get("gender").toString();
        String document_nationality =  object.get("document_nationality").toString();
        String documentType =  object.get("document_type").toString();

        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setCuil(cuil);
        usuario.setNombre(name);
        usuario.setApellido(lastName);
        usuario.setTelefono(phone);
        usuario.setEmail(email);
        usuario.setGenero(gender);
        usuario.setNacionalidad(document_nationality);
        usuario.setDocumentType(documentType);

        return usuario;
    }
}
