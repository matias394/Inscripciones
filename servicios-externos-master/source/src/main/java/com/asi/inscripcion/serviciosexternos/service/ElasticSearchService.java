package com.asi.inscripcion.serviciosexternos.service;


import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexRequest;
import com.asi.inscripcion.dto.ElasticSearchDTO;
import com.asi.inscripcion.dto.InscripcionElasticDTO;
import com.asi.inscripcion.dto.InstanciaElasticDTO;
import com.asi.inscripcion.dto.SedeElasticDTO;
import com.asi.inscripcion.dto.document.CitizenResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.io.IOException;

@ApplicationScoped
public class ElasticSearchService {

    protected final Logger logger = Logger.getLogger(getClass());

    @Inject
    ElasticsearchClient client;

    @Inject
    InstanciaService instanciaService;

    @Inject
    InscripcionService inscripcionService;

    @Inject
    InstanciaSedeService instanciaSedeService;

    @Inject
    OrganismoCategoriaService organismoCategoriaService;


    @Inject
    @ConfigProperty(name="indice.reportes.inscriptos")
    String indice;



    public void save(CitizenResponseDTO dto){

        logger.info("==== save dto ElasticSearch ====");
        logger.info("DATA="+dto);

        try {

            Object[] instancia = instanciaService.getInstanciaById1(dto.getInstanciaId());
            Object[] inscripcion = inscripcionService.findInscripcionById1(dto.getInscripcionId());
            Object[] sede = instanciaSedeService.findByInstanciaSedeId1(dto.getInstanciaSedeId());
            Object[] organismoCategoria = organismoCategoriaService.findByIdGetObject(Long.valueOf(inscripcion[3].toString()));


            ElasticSearchDTO dataElastic = getData(dto,instancia,inscripcion,sede,organismoCategoria);

            IndexRequest<ElasticSearchDTO> request = IndexRequest.of(
                    item->item
                            .index(indice)
                            .document(dataElastic));

            client.index(request);

        } catch (IOException e) {
            logger.error("ERROR="+e);
        }

    }



    public ElasticSearchDTO getData(CitizenResponseDTO dto, Object[] instancia, Object[] inscripcion,  Object[] sede, Object[] organismoCategoria) throws JsonProcessingException, NumberFormatException{

        ObjectMapper objectMapper = new ObjectMapper();

        InscripcionElasticDTO inscripcionElastic = InscripcionElasticDTO.builder()
                .id(dto.getInscripcionId())
                .nombre(inscripcion[1].toString())
                .estado(Integer.valueOf(inscripcion[2].toString()))
                .build();

        InstanciaElasticDTO instanciaElastic = InstanciaElasticDTO.builder()
                .id(Long.valueOf(instancia[0].toString()))
                .nombre(instancia[1].toString())
                .estado(Integer.valueOf(instancia[2].toString()))
                .fechaInicio(instancia[3].toString())
                .fechaFin(instancia[4].toString())
                .build();

        SedeElasticDTO sedeElasticDTO = SedeElasticDTO.builder()
                .id(Long.valueOf(sede[0].toString()))
                .nombre(sede[1].toString())
                .bloqueado(Integer.valueOf(sede[2].toString()))
                .build();

        return ElasticSearchDTO.builder()
                    .respuestaIdRefMongo(dto.getIdMongo())
                    .cuil(dto.getCuil())
                    .nombre(dto.getNombre())
                    .apellido(dto.getApellido())
                    .email(dto.getEmail())
                    .inscripcion(inscripcionElastic)
                    .instancia(instanciaElastic)
                    .sede(sedeElasticDTO)
                    .formularioIdRefMongo(dto.getFormularioId())
                    .respuesta(objectMapper.writeValueAsString(dto.getRespuesta()))
                    .synchronizedToOracle(dto.getSynchronizedToOracle())
                    .deleted(dto.getEstado())
                    .estado(dto.getEstado())
                    .createdAt(dto.getCreatedAt())
                    .id_categoria(Long.valueOf(organismoCategoria[0].toString()))
                    .nombre_categoria(organismoCategoria[1].toString())
                    .id_organismo(Long.valueOf(organismoCategoria[2].toString()))
                    .nombre_organismo(organismoCategoria[3].toString())
                    .build();
        }
}
