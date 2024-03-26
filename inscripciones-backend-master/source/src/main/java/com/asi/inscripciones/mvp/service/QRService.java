package com.asi.inscripciones.mvp.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.asi.inscripciones.mvp.dto.UserAssistanceDTO;
import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.entity.RepositorioQR;
import com.asi.inscripciones.mvp.repository.InstanciaSedeRepository;
import com.asi.inscripciones.mvp.repository.RepositorioQRRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.glxn.qrgen.javase.QRCode;

@Service
public class QRService {

    @Value("${directory.web}")
    private String directorioWeb;

    @Value("${cors.url}")
    private String appRoute;

    @Autowired
    private RepositorioQRRepository repositorioQRRepository;

    @Autowired
    private InstanciaSedeRepository instanciaSedeRepository;

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

        public String saveQrToServer(byte[] archivo, String fileName) throws IOException{
            String base64 = Base64.getEncoder().encodeToString(archivo);
            MultipartFile file = convertBase64ToMultipartFile(base64, fileName);
            try {

                File uploadDirFile = new File(directorioWeb.trim());
                if (!uploadDirFile.exists()) {
                    uploadDirFile.mkdirs(); 
                }

                File destFile = new File(directorioWeb.trim() + fileName.trim());
                file.transferTo(destFile);

            } catch (IOException e) {
                e.printStackTrace();
            }
            return appRoute + "imagenes/qr/" + fileName.trim();
        }

        public void saveQrToBD(UserAssistanceDTO info, byte[] archivo, String fileName, String ruta){
            InstanciaSede instanciaSede = instanciaSedeRepository.findByIdInstanciaSede(info.getInstanciaSedeId());

            RepositorioQR repositorioQR = new RepositorioQR();
            repositorioQR.setCuil(info.getCuil());
            repositorioQR.setNombre_qr(fileName);
            repositorioQR.setUrl_qr(ruta);
            repositorioQR.setVencimiento(instanciaSede.getInstancia().getFechaFin());
            repositorioQR.setInstancia_sede_id(instanciaSede);
            repositorioQR.setInscripcion_id(instanciaSede.getInstancia().getInscripcion());
            repositorioQR.setBase64(archivo);
            repositorioQR.setEstado(1);
            repositorioQRRepository.save(repositorioQR);
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

        public MultipartFile convertBase64ToMultipartFile(String base64String, String nombreArchivo) throws IOException {
            byte[] bytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64String);
            InputStream inputStream = new ByteArrayInputStream(bytes);
            DiskFileItem fileItem = new DiskFileItem(nombreArchivo, "image/png", false, nombreArchivo, bytes.length, null);
            try {
                IOUtils.copy(inputStream, fileItem.getOutputStream());
            } finally {
                inputStream.close();
            }
            MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
            return multipartFile;
        }

        @Scheduled(cron = "0 0 0 * * ?")
        public void qrSync(){
            LocalDate today = LocalDate.now();
            List<RepositorioQR> repositorioQRList = repositorioQRRepository.getAll();
            for(RepositorioQR repositorioQR : repositorioQRList){
                if(today.isAfter(repositorioQR.getVencimiento())){
                    repositorioQR.setEstado(0);
                    repositorioQRRepository.save(repositorioQR);
                    /* Proceso de eliminar */
                    File imagen = new File(directorioWeb+repositorioQR.getNombre_qr());
                    if (imagen.exists()) {
                        imagen.delete();
                    }
                }
            }
        }
    }
