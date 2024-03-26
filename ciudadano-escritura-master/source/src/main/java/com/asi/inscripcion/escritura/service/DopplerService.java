package com.asi.inscripcion.escritura.service;
import com.asi.inscripcion.dto.DopplerDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class DopplerService {

    @Inject
    KafkaProducerService kafkaProducerService;

    public Uni<Void> emitDopplerDTO(DopplerDTO dopplerDTO) {
        return kafkaProducerService.doppler(dopplerDTO);
   }
}
