package com.asi.inscripciones.mvp.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class AmazonSaveFileDTO {
    private MultipartFile file;
    private String codIdentificador;
    private String cuil;
    private Long inscripcion;
    private Long instancia;
    
}
