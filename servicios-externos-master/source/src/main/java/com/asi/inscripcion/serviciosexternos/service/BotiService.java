package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.dto.BotiDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.Invocation;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

@ApplicationScoped
public class BotiService {

    @Inject
    @ConfigProperty(name = "boti.token")
    private String botiToken;

    @Inject
    @ConfigProperty(name = "boti.intent")
    private String apiId;

    public Response botiIntent(BotiDTO botiDTO) {
        Jsonb jsonb = JsonbBuilder.create();
        try (Client client = ClientBuilder.newClient()) {
            Invocation.Builder requestBuilder = client.target(apiId)
                    .request(MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                    .header(HttpHeaders.ACCEPT, "")
                    .header("access-token", botiToken);

            Response response = requestBuilder.post(Entity.entity(jsonb.toJson(botiDTO),MediaType.APPLICATION_JSON));

            return response;
        }catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }
}
