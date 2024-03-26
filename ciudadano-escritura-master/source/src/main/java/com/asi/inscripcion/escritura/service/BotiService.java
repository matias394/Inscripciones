package com.asi.inscripcion.escritura.service;
import com.asi.inscripcion.dto.BotiDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class BotiService {

    @Inject
    KafkaProducerService kafkaProducerService;

    public Uni<Void> emitBotiDTO(BotiDTO botiDTO) {
        return kafkaProducerService.boti(botiDTO);
    }
}
