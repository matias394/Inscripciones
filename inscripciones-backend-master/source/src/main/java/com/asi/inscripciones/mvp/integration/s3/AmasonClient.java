package com.asi.inscripciones.mvp.integration.s3;


import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
 
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
 

public class AmasonClient {


    private String s3Endpoint;
    private String s3Port;
    private String s3AccessKey;
    private String s3SecretKey;
    private String s3BucketName;

    private AmazonS3 s3client;
    
    public AmasonClient setS3Endpoint(String endpoint){
        s3Endpoint = endpoint;
        return this;
    }

    public AmasonClient setS3Port(String port){
        s3Port = port;
        return this;
    }

    public AmasonClient setS3AccessKey(String accessKey){
        s3AccessKey = accessKey;
        return this;
    }

    public AmasonClient setS3SecretKey(String secretKey){
        s3SecretKey =  secretKey;
        return this;
    }

    public AmasonClient setS3BucketName( String bucketName){
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

    public String uploadFile(MultipartFile multipartFile, String codIdentificador) throws IOException {

        File file = convertMultiPartToFile(multipartFile);
        String fileName = generateFileName(multipartFile, codIdentificador);
        uploadFileTos3bucket(fileName, file);
        file.delete();
        return fileName;
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3Client().putObject(s3BucketName, fileName, file);
    }

    public Resource getResource(String path) {
        return new InputStreamResource(getS3ObjectInputStream(path).getDelegateStream());
    }

    public byte[] getDataByte(String path) throws IOException {
        S3Object s3Object = getS3Object(path);
        S3ObjectInputStream s3Stream  = s3Object.getObjectContent();
        byte[] content = IOUtils.toByteArray(s3Stream) ;
        s3Object.close();
        return content;
    }

    private S3ObjectInputStream getS3ObjectInputStream(String path){
        return getS3Object(path).getObjectContent();
    }

    private S3Object getS3Object(String path) {
        return s3Client().getObject(s3BucketName, path);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart, String id) {
        return id+"-"+ multiPart.getOriginalFilename().replace(" ", "_");
    }

}