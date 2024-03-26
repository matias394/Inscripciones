
package com.asi.inscripciones.mvp.dto;

import com.asi.inscripciones.mvp.entity.Sede;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstanciaSedeDTOMapper {


    private Long id;

    private Integer cupos;

    private LocalTime horaInicio;

    private LocalTime horaFin;

    private Long sede;

    private String sedeNomnbre;

    private String urlSede;

    private Long instancia;

    private String instanciaNombre;

    private SedeDTO sedeDTO;

    private List<ClaseDTOMapper> claseDTOMapperList;

    private String  instanciaSedeDetalle;

    private Integer estado;

    private LocalDate fechaFin;

    private List<DiaDTO> dias;

    private List<String> claseHorarios;

    private List<FechaDiasDTO> fechaDiasList;

}
