package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.ClaseDTO;
import com.asi.inscripciones.mvp.dto.FechaDiasDTO;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponseDetalleDTO;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import com.asi.inscripciones.mvp.dto.InscripcionConsultaDTO;
import com.asi.inscripciones.mvp.dto.InscriptionFilterInfo;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.repository.CitizenResponseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import javax.persistence.EntityNotFoundException;

import java.util.stream.Collectors;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Log4j2
@Service
@RequiredArgsConstructor
public class CitizenResponseService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    private final CitizenResponseRepository responseRepository;

    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private InstanciaService instanciaService;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    @Autowired
    private ClaseService claseService;

    @Autowired
    final private ClaseProfesorService claseProfesorService;

    @Autowired
    final private FormularioInscripcionService formularioInscripcionService;


    public List<CitizenResponse> getAll() {
        List<CitizenResponse> responses = responseRepository.findAll();
        return responses;
    }

    public List<CitizenResponse> getCitizenResponseByInscripcionIdAndCuil(final Long inscripcionId, final String cuil) {
        Query query = new Query();
        query.addCriteria(Criteria.where("inscripcionId").is(inscripcionId).and("cuil").is(cuil));
        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);
        return responses;
    }

    public List<CitizenResponse> getCitizenResponseBy(final Long inscripcionId, final String cuil) {
        Query query = new Query();
        query.addCriteria(Criteria.where("inscripcionId").is(inscripcionId).and("cuil").is(cuil));
        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);
        return responses;
    }

    public List<CitizenResponse> getCitizenResponseByInscripcionId(final Long inscripcionId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("inscripcionId").is(inscripcionId));
        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);
        return responses;
    }

    public List<CitizenResponse> getUnsynchronizedResponsesByInscripcionId(Long inscripcionId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("synchronizedToOracle").is(false).and("inscripcionId").is(inscripcionId).and("deleted").is(false));
        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);
        return responses;
    }

    public List<CitizenResponse> getUnsynchronizedResponsesByNothing() {
        Query query = new Query();
        query.addCriteria(Criteria.where("synchronizedToOracle").is(false).and("deleted").is(false));
        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);
        return responses;
    }

    public Page<CitizenResponse> getUnsynchronizedResponses(PageRequest pagination) {
        Query query = new Query();
        query.addCriteria(Criteria.where("synchronizedToOracle").is(false).and("deleted").is(false));
        long totalCount = mongoTemplate.count(query, CitizenResponse.class);
        query.with(pagination);
        List<CitizenResponse> resultList = mongoTemplate.find(query, CitizenResponse.class);
        return new PageImpl<>(resultList, pagination, totalCount);
    }

    public List<CitizenResponse> getUnsynchronizedResponsesByLimit(Integer size) {
        Query query = new Query();
        query.addCriteria(Criteria.where("synchronizedToOracle").is(false).and("deleted").is(false));
        query.limit(size);
        List<CitizenResponse> resultList = mongoTemplate.find(query, CitizenResponse.class);
        return resultList;
    }

    public Page<CitizenResponse> getUnsynchronizedResponsesByPageWithInscripcionId(Long inscripcionId, PageRequest pagination) {
        Query query = new Query();
        query.addCriteria(Criteria.where("synchronizedToOracle").is(false).and("inscripcionId").is(inscripcionId).and("deleted").is(false));
        long totalCount = mongoTemplate.count(query, CitizenResponse.class);
        query.with(pagination);

        List<CitizenResponse> resultList = mongoTemplate.find(query, CitizenResponse.class);

        return new PageImpl<>(resultList, pagination, totalCount);
    }

    public CitizenResponse edit(String id, CitizenResponse response) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));

        Document doc = new Document(); // org.bson.Document
        mongoTemplate.getConverter().write(response, doc);
        Update update = Update.fromDocument(doc);

        mongoTemplate.updateFirst(query, update, CitizenResponse.class );
        return response;
    }

    public ContadorCupo getContadorCupoByInstanciaId(Long instanciaId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("instanciaId").is(instanciaId));

        ContadorCupo cupo = mongoTemplate.findOne(query, ContadorCupo.class);
        return cupo;
    }

    public ContadorCupo editContadorCupo (String id, ContadorCupo contadorCupo) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));

        Document doc = new Document(); // org.bson.Document
        mongoTemplate.getConverter().write(contadorCupo, doc);
        Update update = Update.fromDocument(doc);

        mongoTemplate.updateFirst(query, update, ContadorCupo.class );
        return contadorCupo;
    }


    public Page<InscriptionFilterInfo> getCitizens(String name, String lastname, String cuil, Pageable pageable) {
        Query query = new Query();

        List<Criteria> criteriaList = new ArrayList<>();
        List<InscriptionFilterInfo> inscriptionFilterInfos = new ArrayList<>();

//        criteriaList.add(Criteria.where("deleted").is(false));

        if (name != null && !name.trim().isEmpty()) {
            criteriaList.add(Criteria.where("nombre").regex(name, "i"));
            query.addCriteria(Criteria.where("nombre").regex(name, "i"));
        }
        if (lastname != null && !lastname.isEmpty()) {
            criteriaList.add(Criteria.where("apellido").regex(lastname, "i"));
            query.addCriteria(Criteria.where("apellido").regex(name, "i"));
        }
        if (cuil != null && !cuil.isEmpty()) {
            criteriaList.add(Criteria.where("cuil").regex(cuil, "i"));
            query.addCriteria(Criteria.where("cuil").regex(name, "i"));
        }

        // Combine all the criteria together
        Criteria combinedCriteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));

        // Create the aggregation pipeline using the criteria.
        Aggregation agg = Aggregation.newAggregation(
                Aggregation.match(combinedCriteria), // Use the combined criteria.
                Aggregation.group("cuil", "email") // Group by cuil and email.
                        .first("_id").as("id")
                        .first("nombre").as("nombre")
                        .first("apellido").as("apellido")
                        .first("cuil").as("cuil")
                        .first("email").as("email")
                        .first("instanciaId").as("instanciaId")
                        .first("instanciaSedeId").as("instanciaSedeId")
                        .first("inscripcionId").as("inscripcionId"),

                // Projecting a new field structure to "flatten" the _id field.
                Aggregation.project()
                        .and("_id.id").as("id")
                        .and("_id.cuil").as("cuil")
                        .and("_id.email").as("email")
                        .and("nombre").as("nombre")
                        .and("apellido").as("apellido")
                        .and("instanciaId").as("instanciaId")
                        .and("instanciaSedeId").as("instanciaSedeId")
                        .and("inscripcionId").as("inscripcionId"),

                Aggregation.sort(pageable.getSort()), // Sorting.
                Aggregation.skip(pageable.getOffset()), // Pagination.
                Aggregation.limit(pageable.getPageSize())
        );

        // Perform the aggregation to get unique citizens.
        AggregationResults<CitizenResponse> aggResults = mongoTemplate.aggregate(agg, CitizenResponse.class, CitizenResponse.class);
        List<CitizenResponse> uniqueCitizens = aggResults.getMappedResults();

        Aggregation countAgg = Aggregation.newAggregation(
                Aggregation.match(combinedCriteria),
                Aggregation.group("cuil", "email")
        );

        AggregationResults<CitizenResponse> countResults = mongoTemplate.aggregate(countAgg, CitizenResponse.class, CitizenResponse.class);
        long total = countResults.getMappedResults().size();

        for(CitizenResponse response : uniqueCitizens){

            try {
                InstanciaSede instanciaSedeInfo = instanciaSedeService.getByID(response.getInstanciaSedeId());

                Inscripcion inscripcion = new Inscripcion();
                InscriptionFilterInfo inscriptionFilterInfo = new InscriptionFilterInfo();
                inscriptionFilterInfo.setNombre(response.getNombre());
                inscriptionFilterInfo.setApellido(response.getApellido());
                inscriptionFilterInfo.setCuil(response.getCuil());
                inscriptionFilterInfo.setEmail(response.getEmail());
                inscriptionFilterInfo.setInstanciaId(instanciaSedeInfo.getInstancia().getId());
                inscriptionFilterInfo.setInscriptionId(instanciaSedeInfo.getInstancia().getInscripcion().getId());
                inscripcion = inscripcionService.getInscripcionById1(instanciaSedeInfo.getInstancia().getInscripcion().getId() );
                inscriptionFilterInfo.setNombreInscripcion(inscripcion.getNombre());
                inscriptionFilterInfos.add(inscriptionFilterInfo);

            } catch (EntityNotFoundException e) {
                e.printStackTrace();
                continue;
            }
        }

        return new PageImpl<>(inscriptionFilterInfos, pageable, total);
    }


    public CitizenResponseDetalleDTO getInscripcionDetail(String citizenResponseId) {

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(citizenResponseId));
        CitizenResponse response = mongoTemplate.findOne(query, CitizenResponse.class);

        InstanciaSede instanciaSede = instanciaSedeService.getByID(response.getInstanciaSedeId());
        List<Clase> clases = instanciaSede.getClase();
        List<ClaseDTO> claseDTOList = new ArrayList<>();

        for (Clase clase : clases) {
            ClaseDTO claseDto = claseService.convertToClaseDTO(clase);
            claseDTOList.add(claseDto);
        }

        CitizenResponseDetalleDTO citizenDTO = new CitizenResponseDetalleDTO();

        // InstanciaSede instanciaSede = instanciaSedeList.get(0);
        Clase clase = clases.get(0);

        citizenDTO.setId(response.getId());
        citizenDTO.setRespuesta(response.getRespuesta());

        String Profesor = "Sin Profesor";

        if (clase.getClaseProfesor() == null) {
            Profesor = clase.getClaseProfesor().get(0).getUsuario().getNombre()+" "+clase.getClaseProfesor().get(0).getUsuario().getApellido();
        }

        FormularioInscripcion formInscripcion = getFormularioInscripcionById(instanciaSede.getInstancia().getInscripcion().getId());

        FormularioMongoDTO formData = new FormularioMongoDTO();
        if (formInscripcion.getFormulario() != null) {
            formData = getFormByMongoID(formInscripcion.getFormulario().getIdRefMongo());
        }

        citizenDTO.setInstanciaSedeId(instanciaSede.getId());
        citizenDTO.setInstanciaId(instanciaSede.getInstancia().getId());
        citizenDTO.setInscripcionId(response.getInscripcionId());
        citizenDTO.setLunes(instanciaSede.getLunes());
        citizenDTO.setMartes(instanciaSede.getMartes());
        citizenDTO.setMiercoles(instanciaSede.getMiercoles());
        citizenDTO.setJueves(instanciaSede.getJueves());
        citizenDTO.setViernes(instanciaSede.getViernes());
        citizenDTO.setSabado(instanciaSede.getSabado());
        citizenDTO.setDomingo(instanciaSede.getDomingo());
        citizenDTO.setSede(instanciaSede.getSede().getNombre());
        citizenDTO.setCupos(instanciaSede.getCupos());
        citizenDTO.setHoraInicio(instanciaSede.getHoraInicio());
        citizenDTO.setHoraFin(instanciaSede.getHoraFin());
        citizenDTO.setFormData(formData);
        citizenDTO.setProfesor(Profesor);
        citizenDTO.setHorarios(multiScheduleFechaDias(claseDTOList));
        citizenDTO.setNombreInscripcion(instanciaSede.getInstancia().getInscripcion().getNombre());

        return citizenDTO;
    }

    public List<FechaDiasDTO> multiScheduleFechaDias(List<ClaseDTO> claseList) {
        Map<String, Set<String>> hourToDaysMap = new HashMap<>();
        List<FechaDiasDTO> fechaDiasDTOList = new ArrayList<>();
        Map<String, Integer> dayToNumber = new HashMap<>();
        dayToNumber.put("Lunes", 1);
        dayToNumber.put("Martes", 2);
        dayToNumber.put("Miercoles", 3);
        dayToNumber.put("Jueves", 4);
        dayToNumber.put("Viernes", 5);
        dayToNumber.put("Sabado", 6);
        dayToNumber.put("Domingo", 7);

        for (ClaseDTO clase : claseList) {
            String hourRange = clase.getHoraInicio() + " a " + clase.getHoraFin();
            hourToDaysMap
                    .computeIfAbsent(hourRange, key -> new HashSet<>())
                    .add(clase.getDia());
        }

        for (Map.Entry<String, Set<String>> entry : hourToDaysMap.entrySet()) {
            String hourRange = entry.getKey();
            Set<String> days = entry.getValue();

            List<String> sortedDays = new ArrayList<>(days);
            sortedDays.sort(Comparator.comparingInt(dayToNumber::get));

            String dayStr = String.join(" - ", sortedDays);

            FechaDiasDTO fechaDiasDTO = new FechaDiasDTO();
            fechaDiasDTO.setDias(dayStr);
            fechaDiasDTO.setHorario(hourRange);
            fechaDiasDTOList.add(fechaDiasDTO);
        }
        return fechaDiasDTOList;
    }

    public FormularioMongoDTO getFormByMongoID(String id) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query,FormularioMongoDTO.class);
    }

    public FormularioInscripcion getFormularioInscripcionById(final Long inscripcionId){
        FormularioInscripcion formularioInscripcion = formularioInscripcionService.getFormularioInscripcionByIdInscripcionOne(inscripcionId);
        return formularioInscripcion;
    }

    public List<ClaseProfesor> getClaseProfesorByClaseId(final Long claseSedeId){
        List<ClaseProfesor> claseProfesor = claseProfesorService.getByClaseId(claseSedeId);
        return claseProfesor;
    }

    public CitizenResponse getByCuilAndIdInstancia(String cuil, Long InstanciaId){
        return responseRepository.findByCuilAndInstanciaIdAndDeleted(cuil, InstanciaId, false);
    }

    public List<CitizenResponse> getByCuilAndIdInscripcion(String cuil, Long InscripcionId){
        return responseRepository.findByCuilAndInscripcionIdAndDeleted(cuil, InscripcionId, false);
    }

    public Page<InscripcionConsultaDTO> getInscripcionesByCuil (String cuil, String filter, Pageable pageable) {

        Query query = new Query();
        query.addCriteria(Criteria.where("cuil").is(cuil));

        if (filter != null && !filter.trim().isEmpty()) {
            List<Inscripcion> inscripciones = inscripcionService.findByNameLike(filter);

            // Collect all the IDs from the inscripciones list
            List<Long> inscripcionIds = inscripciones.stream()
                    .map(Inscripcion::getId)
                    .collect(Collectors.toList());

            query.addCriteria(Criteria.where("inscripcionId").in(inscripcionIds));
        }

        long total = mongoTemplate.count(query, CitizenResponse.class);

        // Adding pagination using pageable
        query.with(pageable);

        List<CitizenResponse> responses = mongoTemplate.find(query, CitizenResponse.class);

        List<InscripcionConsultaDTO> inscripciones = new ArrayList<>();
        for (CitizenResponse response : responses) {

            try {
                InstanciaSede instanciaSedeInfo = instanciaSedeService.getByID(response.getInstanciaSedeId());
                response.setInstanciaId(instanciaSedeInfo.getInstancia().getId());
                InscripcionConsultaDTO inscripcion = getInscripcionByID(instanciaSedeInfo.getInstancia().getInscripcion().getId(), response);
                inscripciones.add(inscripcion);

            } catch (Exception e) {
                continue;
            }
        }

        return new PageImpl<>(inscripciones, pageable, total);
    }

    public InscripcionConsultaDTO getInscripcionByID(final Long id, final CitizenResponse citizenResponse){
        Inscripcion inscripcion = inscripcionService.getInscripcionById1(id);

        Instancia instancia = instanciaService.findInstanciaInstanciaById(citizenResponse.getInstanciaId());

        Boolean isCanceled = citizenResponse.getDeleted();
        String estadoCiudadano = "";

        String deleteType =  citizenResponse.getDeleteType();
        if ("Admin".equals(deleteType)) {
            estadoCiudadano = "Retirado por Admin";
        } else {
            estadoCiudadano = isCanceled ? "Retirado por Correo" : "Inscripto";
        }



        String estadoInstancia = "Inactiva";

        if (instancia.getId() != null) {
            estadoInstancia = instancia.getEstado() == 1 ? "Activa" : "Inactiva";
        }

        InstanciaSede instanciaSede = instanciaSedeService.getByID(citizenResponse.getInstanciaSedeId());

        InscripcionConsultaDTO inscripcionConsultaDTO = new InscripcionConsultaDTO(
                citizenResponse.getId(),      // id
                inscripcion.getNombre(),      // nombreCurso
                citizenResponse.getInstanciaId(), // instancia
                estadoInstancia,      // estadoInstancia
                instanciaSede.getSede().getNombre(),                  // sede
                estadoCiudadano,       // estadoCiudadano
                citizenResponse.getCreatedAt()
        );

        if (inscripcion.getId() != null) {
            return inscripcionConsultaDTO;
        }

        return inscripcionConsultaDTO;
    }




    public CitizenResponse save(CitizenResponse citizenResponse){

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String strDate = dateFormat.format(date);

        citizenResponse.createdAt = strDate;
        citizenResponse.estado = true;
        citizenResponse.deleted = false;

        return responseRepository.save(citizenResponse);
    }

    public Integer softDeleteByCuilAndInstanciaId(String cuil, Long InstanciaId){
        CitizenResponse response = responseRepository.findByCuilAndInstanciaIdAndDeleted(cuil, InstanciaId, false);
        if (response != null) {
            // Actualizar y guardar el CitizenResponse
            response.setDeleted(true);
            response.setDeleteType("Admin");
            responseRepository.save(response);
            return 1;
        } else {
            // No se encontró el CitizenResponse con los criterios dados
            return 0;
        }// Bloquear el resultado y devolverlo como un valor Integer
    }

    public CitizenResponse softDeleteByMongoID(String mongoID){

        CitizenResponse response = responseRepository.findByIdAndDeleted(mongoID, false);

        if (response != null) {
            response.deleted = true;
            response.deleteType = "Admin";
            responseRepository.save(response);
        }

        return response;

    }

    public CitizenResponse getByCuilAndInstanciaSedeId(String cuil, Long InstanciaSedeId){
        return responseRepository.findByCuilAndInstanciaSedeIdAndDeleted(cuil, InstanciaSedeId, false);
    }

    public List<CitizenResponse> findAll(){
        return responseRepository.findAll();
    }

    public Page<CitizenResponse> findAll(PageRequest pageRequest){
        return responseRepository.findAll(pageRequest);
    }

    public boolean disableBrokenInscriptions(){
        List<CitizenResponse> responses = responseRepository.findByDeleted(false);

        for(CitizenResponse response : responses){

            try {
                instanciaSedeService.getByID(response.getInstanciaSedeId());
                // If not broken go to the next iteration

            } catch (EntityNotFoundException e) {
                Optional<CitizenResponse> optionalResponse = responseRepository.findById(response.getId());

                if (optionalResponse.isPresent()) {
                    CitizenResponse currentResponse = optionalResponse.get();

                    // If it's broken, execute soft delete
                    currentResponse.setDeleted(true);
                    currentResponse.setDeleteType("disableBrokenInscriptions");

                    responseRepository.save(currentResponse);
                }

                e.printStackTrace();
            }
        }

        return true;

    }

}
