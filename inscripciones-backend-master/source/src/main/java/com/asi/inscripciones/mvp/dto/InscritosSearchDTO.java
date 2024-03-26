package com.asi.inscripciones.mvp.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Builder
@Data
public class InscritosSearchDTO {
    private String id;
    private String respuestaIdRefMongo;
    private String nombreApellido;
    private String dni;
    private String email;
    private InscripcionFiltroDTO inscripcion;
    private SedeFiltroDTO sede;
    private InstanciaFiltroDTO instancia;
    private String formularioIdRefMongo;
    private JsonNode respuestaFormulario;
    private Long id_organismo;
    private String nombre_organismo;
    private Long id_categoria;
    private String nombre_categoria;
}
