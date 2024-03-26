package com.asi.inscripciones.mvp.service.kafka;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class RegistroInscriptosKafkaProducer {

    @Value("${kafka.topic.nombre.t4}")
    private String nombreTopic;

    private KafkaTemplate<String, CitizenResponse> kafkaTemplate;

    public RegistroInscriptosKafkaProducer(KafkaTemplate<String, CitizenResponse> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(CitizenResponse data){
        System.out.println(String.format("CitizenResponse sent -> %s", data.toString()));
        Message<CitizenResponse> message = MessageBuilder
                .withPayload(data)
                .setHeader(KafkaHeaders.TOPIC, nombreTopic)
                .build();

        kafkaTemplate.send(message);
    }
}
