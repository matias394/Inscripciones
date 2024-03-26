package com.asi.inscripciones.mvp.integration.s3;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "app.s3")
@Configuration("s3Properties")
@Data
public class AmasonS3Config {

    private String endpoint;
    private String port;
    private String accessKey;
    private String secretKey;
    private String bucketName;

}