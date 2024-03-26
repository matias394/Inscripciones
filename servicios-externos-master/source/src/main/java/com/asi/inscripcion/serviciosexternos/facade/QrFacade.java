package com.asi.inscripcion.serviciosexternos.facade;

import com.asi.inscripcion.serviciosexternos.service.InstanciaSedeService;
import com.asi.inscripcion.serviciosexternos.service.QrService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;
import com.asi.inscripcion.dto.UserAssistanceDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.glxn.qrgen.javase.QRCode;
import com.asi.inscripcion.entity.RepositorioQR;


import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.io.*;
import java.nio.file.Files;


@ApplicationScoped
public class QrFacade {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    QrService qrService;

    @Inject
    InstanciaSedeService instanciaSedeService;

    @Inject
    @ConfigProperty(name = "directory.web")
    String directorioWeb;

    @Inject
    @ConfigProperty(name = "frontend.url")
    String appRoute;


    public String generateQR(UserAssistanceDTO info) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(info);
        byte[] qrCodeBytes = QRCode.from(json).stream().toByteArray();


        String fileName = info.getName() + info.getLastName() + info.getCuil() + info.getInstanciaSedeId();
        String qrHash = generateSHA256Hash(fileName);

        String ruta = saveQrToServer(qrCodeBytes, qrHash);
        saveQrToBD(info, qrCodeBytes, qrHash, ruta);

        return ruta;
    }

    public String generateSHA256Hash(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString()+".png";
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveQrToBD(UserAssistanceDTO info, byte[] archivo, String fileName, String ruta){

        try {
            logger.info("Guardando QR en BD");
            logger.info("InstanciaSedeId: " + info.getInstanciaSedeId());
            instanciaSedeService.findByInstanciaSedeId(info.getInstanciaSedeId())
                    .onItem().transform(instanciaSede -> {
                        logger.info("InstanciaSede: " + instanciaSede.toString());
                        RepositorioQR repositorioQR = new RepositorioQR();
                        repositorioQR.setCuil(info.getCuil());
                        repositorioQR.setNombre_qr(fileName);
                        repositorioQR.setUrl_qr(ruta);
                        repositorioQR.setVencimiento(instanciaSede.getInstancia().getFechaFin());
                        repositorioQR.setInstanciaSede(instanciaSede);
                        repositorioQR.setInscripcion(instanciaSede.getInstancia().getInscripcion());
                        repositorioQR.setBase64(archivo);
                        repositorioQR.setEstado(1);

                        qrService.saveQrToDB(repositorioQR);
                        return true;
                    })
                    .subscribe().with(
                            item -> { /* Success handling, if needed */ },
                            failure -> {
                                logger.info("Error in reactive chain: " + failure.getMessage());
                                failure.printStackTrace();
                            }
                    );

        } catch (Exception e) {
            logger.info("Error al guardar QR en BD");
            e.printStackTrace();
        }

    }

    public String saveQrToServer(byte[] archivo, String fileName) throws IOException {
        // Ensure directory exists
        Files.createDirectories(Paths.get(directorioWeb));

        // Define the full path for the file
        String fullPath = directorioWeb.trim() + fileName.trim();

        // Write the byte array directly to file
        try (FileOutputStream fos = new FileOutputStream(fullPath)) {
            fos.write(archivo);
        } catch (IOException e) {
            e.printStackTrace(); // Consider proper logging
            throw e; // Re-throw to signal failure
        }

        // Return the path or URL where the file can be accessed
        return appRoute + "imagenes/qr/" + fileName.trim();
    }


}
