package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Getter
@ToString
@Document(collection = "formularios_mongo")
public class InputGroupDTO {
    private String fieldGroupClassName;
    private List<FieldGroupDTO> fieldGroup;
}