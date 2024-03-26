package com.asi.inscripcion.serviciosexternos.facede;

import com.asi.inscripcion.dto.BotiDTO;
import com.asi.inscripcion.dto.ParamsDTO;
import com.asi.inscripcion.serviciosexternos.facade.BotiFacade;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BotiFacadeTest {

    @Inject
    BotiFacade botiFacade;

    @Test
    void send(){
        BotiDTO botiDTO = new BotiDTO();
        botiDTO.setChatPlatform("Whatsapp");
        botiDTO.setChatChannelNumber("5491150500147");
        botiDTO.setPlatformContactId("5491131080475");
        botiDTO.setRuleNameOrId("sac08push03");
        botiDTO.setClientPayload("optional");
        ParamsDTO params = new ParamsDTO();
        params.setAuxiliar1("Juan");
        params.setAuxiliar2("Matemática");
        params.setAuxiliar3("01/01/2023");
        params.setAuxiliar3("Lun, Mar 10:00 - 12:00");
        params.setAuxiliar4("Palermo");
        params.setAuxiliar5("26900042");
        params.setAuxiliar6("1700");
        botiDTO.setParams(params);

        Response response = botiFacade.sendSMS(botiDTO);

        assertNotNull(response);
    }
}
