package com.asi.inscripcion.serviciosexternos.facade;

import java.util.List;

import org.eclipse.microprofile.context.ThreadContext;
import org.jboss.logging.Logger;

import com.asi.inscripcion.serviciosexternos.service.CitizenResponseService;
import com.asi.inscripcion.serviciosexternos.service.ClaseAlumnoService;
import com.asi.inscripcion.serviciosexternos.service.ClaseService;
import com.asi.inscripcion.serviciosexternos.service.ContadorCupoService;
import com.asi.inscripcion.serviciosexternos.service.InstanciaService;
import com.asi.inscripcion.serviciosexternos.service.UserService;

import io.smallrye.mutiny.Uni;

import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.dto.CancelacionInformationDTO;
import com.asi.inscripcion.entity.Clase;
import com.asi.inscripcion.entity.Instancia;
import com.asi.inscripcion.entity.Usuario;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CancellationFacade {

    
    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    InstanciaService instanciaService;

    @Inject
    CitizenResponseService citizenResponseService;

    @Inject
    ContadorCupoService contadorCupoService;

    @Inject
    UserService userService;

    @Inject
    ClaseAlumnoService claseAlumnoService;

    @Inject
    ClaseService claseService;

    @Inject
    ThreadContext threadContext;

    @Transactional
    public CancelacionInformationDTO getCancellation(String mongoId) {
        logger.info("MONGO ID ************* : " +mongoId);
        CancelacionInformationDTO cancelacionInformationDTO = new CancelacionInformationDTO();
        CitizenResponse inscripcionCupo = citizenResponseService.findById(mongoId).await().indefinitely();
        if(inscripcionCupo != null){
            logger.info("INSCRIPCIÓN CUPO ************** :" + inscripcionCupo);
                Instancia instanciaData = instanciaService.getInstanciaById(inscripcionCupo.getInstanciaId());
                logger.info("INSTANCIA DATA ************** :" + instanciaData);
                cancelacionInformationDTO.setCuil(inscripcionCupo.getCuil());
                cancelacionInformationDTO.setInscripcionId(instanciaData.getInscripcion().getId());
                cancelacionInformationDTO.setNombreInscripcion(instanciaData.getInscripcion().getNombre());
                cancelacionInformationDTO.setCanceled(inscripcionCupo.deleted);
        }
        logger.info("CANCELACIÓN INFO ***************** : " +cancelacionInformationDTO);
        return cancelacionInformationDTO;
    }

    @Transactional
    public Integer cancellation(String mongoId){
        logger.info("MONGO ID ************* : " +mongoId);
        CitizenResponse cupo = citizenResponseService.softDeleteByMongoID(mongoId, "Correo").await().indefinitely();
        logger.info("CANCELLATION CUPO ***************** : " + cupo);
        if (cupo == null) {
            return 0;
        }
        contadorCupoService.reduceCounter(cupo.getInstanciaSedeId(), 1).await().indefinitely();
        try {
            Usuario usuario = userService.findByCuil(cupo.getCuil());
            List<Clase> clases = claseService.getClasesById(cupo.getInstanciaSedeId());
            claseAlumnoService.softDeleteClaseAlumnoByUsuarioId(usuario.getId(), clases);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 1;
    }
}
