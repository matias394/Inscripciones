package com.asi.inscripcion.serviciosexternos.facede;

import com.asi.inscripcion.dto.DopplerDTO;
import com.asi.inscripcion.serviciosexternos.facade.DopplerFacade;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class DopplerFacadeTest {

    @Inject
    DopplerFacade dopplerFacade;

    @Test
    void send(){
        DopplerDTO dopplerDTO = new DopplerDTO();
        dopplerDTO.setCorreoId(1L);
        dopplerDTO.setCurso("Curso de Ejemplo");
        dopplerDTO.setInstancia("Instancia de Ejemplo");
        dopplerDTO.setInstanciaId(1490L);
        dopplerDTO.setCuil("12345678901");
        dopplerDTO.setInscripcionMongoId("abc123def456");
        dopplerDTO.setNombre("John");
        dopplerDTO.setApellido("Doe");
        dopplerDTO.setEmail("juanz@epidataconsulting.com");
        dopplerDTO.setOrganismo("Organismo de Ejemplo");
        dopplerDTO.setSede("Sede de Ejemplo");
        dopplerDTO.setSedeDireccion("Dirección de la Sede de Ejemplo");
        dopplerDTO.setDia("Lunes");
        dopplerDTO.setIdInscripcion("ID123");
        dopplerDTO.setHorario("9:00 AM - 5:00 PM");
        dopplerDTO.setInstanciaSede(1805L);
        dopplerDTO.setRutaQr("https://inscripciones-dev.gcba.gob.ar/imagenes/qr/6f86b4545ac6242e61d85d6278c760d4971d0c047bafdfadaacb2e36858b476d.png");
        
        Uni<String> response = dopplerFacade.sendEmail(dopplerDTO);

        assertNotNull(response);
    }
}
