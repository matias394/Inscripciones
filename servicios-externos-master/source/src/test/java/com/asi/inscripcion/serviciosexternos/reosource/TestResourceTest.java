package com.asi.inscripcion.serviciosexternos.reosource;

import com.asi.inscripcion.dto.TokenDTO;
import com.asi.inscripcion.serviciosexternos.ConstantTest;
import com.asi.inscripcion.serviciosexternos.util.Url;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.MediaType;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.given;

@QuarkusTest
@Tag("Resource Login")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestResourceTest {

    TokenDTO tokenDTO;

    @BeforeEach
    public void init(){

        tokenDTO = given()
                .queryParam("cuil", ConstantTest.CUIL)
                .queryParam("password", ConstantTest.PASS_TRUE)
                .contentType(MediaType.APPLICATION_JSON)
                .when()
                .post(Url.API+Url.LOGIN)
                .then()
                .statusCode(200)
                .extract()
                .as(TokenDTO.class);
    }


    @Test
    @Order(1)
    public void getIsValidTest(){

        given()
            .header("Authorization",tokenDTO.token())
            .contentType(MediaType.APPLICATION_JSON)
        .when()
            .get(Url.API+Url.TEST)
        .then()
            .statusCode(200);

    }

    @Test
    @Order(1)
    public void getIsNotValidTest(){

        given()
                .header("Authorization","tokenf-faiure")
                .contentType(MediaType.APPLICATION_JSON)
                .when()
                .get(Url.API+Url.TEST)
                .then()
                .statusCode(403);

    }
}
