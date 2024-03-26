package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import com.asi.inscripcion.dto.BotiDTO;
import com.asi.inscripcion.dto.DopplerDTO;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import com.asi.inscripcion.serviciosexternos.facade.AmazonS3Facade;
import com.asi.inscripcion.serviciosexternos.facade.BotiFacade;
import com.asi.inscripcion.serviciosexternos.facade.DopplerFacade;
import com.asi.inscripcion.util.JsonbUtil;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.reactive.messaging.kafka.Record;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.jboss.logging.Logger;

import java.io.FileNotFoundException;

@ApplicationScoped
public class KafkaConsumerService {

    @Inject
    private BotiFacade botiFacade;

    @Inject
    private AmazonS3Facade amazonS3Facade;

    @Inject
    private DopplerFacade dopplerFacade;

    @Inject
    private ElasticSearchService elasticSearchService;


    protected final Logger logger = Logger.getLogger(getClass());


    @Blocking
    @Incoming("t01-reportes-inscriptos")
    public void reciveDataElastic(Record<String, String> record){
        logger.info("==== reciveDataElastic ====");
        CitizenResponseDTO citizenResponseDTO = JsonbUtil.deserializar(record.value(),CitizenResponseDTO.class);
        elasticSearchService.save(citizenResponseDTO);
    }


    @Incoming("t02-boti-inscriptos")
    public void receiveBoti(Record<String, String> record) {
        logger.info("==== receiveBoti ====");
        BotiDTO botiDTO = JsonbUtil.deserializar(record.value(),BotiDTO.class);
        botiFacade.sendSMS(botiDTO);
    }


    @Blocking
    @Incoming("t03-s3-inscriptos")
    public void receiveS3(Record<String, String> record) throws FileNotFoundException {
        logger.info("==== receiveS3 ====");
        AmazonSaveFileDTO amazonSaveFileDTO = JsonbUtil.deserializar(record.value(), AmazonSaveFileDTO.class);
        amazonS3Facade.uploadToAmazonS3(amazonSaveFileDTO).subscribe().with(
            result -> {
                logger.info("Resultado de la subida del Amazon S3: " + result);
            },
            failure -> {
                logger.error("Error en la subida del Amazon S3", failure);
            }
        );
    }

    @Blocking
    @Incoming("t05-dopper-inscriptos")
    public void receiveDopper(Record<String, String> record) {
        logger.info("==== receiveDopper ====");
        DopplerDTO dto = JsonbUtil.deserializar(record.value(), DopplerDTO.class);
        dopplerFacade.sendEmail(dto).subscribe().with(
            result -> {
                logger.info("Resultado del envío de email: " + result);
            },
            failure -> {
                logger.error("Error en el envío de email", failure);
            }
        );
    }
}
