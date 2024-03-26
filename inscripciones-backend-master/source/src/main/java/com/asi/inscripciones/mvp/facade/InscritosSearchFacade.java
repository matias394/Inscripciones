package com.asi.inscripciones.mvp.facade;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.dto.InscripcionFiltroDTO;
import com.asi.inscripciones.mvp.dto.InstanciaFiltroDTO;
import com.asi.inscripciones.mvp.dto.SedeFiltroDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.ElasticException;
import com.asi.inscripciones.mvp.repository.InscritosSearchRepository;
import com.asi.inscripciones.mvp.service.CitizenResponseService;
import com.asi.inscripciones.mvp.service.InstanciaSedeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Log4j2
@Service
public class InscritosSearchFacade {
    private static final String COMMA_DELIMITER = ",";
    @Autowired
    private ElasticsearchOperations esOps;
    @Autowired
    private InscritosSearchRepository elasticRepo;
    @Autowired
    private InstanciaSedeService instanciaSedeService;
    @Autowired
    private CitizenResponseService citizenResponseService;

    public void buildIndex(final Integer loteSize) throws ElasticException {
        log.info("Llega a la clase InscritosSearchFacade, al metodo buildIndex");
        try
        {
            validarCrearIndice();
            log.info("Antes del condicional elasticRepo.count()==0");
            if(elasticRepo.count()!=0){
                elasticRepo.deleteAll();
                log.info("Después del elasticRepo.deleteAll()");
            }
            log.info("Antes de invocar procesarDatosPorLotes");
            procesarDatosPorLotes(loteSize);
            log.info("Después del procesarDatosPorLotes - loteSize: " + loteSize);
        }catch (Exception e){
            e.printStackTrace();
            throw new ElasticException(e.getMessage());
        }
        log.info("Sale de la clase InscritosSearchFacade, del metodo buildIndex");
    }

    public void agregarInscripto(final Long inscripcionId, final String cuil) throws ElasticException {
        log.info("Llega a la clase InscritosSearchFacade, al metodo agregarInscripto");
        try
        {
            validarCrearIndice();
            // Busca el inscripto a migrar o agregar en el elastic
            List<CitizenResponse> inscriptoList = citizenResponseService.getCitizenResponseByInscripcionIdAndCuil(inscripcionId, cuil);
            if (inscriptoList.size()<= 0){
                throw new ElasticException("No existe un registro con los datos indicados");
            }else if (inscriptoList.size()>1){
                throw new ElasticException("Existen " + inscriptoList.size() + " registros con los datos indicados");
            }
            //Valida que el inscripto a agregar no existe en elastic
            List<InscritosSearch> inscriptosEnElastic = elasticRepo.findByCuilAndInscripcionId(cuil, inscripcionId);
            log.info("Se encontraron - inscriptosEnElastic.size(): " + inscriptosEnElastic.size());
            if (inscriptosEnElastic.size()<=0){
                //Sino existe lo agrega
                Collection<InscritosSearch> elasticSearch = prepareDataset(inscriptoList);
                elasticRepo.saveAll(elasticSearch);
            }else{
                //Si existe envia mensaje de que existe
                throw new ElasticException(String.format("El inscripto con los datos indicados (cuil: %s, inscripcionId: %d) ya existe en Elastic", cuil, inscripcionId));
            }

        }catch (Exception e){
            e.printStackTrace();
            throw new ElasticException(e.getMessage());
        }
        log.info("Sale de la clase InscritosSearchFacade, del metodo agregarInscripto");
    }

    public void agregarInscriptosByInscripcionId(final Long inscripcionId) throws ElasticException {
        log.info("Llega a la clase InscritosSearchFacade, al metodo agregarInscriptosByInscripcionId");
        try
        {
            validarCrearIndice();
            // Busca los inscriptos asociados a la inscripcionId en mongo
            List<CitizenResponse> inscriptosEnMongo = citizenResponseService.getCitizenResponseByInscripcionId(inscripcionId);
            log.info("Se encontraron - inscriptosEnMongo.size(): " + inscriptosEnMongo.size());
            // Busca los inscriptos asociados a la inscripcionId en elastic
            List<InscritosSearch> inscriptosEnElastic = elasticRepo.findByInscripcionId(inscripcionId);
            log.info("Se encontraron - inscriptosEnElastic.size(): " + inscriptosEnElastic.size());
            // Borra los inscriptos en la inscripcion indicada que existen en elastic
            elasticRepo.deleteAll(inscriptosEnElastic);
            // Agregar los inscriptos obtenidos desde mongo
            Collection<InscritosSearch> elasticSearch = prepareDataset(inscriptosEnMongo);
            elasticRepo.saveAll(elasticSearch);

        }catch (Exception e){
            e.printStackTrace();
            throw new ElasticException(e.getMessage());
        }
        log.info("Sale de la clase InscritosSearchFacade, del metodo agregarInscripto");
    }

    private void validarCrearIndice() {
        if(!esOps.indexOps(InscritosSearch.class).exists()){
            esOps.indexOps(InscritosSearch.class).create();
        }
        esOps.indexOps(InscritosSearch.class).refresh();
    }

    public void procesarDatosPorLotes(Integer tamanoLote) {
        log.info("Llega al metodo procesarDatosPorLotes");
        int pagina = 0;

        Page<CitizenResponse> resultado;

        do {
            log.info("pagina: " + pagina);
            PageRequest pageRequest = PageRequest.of(pagina, tamanoLote, Sort.by("id"));
            resultado = citizenResponseService.findAll(pageRequest);

            Collection<InscritosSearch> elasticSearch = prepareDataset(resultado.getContent());
            elasticRepo.saveAll(elasticSearch);

            pagina++;
        } while (resultado.hasNext());

        log.info("Sale del metodo procesarDatosPorLotes");
    }

    private Collection<InscritosSearch> prepareDataset(List<CitizenResponse> loteCitizenResponses) {
        log.info("Entrando en prepareDataset() - loteCitizenResponses.size(): " + loteCitizenResponses.size());
        List<InscritosSearch> productList = new ArrayList<InscritosSearch>();
        ObjectMapper objectMapper = new ObjectMapper();
        AtomicInteger objetosNull = new AtomicInteger();
        loteCitizenResponses.parallelStream().forEach(data->{
            InscritosSearch elasticSearchReturn = InscritosSearch.builder()
                    .respuestaIdRefMongo(data.getId())
                    .cuil(data.getCuil())
                    .nombre(data.getNombre())
                    .apellido(data.getApellido())
                    .email(data.getEmail())
                    .formularioIdRefMongo(data.getFormularioId())
                    .synchronizedToOracle(data.getSynchronizedToOracle())
                    .deleted(data.getDeleted())
                    .estado(data.getEstado())
                    .createdAt(data.getCreatedAt())
                    .build();

            try {
                elasticSearchReturn.setRespuesta(objectMapper.writeValueAsString(data.getRespuesta()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            InscritosSearch parseElastic = objectInElastic(data.getInstanciaSedeId(),elasticSearchReturn);
            if(parseElastic!=null){
                productList.add(parseElastic);
            }else{
                objetosNull.getAndIncrement();
                log.info("El resultado de objectInElastic es NULL con data.getInstanciaSedeId(),elasticSearchReturn: ", data.getInstanciaSedeId(),elasticSearchReturn);
            }

        });
        log.info("Saliendo de prepareDataset() - objetosNull: " + objetosNull);
        log.info("Saliendo de prepareDataset() - productList.size(): " + productList.size());
        return productList;
    }

    private InscritosSearch objectInElastic(Long instanciaSedeId, InscritosSearch elasticSearchReturn ){
        log.info("Entra en objectInElastic con instanciaSedeId y elasticSearchReturn ", instanciaSedeId, elasticSearchReturn);

        InstanciaSede instanciaSede = instanciaSedeService.getByIdInstanciaSede(instanciaSedeId);
        log.info("Obtiene la instanciaSede ", instanciaSede);

        if (instanciaSede == null) {return null;}

        Instancia instancia = instanciaSede.getInstancia();
        Inscripcion inscripcion = instancia.getInscripcion();

        InscripcionFiltroDTO inscripcionFiltroDTO = InscripcionFiltroDTO.builder()
                .id(inscripcion.getId())
                .nombre(inscripcion.getNombre())
                .estado(inscripcion.getEstado()).build();

        elasticSearchReturn.setInscripcion(inscripcionFiltroDTO);

        InstanciaFiltroDTO instanciaFiltroDTO = InstanciaFiltroDTO.builder()
                .id(instancia.getId())
                .nombre(instancia.getNombre())
                .estado(instancia.getEstado())
                .fechaInicio(instancia.getFechaInicio().toString())
                .fechaFin(instancia.getFechaFin().toString()).build();

        elasticSearchReturn.setInstancia(instanciaFiltroDTO);

        Sede sede = instanciaSede.getSede();
        SedeFiltroDTO sedeFiltroDTO = SedeFiltroDTO.builder()
                .id(sede.getId())
                .nombre(sede.getNombre())
                .bloqueado(sede.getBloqueado()).build();

        elasticSearchReturn.setSede(sedeFiltroDTO);

        OrganismoCategoria organismoCategoria = inscripcion.getOrganismoCategoria();
        elasticSearchReturn.setId_categoria(organismoCategoria.getCategoria().getId());
        elasticSearchReturn.setNombre_categoria(organismoCategoria.getCategoria().getNombre());

        elasticSearchReturn.setId_organismo(organismoCategoria.getOrganismo().getId());
        elasticSearchReturn.setNombre_organismo(organismoCategoria.getOrganismo().getNombre());

        log.info("Sale de objectInElastic - elasticSearchReturn ", elasticSearchReturn);
        return elasticSearchReturn;
    }
}
