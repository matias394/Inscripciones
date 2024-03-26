package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.DopplerDTO;
import com.asi.inscripciones.mvp.service.DopplerService;
import com.asi.inscripciones.mvp.util.Url;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.DOPPLER)
public class DopplerController {

    @Autowired
    private DopplerService dopplerService;

    @PostMapping("/{idCorreo}")
    public ResponseEntity<String> sendMail(final @RequestBody DopplerDTO doppler, final @PathVariable Long idCorreo) throws Exception{
        String response = dopplerService.sendMailByDoppler(doppler, idCorreo);
        return ResponseEntity.status(HttpStatus.OK).body(response.toString());
    }
}
