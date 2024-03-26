package com.asi.inscripcion.serviciosexternos.facade;

import com.asi.inscripcion.dto.AmazonGetFileDTO;
import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import com.asi.inscripcion.dto.FileResponseDTO;
import com.asi.inscripcion.entity.Inscripcion;
import com.asi.inscripcion.entity.InstanciaSede;
import com.asi.inscripcion.entity.RepositorioArchivo;
import com.asi.inscripcion.serviciosexternos.service.AmazonS3Service;
import com.asi.inscripcion.serviciosexternos.service.InscripcionService;
import com.asi.inscripcion.serviciosexternos.service.InstanciaSedeService;
import com.asi.inscripcion.serviciosexternos.service.RepositorioArchivoService;
import com.asi.inscripcion.serviciosexternos.service.integration.AmazonClient;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Base64;

@ApplicationScoped
public class AmazonS3Facade {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    InscripcionService inscripcionService;

    @Inject
    InstanciaSedeService instanciaSedeService;

    @Inject
    RepositorioArchivoService repositorioArchivoService;

    @Inject
    AmazonS3Service amazonS3Service;

    @Inject
    AmazonClient amazonClient;

    @Blocking
    @Transactional
    public Uni<RepositorioArchivo> save(AmazonSaveFileDTO archivo) {
        Uni<Inscripcion> inscripcionUni = inscripcionService.getInscripcionById(archivo.getInscripcion());
        Uni<InstanciaSede> instanciaSedeUni = instanciaSedeService.findByInstanciaSedeId(archivo.getInstancia());
        return Uni.combine().all().unis(inscripcionUni, instanciaSedeUni)
                .asTuple()
                .onItem().transformToUni(tuple -> {
                    Inscripcion inscripcion = tuple.getItem1();
                    InstanciaSede instanciaSede = tuple.getItem2();
                    return repositorioArchivoService.save(inscripcion, instanciaSede, archivo, archivo.getFileName());
                });
        }
    
    @Blocking
    public Uni<String> uploadToAmazonS3(AmazonSaveFileDTO amazonFile){
        File file = base64ToFile(amazonFile.getFile64(), amazonFile.getFileName());
        Uni<RepositorioArchivo> repositorioArchivoUni = save(amazonFile);
        return repositorioArchivoUni.onItem().transform(repositorioArchivo -> {
            String identificador = String.valueOf(repositorioArchivo.getId());
            String docName = amazonS3Service.saveFileIntoS3(file, identificador);
            repositorioArchivoService.update(repositorioArchivo.getId(), docName);
            return docName;
        });
    }

    public FileResponseDTO getFromAmazonS3(AmazonGetFileDTO amazonFileInfo) throws IOException {
        String fileName = repositorioArchivoService.searchFile(amazonFileInfo);
        if(!fileName.equals("")){
            Path response = amazonS3Service.getFileResource(fileName);
            String base64 = amazonClient.convertResourceToBase64(response);
            FileResponseDTO fileResponseDTO = build(fileName, base64);
            return fileResponseDTO;
        } else {
            return null;
        }
    }

    public FileResponseDTO build(String fileName, String base64){
        FileResponseDTO fileResponse = new FileResponseDTO();
        fileResponse.setBase64(base64);
        fileResponse.setFileName(fileName);
        return fileResponse;
    }

    private static File base64ToFile(String base64String, String fileName) {
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(base64String);
            File file = new File(fileName);
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(decodedBytes);
            }
            return file;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
