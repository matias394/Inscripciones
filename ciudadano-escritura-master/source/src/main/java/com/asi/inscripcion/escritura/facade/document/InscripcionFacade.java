package com.asi.inscripcion.escritura.facade.document;

import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.document.ContadorCupo;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import com.asi.inscripcion.escritura.service.KafkaProducerService;
import com.asi.inscripcion.escritura.service.document.CitizenResponseService;
import com.asi.inscripcion.escritura.service.document.ContadorCupoService;
import com.asi.inscripcion.mapper.document.CitizenResponseMapper;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

@ApplicationScoped
public class InscripcionFacade {
    @Inject
    CitizenResponseService citizenResponseService;
    @Inject
    CitizenResponseMapper citizenResponseMapper;
    @Inject
    ContadorCupoService contadorCupoService;
    @Inject
    KafkaProducerService kafkaProducerService;


    protected final Logger logger = Logger.getLogger(getClass());

    public Uni<CitizenResponse> saveInscription(CitizenResponseDTO response) {

        CitizenResponse responseMapped = citizenResponseMapper.dtoToEntity(response);

        ObjectId objectId = new ObjectId();

        logger.info("Registro Mongo ID="+ objectId);

        responseMapped.set_id(objectId);

        citizenResponseService.save(responseMapped).subscribe().with(responseSaved -> {
            counterIncrement(response);

            response.set_id(responseMapped.get_id());
            response.setIdMongo(responseMapped.get_id().toString());

            kafkaProducerService.citizenResponse(response);
            kafkaProducerService.citizenResponseReportsDTO(response);

        });

        return Uni.createFrom().item(responseMapped);
    }


    public void counterIncrement(CitizenResponseDTO response){

        Uni<ContadorCupo> contadorCupoExist = contadorCupoService.findByInstanciaSedeId(response.getInstanciaSedeId());

        contadorCupoExist.subscribe().with(
                contadorCupo -> {

                    if (contadorCupo != null) {
                        contadorCupo.setCounter(contadorCupo.getCounter() + 1);
                        contadorCupoService.update(contadorCupo).subscribe().with(contadorCupoSaved -> logger.info("Cupos ="+contadorCupoSaved));
                    } else {
                        ContadorCupo newContadorCupo = new ContadorCupo();
                        newContadorCupo.setCounter(1);
                        newContadorCupo.setInstanciaSedeId(response.getInstanciaSedeId());
                        newContadorCupo.setSynchronizedToOracle(false);

                        contadorCupoService.save(newContadorCupo).subscribe().with(contadorCupoSaved -> logger.info("Cupos ="+contadorCupoSaved));
                    }
                },
                failure -> {
                    logger.error("Error: " + failure);
                }
        );
    }

    public Uni<CitizenResponse> getByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId){
        Uni<CitizenResponse> citizenResponseUni = citizenResponseService.findByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
        citizenResponseUni.subscribe().with(
                citizenResponse -> {

                    if (citizenResponse != null) {
                        citizenResponse.getRespuesta();
                    }
                },
                failure -> {
                    logger.error("Error: " + failure);
                }
        );
        return citizenResponseUni;
    }

    public Uni<Long> getCountByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId){
        return citizenResponseService.countByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
    }

    public Uni<Long> getByCuilAndInscripcionId(String cuil, Long inscripcionId){
        return citizenResponseService.countByCuilAndInscripcionId(cuil, inscripcionId);
    }

    public Uni<Long> getCounterByinstanciaSedeId(Long instanciaSedeId){
        return contadorCupoService.getCounterByinstanciaSedeId(instanciaSedeId);
    }
}
