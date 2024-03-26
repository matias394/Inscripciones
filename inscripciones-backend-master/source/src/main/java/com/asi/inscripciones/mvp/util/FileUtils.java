package com.asi.inscripciones.mvp.util;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.poifs.filesystem.FileMagic;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import com.asi.inscripciones.mvp.exception.GenericException;

import javax.validation.constraints.Null;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class FileUtils {

    /**
     *
     * Valida que el contenido del archivo se corresponda con su extensión
     *
     * @param multipartFile
     * @return
     */
    static public void validaMimeContentTypeFromMultiPartFile(MultipartFile multipartFile, @Null  List<String> validExtensions){
        if( validExtensions!= null)
            validateExtensionFile(multipartFile.getOriginalFilename(), validExtensions);

        if( extensionIsOffice(multipartFile)){
            validateMultiPartIsOffice(multipartFile);
        }
        else{
            detectContentByTika(multipartFile);
        }
    }

    private static void validateExtensionFile(String nameFile, List<String> validExtensions) {
        String extension = FilenameUtils.getExtension(nameFile).toLowerCase(Locale.ROOT);
        List <String> lowerExtensions = validExtensions.stream()
                .map( unaExtension ->  unaExtension.toString().toLowerCase(Locale.ROOT))
                .collect(Collectors.toList());

        if( !lowerExtensions.contains(extension) )
            throw new GenericException("La extension del archivo: '"+ nameFile+"' debe ser:"+ StringUtils.join(",",validExtensions));

    }


    private static boolean extensionIsOffice(MultipartFile multipartFile) {
        String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename()).toLowerCase(Locale.ROOT);
        return extension.equals("doc") || extension.equals("docx")
                || extension.equals("xls") || extension.equals("xlsx")
                || extension.equals("ppt") || extension.equals("pptx") || extension.equals("pps");
    }


    /**
     *
     * Detecta el contentype para una cantidad de archivos
     *      los xls los detecta como zip
     *
     * @param multipartFile
     * @return
     */
    private static void detectContentByTika(MultipartFile multipartFile){
        String contentType = multipartFile.getContentType();
        Tika tika = new Tika();
        try {
            String detectedType = tika.detect(multipartFile.getBytes());
            if( !detectedType.equals(contentType))
                throw new GenericException("Error File: El archivo:'"+multipartFile.getOriginalFilename()+"' tiene  el contenido de un archivo con formato:'"+detectedType+"'. El contenido debe ser:'"+FilenameUtils.getExtension(multipartFile.getOriginalFilename())+"'");
        } catch (IOException e) {
            e.printStackTrace();
            throw new GenericException("Error File: Error al detectar el tipo de archivo:'"+multipartFile.getName()+"'");
        }
    }


    private static void validateMultiPartIsOffice(MultipartFile multipartFile){
        FileMagic fileMagic;

        try (InputStream inputStream = FileMagic.prepareToCheckMagic( multipartFile.getInputStream() )) {
            fileMagic = FileMagic.valueOf(inputStream);
            if( fileMagic != FileMagic.OLE2 && fileMagic != FileMagic.OOXML)
                throw new GenericException("Error OfficeFile: El archivo:'"+multipartFile.getOriginalFilename()+"'  tiene  el contenido de un archivo con formato:'"+fileMagic+"'. El contenido debe ser:'"+FilenameUtils.getExtension(multipartFile.getOriginalFilename())+"'");
        } catch (IOException e)  {
            e.getMessage();
            throw new GenericException("Error OfficeFile: Error al detectar el tipo de archivo:'"+multipartFile.getOriginalFilename()+"'");
        }
    }

}
