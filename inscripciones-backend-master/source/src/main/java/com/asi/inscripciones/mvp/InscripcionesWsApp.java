package com.asi.inscripciones.mvp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InscripcionesWsApp {

    public static void main(String[] args) {
        SpringApplication.run(InscripcionesWsApp.class, args);
        System.out.println("*************************************************************************************************************************");
        System.out.println("**                                                                                                                     **");
        System.out.println("**  Desplegado                                                                                                         **");
        System.out.println("**                                                                                                                     **");
        System.out.println("**  https://localhost:7090/inscripciones-service/swagger-ui/index.html?configUrl=/inscripciones-service/v3/api-docs/swagger-config#/  **");
        System.out.println("**                                                                                                                     **");
        System.out.println("**                                                                                                                     **");
        System.out.println("**                                                                                                                     **");
        System.out.println("*************************************************************************************************************************");

    }


}
