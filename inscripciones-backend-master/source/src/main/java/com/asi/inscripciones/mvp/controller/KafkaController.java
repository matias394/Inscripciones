package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.service.kafka.RegistroInscriptosKafkaProducer;
import com.asi.inscripciones.mvp.util.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Url.API+"/kafka")
public class KafkaController {
    @Autowired
    private RegistroInscriptosKafkaProducer registroInscriptosKafkaProducer;

    @PostMapping("/publish")
    public ResponseEntity<String> publish(@RequestBody CitizenResponse data){
        registroInscriptosKafkaProducer.sendMessage(data);
        return ResponseEntity.ok("Json CitizenResponse sent to kafka topic: t04-registro-inscriptos");
    }
}
