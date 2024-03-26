package com.asi.inscripcion.escritura.service;


import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import com.asi.inscripcion.dto.BotiDTO;
import com.asi.inscripcion.dto.DopplerDTO;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import org.jboss.logging.Logger;

@ApplicationScoped
public class KafkaProducerService {

    protected final Logger logger = Logger.getLogger(getClass());


    @Inject
    @Channel("t01-reportes-inscriptos")
    Emitter<CitizenResponseDTO> citizenResponseReportsDTOEmitter;

    @Inject
    @Channel("t02-boti-inscriptos")
    Emitter<BotiDTO> botiEmitter;

    @Inject
    @Channel("t04-registro-inscriptos")
    Emitter<CitizenResponseDTO> citizenResponseEmitter;

    @Inject
    @Channel("t03-s3-inscriptos")
    Emitter<AmazonSaveFileDTO> amazonEmitter;

    @Inject
    @Channel("t05-dopper-inscriptos")
    Emitter<DopplerDTO> dopplerEmitter;



    public void citizenResponseReportsDTO(CitizenResponseDTO citizenResponseDTO) {
        logger.info("==== citizenResponseReportsDTOEmitter ====");
        citizenResponseReportsDTOEmitter.send(citizenResponseDTO);
    }


    public Uni<Void> boti(BotiDTO botiDTO) {
        logger.info("==== BotiEmitter ====");
        return Uni.createFrom().completionStage(
            botiEmitter.send(botiDTO)
        );
    }


    public void citizenResponse(CitizenResponseDTO citizenResponseDTO) {
        logger.info("==== CitizenResponseEmitter ====");
        citizenResponseEmitter.send(citizenResponseDTO);
    }


    public Uni<Void> amazonS3(AmazonSaveFileDTO amazonSaveFileDTO) {
        logger.info("==== amazonS3Emitter ====");
        return Uni.createFrom().completionStage(
                amazonEmitter.send(amazonSaveFileDTO)
        );
    }


    public Uni<Void> doppler(DopplerDTO dopplerDTO) {
        logger.info("==== DopperEmitter ====");
        return Uni.createFrom().completionStage(
                dopplerEmitter.send(dopplerDTO)
        );
    }


}
