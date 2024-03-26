package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@ToString
@Document(collection = "formularios_mongo")
public class ExtraOptionsDTO {
    private Boolean integracion_miba;
    private String valor_miba;
    private Boolean es_editable;
    private Boolean es_subsanable;
    private String grupo_iterativo;
}
