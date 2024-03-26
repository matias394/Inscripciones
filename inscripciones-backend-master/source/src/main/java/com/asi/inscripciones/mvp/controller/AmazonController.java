package com.asi.inscripciones.mvp.controller;


import kong.unirest.HttpStatus;
import lombok.extern.log4j.Log4j2;

import org.springframework.core.io.InputStreamSource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.sql.Blob;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.asi.inscripciones.mvp.dto.AmazonGetFileDTO;
import com.asi.inscripciones.mvp.dto.AmazonSaveFileDTO;
import com.asi.inscripciones.mvp.dto.FileResponse;
import com.asi.inscripciones.mvp.entity.RepositorioArchivo;
import com.asi.inscripciones.mvp.integration.s3.ProveedorDocumentosS3;
import com.asi.inscripciones.mvp.service.RepositorioArchivoService;
import com.asi.inscripciones.mvp.util.Url;




@Log4j2
@RestController
@RequestMapping(Url.API+Url.AMAZON_S3)
public class AmazonController {

    @Autowired
    private ProveedorDocumentosS3 proveedorDocumentosS3;

    @Autowired
    private RepositorioArchivoService repositorioArchivoService;

    @PostMapping("/getFile")
    public ResponseEntity<FileResponse> getAmazonFile(final @RequestBody AmazonGetFileDTO amazonFileInfo) throws IOException{
        String fileName = repositorioArchivoService.searchFile(amazonFileInfo);
        if(!fileName.equals("")){
            Resource response = proveedorDocumentosS3.getFileResource(fileName);
            String base64 = repositorioArchivoService.convertResourceToBase64(response);
            FileResponse fileResponse = new FileResponse();
            fileResponse.setBase64(base64);
            fileResponse.setFileName(fileName);
            return ResponseEntity.status(HttpStatus.OK).body(fileResponse);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/save/file")
    public ResponseEntity<String> saveAmazonFile(final @ModelAttribute AmazonSaveFileDTO amazonFile){
        RepositorioArchivo repositorioArchivo = new RepositorioArchivo();
        /* Guardar en Tabla */
        repositorioArchivo = repositorioArchivoService.save(amazonFile, amazonFile.getCodIdentificador());
        String identificador = String.valueOf(repositorioArchivo.getId());
        String docName = proveedorDocumentosS3.saveFileIntoS3(amazonFile.getFile(), identificador);
        repositorioArchivo = repositorioArchivoService.update(repositorioArchivo.getId(), docName);

        return ResponseEntity.status(HttpStatus.OK).body(docName);
    }

}
