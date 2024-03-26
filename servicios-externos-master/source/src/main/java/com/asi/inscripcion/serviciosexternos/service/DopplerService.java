package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.dto.DopplerDTO;
import com.asi.inscripcion.entity.Correo;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class DopplerService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    @ConfigProperty(name = "doppler.api.key")
    String apiKey;

    @Inject
    @ConfigProperty(name = "doppler.api.email")
    String apiEmail;

    @Inject
    @ConfigProperty(name = "doppler.api.id")
    String apiId;

    @Inject
    @ConfigProperty(name = "doppler.api.url")
    String dopplerUrl;

    @Inject
    @ConfigProperty(name = "custom.doppler-cancelacion-url")
    String urlCancelacion;

    @Inject
    @ConfigProperty(name = "doppler.api.endpoint")
    String endpoint;

    @Blocking
    public Uni<String> sendDoppler(DopplerDTO doppler, Correo correo, String DirecccionSede){
        String response = "";
        String apiService = dopplerUrl+apiId+endpoint;
        String cancelUrl = urlCancelacion+doppler.getInscripcionMongoId();

        try {
        String template = correo.getHtml().replaceAll("_QrImageBase64_", doppler.getRutaQr())
                .replaceAll("_Curso_", doppler.getCurso())
//                .replaceAll("_Instancia_", doppler.getInstancia())
                .replaceAll("_Nombre_", doppler.getNombre())
                .replaceAll("_Organismo_", doppler.getOrganismo())
                .replaceAll("_Sede_", doppler.getSede())
                .replaceAll("_SedeDireccion_", DirecccionSede)
//                .replaceAll("_InscripcionId_", doppler.getIdInscripcion())
                .replaceAll("_Dia_", doppler.getDia())
                .replaceAll("_Hora_", doppler.getHorario())
                .replaceAll("_NombreSolicitante_", doppler.getNombre()+" "+doppler.getApellido())
                .replaceAll("_UrlCancelarInscripcion_", cancelUrl);

        JSONObject jObject2 = new JSONObject();
        jObject2.put("type", "to");
        jObject2.put("email", doppler.getEmail());
        jObject2.put("name", doppler.getNombre()+" "+doppler.getApellido());
        List<JSONObject> jObjectList = new ArrayList<>();
        jObjectList.add(jObject2);

        JSONObject jObject = new JSONObject();
        jObject.put("from_name", "Sistema de Inscripciones");
        jObject.put("from_email", apiEmail);
        jObject.put("recipients", jObjectList);
        jObject.put("subject", "¡Tu inscripción ha sido exitosa!");
        jObject.put("html", template);


            String body = jObject.toString();

            logger.info("RUTA: " +apiService);
            logger.info("PETICIÓN: " +body);

            HttpResponse<JsonNode> request = Unirest.post(apiService)
                    .header("Content-Type", "application/json")
                    .header("Authorization", "token "+apiKey)
                    .body(body)
                    .asJson();
                    
            response = request.getBody().getObject().toString();

            logger.info("REPONSE: " +response);

        } catch (Exception ex) {
            ex.printStackTrace();
            response = "Error: " + ex.getMessage();
        }
        return Uni.createFrom().item(response);
    }
}
