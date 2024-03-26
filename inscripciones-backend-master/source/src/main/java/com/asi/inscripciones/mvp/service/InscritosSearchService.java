/**
 * 
 */
package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.InscritosSearchDTO;
import com.asi.inscripciones.mvp.entity.InscritosSearch;
import com.asi.inscripciones.mvp.exception.ElasticException;
import com.asi.inscripciones.mvp.facade.InscritosSearchFacade;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Log4j2
public class InscritosSearchService {

	@Value("${elasticsearch.index.name}")
    private String ELASTIC_INDEX;

	//private static final String ELASTIC_INDEX = "i01-reportes-inscriptos";

	@Autowired
	private ElasticsearchOperations elasticsearchOperations;


	@Autowired
	private InscritosSearchFacade inscritosSearchFacade;

	public void ejecutarMigracion(final Integer loteSize) throws ElasticException {
		log.info("Llega a la clase InscritosSearchService, al metodo ejecutarMigracion");
		inscritosSearchFacade.buildIndex(loteSize);
		log.info("Sale de la clase InscritosSearchService, del metodo ejecutarMigracion");
	}

	public void agregarInscripto(final Long inscripcionId, final String cuil) throws ElasticException {
		log.info("Llega a la clase InscritosSearchService, al metodo agregarInscripto");
		inscritosSearchFacade.agregarInscripto(inscripcionId, cuil);
		log.info("Sale de la clase InscritosSearchService, del metodo agregarInscripto");
	}

	public void agregarInscriptosByInscripcionId(final Long inscripcionId) throws ElasticException {
		log.info("Llega a la clase InscritosSearchService, al metodo agregarInscriptosByInscripcionId");
		inscritosSearchFacade.agregarInscriptosByInscripcionId(inscripcionId);
		log.info("Sale de la clase InscritosSearchService, del metodo agregarInscriptosByInscripcionId");
	}

	public List<InscritosSearchDTO> processSearch(final String categoriaId, final String instanciaId, final String inscripcionId, final String sedeId, final String estado, final String estadoFecha, Pageable pageable) {
		log.info("Search with query {}", instanciaId,inscripcionId,sedeId,estado);

		QueryBuilder stateFilters = null;
		// 1. Create query on multiple fields enabling fuzzy search
		if(!categoriaId.isEmpty()&&inscripcionId.isEmpty()&&instanciaId.isEmpty()&&sedeId.isEmpty()&&estadoFecha.isEmpty())
		 stateFilters = QueryBuilders.boolQuery()
				.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
				.filter(QueryBuilders.matchQuery("estado", estado));;
		if(!categoriaId.isEmpty()&&!inscripcionId.isEmpty()){
			 stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					 .filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!sedeId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("sede.id", sedeId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		
		Query searchQuery = new NativeSearchQueryBuilder()
				                .withFilter(stateFilters)
								.withPageable(PageRequest.of(pageable.getPageNumber(),pageable.getPageSize()))
								.withSort(pageable.getSort())
				                .build();

		// 2. Execute search
		SearchHits<InscritosSearch> dataHits =
				elasticsearchOperations
				.search(searchQuery, InscritosSearch.class,
				IndexCoordinates.of(ELASTIC_INDEX));

		// 3. Map searchHits to product list
		InscritosSearchDTO.InscritosSearchDTOBuilder inscritosSearchDTO = InscritosSearchDTO.builder();
		ObjectMapper objectMapper = new ObjectMapper();
		List<InscritosSearchDTO> dataMatches = new ArrayList<InscritosSearchDTO>();
		dataHits.forEach(srchHit->{
			inscritosSearchDTO.id(srchHit.getContent().getId());
			inscritosSearchDTO.nombreApellido(srchHit.getContent().getNombre()+' '+srchHit.getContent().getApellido());
			inscritosSearchDTO.dni(srchHit.getContent().getCuil());
			inscritosSearchDTO.email(srchHit.getContent().getEmail());
			inscritosSearchDTO.inscripcion(srchHit.getContent().getInscripcion());
			inscritosSearchDTO.instancia(srchHit.getContent().getInstancia());
			inscritosSearchDTO.sede(srchHit.getContent().getSede());
			inscritosSearchDTO.formularioIdRefMongo(srchHit.getContent().getFormularioIdRefMongo());
			inscritosSearchDTO.respuestaIdRefMongo(srchHit.getContent().getRespuestaIdRefMongo());
			try {
				inscritosSearchDTO.respuestaFormulario(objectMapper.readValue(srchHit.getContent().getRespuesta(), JsonNode.class));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			inscritosSearchDTO.id_organismo(srchHit.getContent().getId_organismo());
			inscritosSearchDTO.nombre_organismo(srchHit.getContent().getNombre_organismo());
			inscritosSearchDTO.id_categoria(srchHit.getContent().getId_categoria());
			inscritosSearchDTO.nombre_categoria(srchHit.getContent().getNombre_categoria());
			dataMatches.add(inscritosSearchDTO.build());
		});

		SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");

		dataMatches.removeIf(x->{
			try {
				Date fechaActual = new Date();
				Date fechaInicio = formato.parse(x.getInstancia().getFechaInicio());
				Date fechaFin = formato.parse(x.getInstancia().getFechaFin());

				if(estadoFecha.equals("0") || estadoFecha.equals("")){
						return false;
				} else if(estadoFecha.equals("1")){
					if(fechaInicio.after(fechaActual)){
						return false;
					}
				} else if(estadoFecha.equals("2")){
					if(fechaInicio.before(fechaActual) && fechaFin.after(fechaActual) ){
						return false;
					}
				} else if(estadoFecha.equals("3")){
					if(fechaFin.before(fechaActual)){
						return false;
					}
				}

			} catch (ParseException e) {
				e.printStackTrace();}

			return true;
		});


		return dataMatches;
	}

	public Long processSearchAllCount(final String categoriaId,final String instanciaId, final String inscripcionId, final String sedeId, final String estado, final String estadoFecha) {
		log.info("Search with query {}", instanciaId,inscripcionId,sedeId,estado);

		// 1. Create query on multiple fields enabling fuzzy search
		QueryBuilder stateFilters = null;
		// 1. Create query on multiple fields enabling fuzzy search
		if(!categoriaId.isEmpty()&&inscripcionId.isEmpty()&&instanciaId.isEmpty()&&sedeId.isEmpty()&&estadoFecha.isEmpty())
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("estado", estado));;
		if(!categoriaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!sedeId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("sede.id", sedeId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}

		Query searchQuery = new NativeSearchQueryBuilder()
				.withFilter(stateFilters)
				.build();

		// 2. Execute search
		long dataHitsLong =
				elasticsearchOperations
						.search(searchQuery, InscritosSearch.class,
								IndexCoordinates.of(ELASTIC_INDEX)).getTotalHits();



		return dataHitsLong;
	}

	public List<InscritosSearchDTO> processSearchAll(final String categoriaId, final String instanciaId, final String inscripcionId, final String sedeId, final String estado, final String estadoFecha) {
		log.info("Search with query {}", instanciaId,inscripcionId,sedeId,estado);

		// 1. Create query on multiple fields enabling fuzzy search
		QueryBuilder stateFilters = null;
		// 1. Create query on multiple fields enabling fuzzy search
		if(!categoriaId.isEmpty()&&inscripcionId.isEmpty()&&instanciaId.isEmpty()&&sedeId.isEmpty()&&estadoFecha.isEmpty())
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("estado", estado));;
		if(!categoriaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}
		if(!categoriaId.isEmpty()&&!sedeId.isEmpty()&&!instanciaId.isEmpty()&&!inscripcionId.isEmpty()){
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("instancia.id", instanciaId))
					.filter(QueryBuilders.matchQuery("inscripcion.id", inscripcionId))
					.filter(QueryBuilders.matchQuery("sede.id", sedeId))
					.filter(QueryBuilders.matchQuery("estado", estado));
		}

		Query searchQuery = new NativeSearchQueryBuilder()
				.withFilter(stateFilters).withMaxResults(10000)
				.build();


		// 2. Execute search
		SearchHits<InscritosSearch> dataHits =
				elasticsearchOperations
						.search(searchQuery, InscritosSearch.class,
								IndexCoordinates.of(ELASTIC_INDEX));

		// 3. Map searchHits to product list
		InscritosSearchDTO.InscritosSearchDTOBuilder inscritosSearchDTO = InscritosSearchDTO.builder();
		ObjectMapper objectMapper = new ObjectMapper();
		List<InscritosSearchDTO> dataMatches = new ArrayList<InscritosSearchDTO>();
		dataHits.forEach(srchHit->{
			inscritosSearchDTO.id(srchHit.getContent().getId());
			inscritosSearchDTO.nombreApellido(srchHit.getContent().getNombre()+' '+srchHit.getContent().getApellido());
			inscritosSearchDTO.dni(srchHit.getContent().getCuil());
			inscritosSearchDTO.email(srchHit.getContent().getEmail());
			inscritosSearchDTO.inscripcion(srchHit.getContent().getInscripcion());
			inscritosSearchDTO.instancia(srchHit.getContent().getInstancia());
			inscritosSearchDTO.sede(srchHit.getContent().getSede());
			inscritosSearchDTO.formularioIdRefMongo(srchHit.getContent().getFormularioIdRefMongo());
			inscritosSearchDTO.respuestaIdRefMongo(srchHit.getContent().getRespuestaIdRefMongo());
			try {
				inscritosSearchDTO.respuestaFormulario(objectMapper.readValue(srchHit.getContent().getRespuesta(), JsonNode.class));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			inscritosSearchDTO.id_organismo(srchHit.getContent().getId_organismo());
			inscritosSearchDTO.nombre_organismo(srchHit.getContent().getNombre_organismo());
			inscritosSearchDTO.id_categoria(srchHit.getContent().getId_categoria());
			inscritosSearchDTO.nombre_categoria(srchHit.getContent().getNombre_categoria());
			dataMatches.add(inscritosSearchDTO.build());
		});

		SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");

		dataMatches.removeIf(x->{
			try {
				Date fechaActual = new Date();
				Date fechaInicio = formato.parse(x.getInstancia().getFechaInicio());
				Date fechaFin = formato.parse(x.getInstancia().getFechaFin());

				if(estadoFecha.equals("0") || estadoFecha.equals("")){
					return false;
				} else if(estadoFecha.equals("1")){
					if(fechaInicio.after(fechaActual)){
						return false;
					}
				} else if(estadoFecha.equals("2")){
					if(fechaInicio.before(fechaActual) && fechaFin.after(fechaActual) ){
						return false;
					}
				} else if(estadoFecha.equals("3")){
					if(fechaFin.before(fechaActual)){
						return false;
					}
				}

			} catch (ParseException e) {
				e.printStackTrace();}

			return true;
		});


		return dataMatches;
	}

	public List<InscritosSearchDTO> processSearchAllByIdCategoria(final String categoriaId, final String estado) {
		log.info("Search with query {}", estado);

		// 1. Create query on multiple fields enabling fuzzy search
		QueryBuilder stateFilters = null;
			stateFilters = QueryBuilders.boolQuery()
					.filter(QueryBuilders.matchQuery("id_categoria", categoriaId))
					.filter(QueryBuilders.matchQuery("estado", estado));

		Query searchQuery = new NativeSearchQueryBuilder()
				.withFilter(stateFilters).withMaxResults(1000)
				.build();


		// 2. Execute search
		SearchHits<InscritosSearch> dataHits =
				elasticsearchOperations
						.search(searchQuery, InscritosSearch.class,
								IndexCoordinates.of(ELASTIC_INDEX));

		// 3. Map searchHits to product list
		InscritosSearchDTO.InscritosSearchDTOBuilder inscritosSearchDTO = InscritosSearchDTO.builder();
		ObjectMapper objectMapper = new ObjectMapper();
		List<InscritosSearchDTO> dataMatches = new ArrayList<InscritosSearchDTO>();
		dataHits.forEach(srchHit->{
			inscritosSearchDTO.id(srchHit.getContent().getId());
			inscritosSearchDTO.nombreApellido(srchHit.getContent().getNombre()+' '+srchHit.getContent().getApellido());
			inscritosSearchDTO.dni(srchHit.getContent().getCuil());
			inscritosSearchDTO.email(srchHit.getContent().getEmail());
			inscritosSearchDTO.inscripcion(srchHit.getContent().getInscripcion());
			inscritosSearchDTO.instancia(srchHit.getContent().getInstancia());
			inscritosSearchDTO.sede(srchHit.getContent().getSede());
			inscritosSearchDTO.formularioIdRefMongo(srchHit.getContent().getFormularioIdRefMongo());
			inscritosSearchDTO.respuestaIdRefMongo(srchHit.getContent().getRespuestaIdRefMongo());
			try {
				inscritosSearchDTO.respuestaFormulario(objectMapper.readValue(srchHit.getContent().getRespuesta(), JsonNode.class));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			inscritosSearchDTO.id_organismo(srchHit.getContent().getId_organismo());
			inscritosSearchDTO.nombre_organismo(srchHit.getContent().getNombre_organismo());
			inscritosSearchDTO.id_categoria(srchHit.getContent().getId_categoria());
			inscritosSearchDTO.nombre_categoria(srchHit.getContent().getNombre_categoria());
			dataMatches.add(inscritosSearchDTO.build());
		});

		return dataMatches;
	}

}
