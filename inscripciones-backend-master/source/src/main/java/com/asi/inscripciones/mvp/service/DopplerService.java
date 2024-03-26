package com.asi.inscripciones.mvp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.asi.inscripciones.mvp.dto.DopplerDTO;
import com.asi.inscripciones.mvp.dto.UserAssistanceDTO;
import com.asi.inscripciones.mvp.entity.Correo;
import com.asi.inscripciones.mvp.repository.CorreoRepository;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class DopplerService {
    
    @Value("${doppler.api.key}")
    private String apiKey;

    @Value("${doppler.api.email}")
    private String apiEmail;

    @Value("${doppler.api.id}")
    private String apiId;

    @Autowired
    CorreoRepository correoRepository;

    @Autowired
    QRService qrService;

    /**
     * @param usuario
     * @throws Exception
     */
    public String sendMailByDoppler(DopplerDTO doppler, Long idCorreo) throws Exception {
        String body = new String();
        String response = new String();
        String apiService = "https://api.dopplerrelay.com/accounts/"+apiId+"/messages";
        String UrlCancelarInscripcion = "https://inscripciones-dev.gcba.gob.ar/cancelar-inscripcion/"+doppler.getInscripcionMongoId();

        Correo correo = correoRepository.findById(idCorreo);

        String template = correo.getHtml().replaceAll("_QrImageBase64_", doppler.getQrRuta())
                                        .replaceAll("_Curso_", doppler.getCurso())
                                        .replaceAll("_Instancia_", doppler.getInstancia())
                                        .replaceAll("_Nombre_", doppler.getNombre())
                                        .replaceAll("_Organismo_", doppler.getOrganismo())
                                        .replaceAll("_Sede_", doppler.getSede())
                                        .replaceAll("_InscripcionId_", doppler.getIdInscripcion())
                                        .replaceAll("_Dia_", doppler.getDia())
                                        .replaceAll("_Hora_", doppler.getHorario())
                                        .replaceAll("_NombreSolicitante_", doppler.getNombre()+" "+doppler.getApellido())
                                        .replaceAll("_UrlCancelarInscripcion_", UrlCancelarInscripcion);

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

        try {
            body = body.concat(jObject.toString());
            HttpResponse<JsonNode> request = Unirest.post(apiService)
            .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
            .header("Authorization", "token "+apiKey)
            .body(body)
            .asJson();

            response = request.getBody().getObject().toString();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return response;
    }
}
