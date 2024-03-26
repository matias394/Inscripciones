package com.asi.inscripcion.serviciosexternos.facede;

import com.asi.inscripcion.dto.AmazonGetFileDTO;
import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import com.asi.inscripcion.dto.FileResponseDTO;
import com.asi.inscripcion.serviciosexternos.facade.AmazonS3Facade;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.io.FileNotFoundException;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AmazonS3FacadeTest {

    @Inject
    AmazonS3Facade amazonS3Facade;

    @Test
    void upload() throws FileNotFoundException{
        AmazonSaveFileDTO amazonFile = new AmazonSaveFileDTO();
        amazonFile.setFile64("base64");
        amazonFile.setFileName("imagen.png");
        amazonFile.setCuil("26900042");
        amazonFile.setInscripcion(1305L);
        amazonFile.setInstancia(1850L);

        Uni<String> response = amazonS3Facade.uploadToAmazonS3(amazonFile);

        assertNotNull(response);
    }

    @Test
    void get() throws IOException{
        AmazonGetFileDTO amazonFile = new AmazonGetFileDTO();
        amazonFile.setCuil("29736276");
        amazonFile.setInscripcion(1240L);
        amazonFile.setInstancia(1700L);

        FileResponseDTO response = amazonS3Facade.getFromAmazonS3(amazonFile);

        assertNotNull(response);
    }
}
