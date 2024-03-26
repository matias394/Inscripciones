package com.asi.inscripcion.serviciosexternos.service.integration;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

@ApplicationScoped
@RegisterForReflection
public class AmazonClient {

    private String s3Endpoint;
    private String s3Port;
    private String s3AccessKey;
    private String s3SecretKey;
    private String s3BucketName;

    private AmazonS3 s3client;

    public AmazonClient setS3Endpoint(String endpoint){
        s3Endpoint = endpoint;
        return this;
    }

    public AmazonClient setS3Port(String port){
        s3Port = port;
        return this;
    }

    public AmazonClient setS3AccessKey(String accessKey){
        s3AccessKey = accessKey;
        return this;
    }

    public AmazonClient setS3SecretKey(String secretKey){
        s3SecretKey =  secretKey;
        return this;
    }

    public AmazonClient setS3BucketName( String bucketName){
        s3BucketName = bucketName;
        return this;
    }

    private AmazonS3 s3Client() {
        if(s3client != null)
            return s3client;

        AWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3SecretKey);

        ClientConfiguration myClientConfig = new ClientConfiguration();
        myClientConfig.setProtocol(Protocol.HTTPS);
        System.setProperty("com.amazonaws.sdk.disableCertChecking", "true");

        AmazonS3 client = new AmazonS3Client(awsCredentials, myClientConfig);
        client.setEndpoint(s3Endpoint + ":" +s3Port);
        return client;
    }

    public String uploadFile(File file, String codIdentificador) throws IOException {
        String fileName = generateFileName(file, codIdentificador);
        uploadFileTos3bucket(fileName, file);
        return fileName;
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3Client().putObject(s3BucketName, fileName, file);
    }

    public Path getResource(String path) throws IOException {
        InputStream inputStream = getS3ObjectInputStream(path).getDelegateStream();
        Path tempDir = Files.createTempDirectory("temp");
        String fileName = path.substring(path.lastIndexOf("/") + 1);
        Path tempFilePath = tempDir.resolve(fileName);
        Files.copy(inputStream, tempFilePath, StandardCopyOption.REPLACE_EXISTING);
        return tempFilePath;
    }

    private S3ObjectInputStream getS3ObjectInputStream(String path){
        return getS3Object(path).getObjectContent();
    }

    private S3Object getS3Object(String path) {
        return s3Client().getObject(s3BucketName, path);
    }

    private String generateFileName(File file, String id) {
        String originalFileName = file.getName();
        String uniqueFileName = id + "-" + originalFileName;
        return uniqueFileName;
    }

    public String convertResourceToBase64(Path resource) throws IOException {
        byte[] fileBytes = Files.readAllBytes(resource);
        return Base64.getEncoder().encodeToString(fileBytes);
    }
}
