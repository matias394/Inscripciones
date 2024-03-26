package com.asi.inscripciones.mvp.dto.redis;

import com.asi.inscripciones.mvp.dto.FechaDiasDTO;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@RedisHash("InstanciaSede")
public class InstanciaSedeRedisDTO implements Serializable {

    private Long id;
    private Integer cupos;

    private Long idInstancia;
    private String instanciaNombre;

    private Long idInscripcion;
    private String nombreInscripcion;

    private Long idModalidad;
    private String modalidad;

    private Long sedeId;
    private String nombreSede;
    private String direccionSede;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private List<FechaDiasDTO> horarios;
    private String dias;

}