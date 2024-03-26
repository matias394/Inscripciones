package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.serviciosexternos.service.integration.AmazonClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

@ApplicationScoped
public class AmazonS3Service {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    @ConfigProperty(name = "app.s3.endpoint")
    String s3Endpoint;

    @Inject
    @ConfigProperty(name = "app.s3.port")
    String s3Port;

    @Inject
    @ConfigProperty(name = "app.s3.accessKey")
    String s3AccessKey;

    @Inject
    @ConfigProperty(name = "app.s3.secretKey")
    String s3SecretKey;

    @Inject
    @ConfigProperty(name = "app.s3.bucketName")
    String s3BucketName;

    @Inject
    Logger log;

    private AmazonClient amazonClient = new AmazonClient();

    public Path getFileResource(String nameResource) throws IOException {
        return amazonClient
                .setS3Endpoint(s3Endpoint)
                .setS3Port(s3Port)
                .setS3AccessKey(s3AccessKey)
                .setS3SecretKey(s3SecretKey)
                .setS3BucketName(s3BucketName)
                .getResource(nameResource);
    }

    public String saveFileIntoS3(File file, String codIdentificador) {
        try {
            return amazonClient
                    .setS3Endpoint(s3Endpoint)
                    .setS3Port(s3Port)
                    .setS3AccessKey(s3AccessKey)
                    .setS3SecretKey(s3SecretKey)
                    .setS3BucketName(s3BucketName)
                    .uploadFile(file, codIdentificador);
        } catch (IOException e) {
            log.error("Error saving file to S3", e);
            return null;
        }
    }
}
