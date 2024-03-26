package com.asi.inscripcion.escritura.service;
import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AmazonS3Service {

    @Inject
    KafkaProducerService kafkaProducerService;

    public Uni<Void> emitAmazonS3DTO(AmazonSaveFileDTO amazonSaveFileDTO) {
        return kafkaProducerService.amazonS3(amazonSaveFileDTO);
    }

}
