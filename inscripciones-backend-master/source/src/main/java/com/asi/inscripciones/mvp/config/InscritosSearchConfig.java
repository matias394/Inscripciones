package com.asi.inscripciones.mvp.config;


import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.message.BasicHeader;
import org.apache.http.ssl.SSLContexts;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;

import javax.net.ssl.SSLContext;

@Configuration
@EnableElasticsearchRepositories(basePackages
        = "com.asi.inscripciones.mvp.repository")
@ComponentScan(basePackages = { "com.asi.inscripciones.mvp" })
public class InscritosSearchConfig extends
        AbstractElasticsearchConfiguration {


    @Value("${elasticsearch.ssl.key-store}")
    private Resource trustStore;

    @Value("${elasticsearch.ssl.key-store-password}")
    private String trustStorePassword;

    @Value("${elasticsearch.client.username}")
    private String elasticUserName;

    @Value("${elasticsearch.client.password}")
    private String elasticPassword;

    @Value("${elasticsearch.host}")
    private String elasticHost;

    @Value("${elasticsearch.port}")
    private Integer elasticPort;

    @Value("${elasticsearch.protocol}")
    private String elasticProtocol;

    @Value("${elasticsearch.index.name}")
    private String elasticsearchIndexName;
    
    public String getElasticsearchIndexName() {
        return elasticsearchIndexName;
    }

    @Override
    @Bean()
    public RestHighLevelClient elasticsearchClient() {
        try{
            //Descomentar para agregar SSL
           /* final SSLContext sslContext = SSLContexts.custom()
                    .loadTrustMaterial(trustStore.getURL(), trustStorePassword.toCharArray())
                    .build();*/

            final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(elasticUserName, elasticPassword));

            //SSL ON
           /* RestClientBuilder builder = RestClient.builder(new HttpHost(elasticHost, elasticPort, elasticProtocol))
                    .setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider).setSSLContext(sslContext))
                    .setDefaultHeaders(compatibilityHeaders());*/

            //SSL OFF
            RestClientBuilder builder = RestClient.builder(new HttpHost(elasticHost, elasticPort, elasticProtocol))
                    .setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider))
                    .setDefaultHeaders(compatibilityHeaders());


            return new RestHighLevelClient(builder);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    private Header[] compatibilityHeaders() {
        return new Header[]{
                new BasicHeader(HttpHeaders.ACCEPT, "application/vnd.elasticsearch+json;compatible-with=7"),
                new BasicHeader(HttpHeaders.CONTENT_TYPE, "application/vnd.elasticsearch+json;compatible-with=7")
        };

}
}
