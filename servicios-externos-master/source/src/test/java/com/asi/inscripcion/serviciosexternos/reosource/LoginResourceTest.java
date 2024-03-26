package com.asi.inscripcion.serviciosexternos.reosource;


import com.asi.inscripcion.dto.TokenDTO;
import com.asi.inscripcion.serviciosexternos.ConstantTest;
import com.asi.inscripcion.serviciosexternos.util.Url;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
@Tag("Resource Login")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LoginResourceTest {

    protected final Logger logger = Logger.getLogger(getClass());



    @Test
    public void loginPostTest(){

        TokenDTO tokenDTO = given()
                .queryParam("cuil", ConstantTest.CUIL)
                .queryParam("password", ConstantTest.PASS_TRUE)
                .contentType(MediaType.APPLICATION_JSON)
                .when()
                .post(Url.API+Url.LOGIN)
                .then()
                .statusCode(200)
                .extract()
                .as(TokenDTO.class);


        logger.info(tokenDTO.toString());

        assertNotNull(tokenDTO);

    }


}
