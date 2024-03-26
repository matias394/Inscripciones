package com.asi.inscripcion.serviciosexternos.resource;

import com.asi.inscripcion.dto.AmazonGetFileDTO;
import com.asi.inscripcion.dto.FileResponseDTO;
import com.asi.inscripcion.serviciosexternos.facade.AmazonS3Facade;
import com.asi.inscripcion.serviciosexternos.util.Url;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
@Authenticated
@Path(Url.API + Url.AMAZON_S3)
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AmazonS3Resource {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    AmazonS3Facade amazonS3Facade;


    @POST
    @Path("/getFile")
    public Response getAmazonFile(AmazonGetFileDTO amazonFileInfo) throws IOException {

        logger.info("======== getAmazonFile ========");

        FileResponseDTO fileResponseDTO = amazonS3Facade.getFromAmazonS3(amazonFileInfo);
        return Response.ok(fileResponseDTO).build();
    }

}

