package com.asi.inscripciones.mvp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.asi.inscripciones.mvp.dto.RecaptchaInfoDTO;
import com.asi.inscripciones.mvp.util.RecaptchaResponse;

import org.springframework.beans.factory.annotation.Value;

import java.util.regex.Pattern;

@Service
public class RecaptchaService {

    @Value("${google.recaptcha.endpoint}")
    private String googleEndpoint;

    @Value("${google.recaptcha.site}")
    private String googleSite;

    @Value("${google.recaptcha.secret}")
    private String googleSecret;

    private static final Logger LOGGER = LoggerFactory.getLogger(RecaptchaService.class);

    private static Pattern RESPONSE_PATTERN = Pattern.compile("[A-Za-z0-9_-]+");

    /**
     * @param token
     * @return
     * @throws Exception
     */
    public RecaptchaResponse validateRecaptcha(RecaptchaInfoDTO info) throws Exception {
        RecaptchaResponse response = new RecaptchaResponse();

        try{
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(googleEndpoint).queryParam("secret", googleSecret).queryParam("response", info.getToken()).queryParam("remoteip", info.getSelf());
            response = new RestTemplate().getForObject(builder.build().encode().toUri(), RecaptchaResponse.class);

        } catch (Exception e){
            e.printStackTrace();
        }

        return response;
     
    }
}
