package com.asi.inscripciones.mvp.controller;

import org.springframework.web.bind.annotation.RestController;

import com.asi.inscripciones.mvp.dto.RecaptchaInfoDTO;
import com.asi.inscripciones.mvp.service.RecaptchaService;
import com.asi.inscripciones.mvp.util.RecaptchaResponse;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.RECAPTCHA)
public class RecaptchaController {

    @Autowired
    private RecaptchaService recaptchaService;

    @PostMapping()
    public ResponseEntity<RecaptchaResponse> verifyRecaptcha(final @RequestBody RecaptchaInfoDTO info) throws Exception{
        RecaptchaResponse response = recaptchaService.validateRecaptcha(info);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    
}
