package com.asi.inscripciones.mvp.integration.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ProveedorDocumentosS3 {

    @Value("${app.s3.endpoint}")
    private String s3Endpoint;

    @Value("${app.s3.port}")
    private String s3Port;

    @Value("${app.s3.accessKey}")
    private String s3AccessKey;

    @Value("${app.s3.secretKey}")
    private String s3SecretKey;

    @Value("${app.s3.bucketName}")
    private String s3BucketName;


    private AmasonClient amasonClient = new AmasonClient();

    
    public Resource getFileResource(String nameResource) {


        return amasonClient.setS3Endpoint(s3Endpoint)
                .setS3Port(s3Port)
                .setS3AccessKey(s3AccessKey)
                .setS3SecretKey(s3SecretKey)
                .setS3BucketName(s3BucketName)
                .getResource(nameResource);
    }


    public String saveFileIntoS3(MultipartFile file, String codIdentificador){
        try {

            return amasonClient.setS3Endpoint(s3Endpoint)
                    .setS3Port(s3Port)
                    .setS3AccessKey(s3AccessKey)
                    .setS3SecretKey(s3SecretKey)
                    .setS3BucketName(s3BucketName)
                    .uploadFile(file,codIdentificador);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
