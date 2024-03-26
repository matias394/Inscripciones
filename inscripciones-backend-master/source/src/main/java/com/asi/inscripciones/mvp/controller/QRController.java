package com.asi.inscripciones.mvp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asi.inscripciones.mvp.dto.UserAssistanceDTO;
import com.asi.inscripciones.mvp.service.QRService;
import com.asi.inscripciones.mvp.util.Url;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.QR)
public class QRController {

    @Autowired
    private QRService qrService;

    @GetMapping("/get")
    public ResponseEntity<String> getQR(final @RequestBody UserAssistanceDTO info) throws Exception{
        String respuesta = qrService.generateQR(info);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(respuesta, headers, HttpStatus.OK);
    }
}
