package com.asi.inscripcion.serviciosexternos.facede;

import com.asi.inscripcion.dto.TokenDTO;
import com.asi.inscripcion.serviciosexternos.ConstantTest;
import com.asi.inscripcion.serviciosexternos.facade.UserFacade;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
@Tag("")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserFacadeTest {

    @Inject
    UserFacade userFacade;


    @Test
    public void getTokenUserTest(){
        TokenDTO tokenDTO = userFacade.getTokenUser(
                ConstantTest.CUIL,
                ConstantTest.PASS_TRUE);

        assertNotNull(tokenDTO);
    }

}
