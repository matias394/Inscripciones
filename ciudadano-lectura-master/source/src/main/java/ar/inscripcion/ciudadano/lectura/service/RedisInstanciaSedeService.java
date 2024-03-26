package ar.inscripcion.ciudadano.lectura.service;

import ar.inscripcion.ciudadano.lectura.dto.PaginatedResponse;
import ar.inscripcion.ciudadano.lectura.mapper.InstanciaSedeMapper;
import com.asi.inscripcion.dto.redis.InstanciaSedeRedisDTO;
import io.quarkus.redis.datasource.ReactiveRedisDataSource;
import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.hash.HashCommands;
import io.quarkus.redis.datasource.keys.ReactiveKeyCommands;
import io.quarkus.redis.datasource.set.SetCommands;
import io.quarkus.redis.datasource.value.ReactiveValueCommands;
import io.quarkus.redis.runtime.datasource.RedisCommand;
import io.vertx.mutiny.redis.client.RedisAPI;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class RedisInstanciaSedeService {


    @Inject
    RedisAPI redisAPI;

    @Inject
    InstanciaSedeMapper instanciaSedeMapper;


    private final ReactiveKeyCommands<String> keys;

    private final ReactiveValueCommands<String, String> values;

    private final HashCommands<String, String, String> commands;

    private final SetCommands<String, String> setCommands;

    public RedisInstanciaSedeService(ReactiveRedisDataSource reactiveRedisDataSource, RedisDataSource ds, RedisDataSource setCommands) {
        this.keys = reactiveRedisDataSource.key();
        this.values = reactiveRedisDataSource.value(String.class);
        this.commands = ds.hash(String.class);
        this.setCommands = setCommands.set(String.class);
    }

    public PaginatedResponse<InstanciaSedeRedisDTO> busqueda(String id, String busqueda, Integer page, Integer size, String sort) {
        List<InstanciaSedeRedisDTO> finalValue = obtenerInstanciasSede(id);

        // Filtrar por búsqueda si es necesario
        String busquedaLower = busqueda != null ? busqueda.toLowerCase() : null;
        if (busquedaLower != null && !busquedaLower.isEmpty()) {
            finalValue = finalValue.stream()
                    .filter(instancia -> instancia.getDireccionSede().toLowerCase().contains(busquedaLower) || instancia.getNombreSede().toLowerCase().contains(busquedaLower))
                    .collect(Collectors.toList());
        }

        // Ordenar si es necesario
        if (sort != null && !sort.isEmpty()) {
            if ("id".equalsIgnoreCase(sort)) {
                finalValue.sort(Comparator.comparing(InstanciaSedeRedisDTO::getId));
            } else if ("nombre".equalsIgnoreCase(sort)) {
                finalValue.sort(Comparator.comparing(InstanciaSedeRedisDTO::getNombreSede));
            }
        }

        if (page < 0) {
            page = 0;
        }

        int totalPages = (finalValue.size() - 1) / size + 1;

        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, finalValue.size());

        if (startIndex >= finalValue.size()) {
            // Ajustar la página al último posible
            page = Math.max(0, totalPages - 1);
            startIndex = page * size;
            endIndex = Math.min(startIndex + size, finalValue.size());
        }

        List<InstanciaSedeRedisDTO> paginatedResults = finalValue.subList(startIndex, endIndex);

        PaginatedResponse<InstanciaSedeRedisDTO> response = new PaginatedResponse<>();
        response.setTotalElements(finalValue.size());
        response.setSize(size);
        response.setContent(paginatedResults);
        response.setNumber(page);
        response.setFirst(page == 0);
        response.setLast(endIndex == finalValue.size());
        response.setNumberOfElements(paginatedResults.size());
        response.setEmpty(paginatedResults.isEmpty());
        response.setTotalPages(totalPages);

        return response;
    }

    private List<InstanciaSedeRedisDTO> obtenerInstanciasSede(String id) {
        List<String> instanciaSedes = setCommands.smembers("InstanciaSede").stream().toList();
        List<InstanciaSedeRedisDTO> finalValue = new ArrayList<>();

        instanciaSedes.forEach(listaInstanciaSede -> {
            Map<String, String> hashGet = commands.hgetall("InstanciaSede:" + listaInstanciaSede);

            if (hashGet.size() != 0 && hashGet.get("idInscripcion").equals(id)) {
                InstanciaSedeRedisDTO mapperInstanciaSede = instanciaSedeMapper.mapToInstanciaSedeRedisDTO(hashGet);
                finalValue.add(mapperInstanciaSede);
            }
        });

        return finalValue;
    }
}
