package com.asi.inscripciones.mvp.service;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialException;
import javax.validation.constraints.Null;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.asi.inscripciones.mvp.dto.AmazonGetFileDTO;
import com.asi.inscripciones.mvp.dto.AmazonSaveFileDTO;
import com.asi.inscripciones.mvp.entity.Categoria;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.entity.RepositorioArchivo;
import com.asi.inscripciones.mvp.integration.s3.ProveedorDocumentosS3;
import com.asi.inscripciones.mvp.repository.InscripcionRepository;
import com.asi.inscripciones.mvp.repository.InstanciaSedeRepository;
import com.asi.inscripciones.mvp.repository.RepositorioArchivoRepository;

import lombok.RequiredArgsConstructor;

import static com.asi.inscripciones.mvp.util.FileUtils.validaMimeContentTypeFromMultiPartFile;


@Service
@RequiredArgsConstructor
public class RepositorioArchivoService {

    @Value("#{'${custom.file-extension-contenidoMultimedia}'.split(',')}")
    private List<String> extensionContenidoMultimedia;

    @Autowired
    final RepositorioArchivoRepository repositorioArchivoRepository;

    @Autowired
    final ProveedorDocumentosS3 proveedorDocumentosS3;

    @Autowired
    final InscripcionRepository inscripcionRepository;

    @Autowired
    final InstanciaSedeRepository instanciaSedeRepository;

    /**
     * @param archivo
     * @return
     */
    public RepositorioArchivo save(AmazonSaveFileDTO archivo, String fileNameAmazon){
        LocalDate today = LocalDate.now();

        Inscripcion inscripcion = inscripcionRepository.getInscripcionById(archivo.getInscripcion());
        
        InstanciaSede instanciaSede = instanciaSedeRepository.findByIdInstanciaSede(archivo.getInstancia());

        validaMimeContentTypeFromMultiPartFile(archivo.getFile(), extensionContenidoMultimedia);

        RepositorioArchivo repositorioArchivo = new RepositorioArchivo();
        repositorioArchivo.setNombre(fileNameAmazon);
        repositorioArchivo.setCuil(archivo.getCuil());
        repositorioArchivo.setDescripcion("Descripción");
        repositorioArchivo.setMetadata(archivo.getFile().getOriginalFilename().replace(" ", "_"));
        repositorioArchivo.setInscripcion_id(inscripcion);
        repositorioArchivo.setInstancia_sede_id(instanciaSede);
        repositorioArchivo.setEstado(1);
        repositorioArchivo.setModificadoPor("admin");
        repositorioArchivo.setModificado(today);
        repositorioArchivo.setCreado(today);
        repositorioArchivo.setCreadoPor("admin");
        repositorioArchivoRepository.save(repositorioArchivo);
        return repositorioArchivo;
    }

        public RepositorioArchivo update(Long id, String fileNameAmazon){

        RepositorioArchivo repositorioArchivo = repositorioArchivoRepository.findById(id);
        repositorioArchivo.setNombre(fileNameAmazon);
        repositorioArchivoRepository.save(repositorioArchivo);
        return repositorioArchivo;
    }


    public String generateFileName(MultipartFile multiPart, String id) {
        return id+"-"+ multiPart.getOriginalFilename().replace(" ", "_");
    }

    public String searchFile(AmazonGetFileDTO amazonGetFileDto){
        RepositorioArchivo repositorioArchivo = repositorioArchivoRepository.findRepositorioArchivoFile(amazonGetFileDto.getCuil(), amazonGetFileDto.getInscripcion(), amazonGetFileDto.getInstancia());
        if(repositorioArchivo != null){
            return repositorioArchivo.getNombre();
        }else{
            return "";
        }
    }

    public Blob inputToBlob(InputStream inputStream) throws IOException, SerialException, SQLException{
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];

        int bytesRead;
            while((bytesRead = inputStream.read(buffer)) != -1){
                outputStream.write(buffer, 0, bytesRead);
            }
        byte[] bytes = outputStream.toByteArray();

            return new javax.sql.rowset.serial.SerialBlob(bytes);
        }

    public String convertResourceToBase64(Resource resource) throws IOException {
        try (InputStream inputStream = resource.getInputStream()) {
            byte[] bytes = inputStream.readAllBytes();
            return Base64.encodeBase64String(bytes);
            }
        }
    }

