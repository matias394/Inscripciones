package com.asi.inscripcion.serviciosexternos.service;

import com.asi.inscripcion.dto.AmazonGetFileDTO;
import com.asi.inscripcion.dto.AmazonSaveFileDTO;
import com.asi.inscripcion.entity.Inscripcion;
import com.asi.inscripcion.entity.InstanciaSede;
import com.asi.inscripcion.entity.RepositorioArchivo;
import com.asi.inscripcion.serviciosexternos.repository.RepositorioArchivoRepository;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import java.time.LocalDate;
import java.util.Optional;

@ApplicationScoped
public class RepositorioArchivoService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    RepositorioArchivoRepository repositorioArchivoRepository;

    @Transactional
    @Blocking
    public Uni<RepositorioArchivo> save(Inscripcion inscripcion, InstanciaSede instanciaSede, AmazonSaveFileDTO amazonSaveFileDTO, String fileNameAmazon){
        LocalDate today = LocalDate.now();
        RepositorioArchivo repositorioArchivo = new RepositorioArchivo();
        repositorioArchivo.setNombre(fileNameAmazon);
        repositorioArchivo.setCuil(amazonSaveFileDTO.getCuil());
        repositorioArchivo.setDescripcion("Descripción");
        repositorioArchivo.setMetadata(amazonSaveFileDTO.getFileName());
        repositorioArchivo.setInscripcion(inscripcion);
        repositorioArchivo.setInstancia(instanciaSede);
        repositorioArchivo.setEstado(1);
        repositorioArchivo.setModificadoPor("admin");
        repositorioArchivo.setModificado(today);
        repositorioArchivo.setCreado(today);
        repositorioArchivo.setCreadoPor("admin");
        repositorioArchivoRepository.persistAndFlush(repositorioArchivo);
        return Uni.createFrom().item(repositorioArchivo);
    }

    @Transactional
    @Blocking
    public Uni<RepositorioArchivo> update(Long id, String fileNameAmazon) {
        return repositorioArchivoRepository.findRepositorioArchivoById(id)
            .onItem().transformToUni(repositorioArchivo -> {
                if (repositorioArchivo != null) {
                    repositorioArchivo.setNombre(fileNameAmazon);
                    repositorioArchivoRepository.persistAndFlush(repositorioArchivo);
                    return Uni.createFrom().item(repositorioArchivo);
                } else {
                    return Uni.createFrom().nullItem();
                }
            })
            .onFailure().recoverWithUni(failure -> {
                return Uni.createFrom().failure(failure);
            });
    }

    public String searchFile(AmazonGetFileDTO amazonGetFileDto){
        Optional<RepositorioArchivo> repositorioArchivoOptional  = repositorioArchivoRepository.findRepositorioArchivoByCuilInscripcionInstancia(amazonGetFileDto.getCuil(), amazonGetFileDto.getInscripcion(), amazonGetFileDto.getInstancia());
        if(repositorioArchivoOptional .isPresent()){
            RepositorioArchivo repositorioArchivo = repositorioArchivoOptional.get();
            return repositorioArchivo.getNombre();
        }else{
            return "";
        }
    }
}
