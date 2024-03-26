package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@ToString
@Document(collection = "formularios_mongo")
public class MessagesDTO {
    private String required;
    private String pattern;
}
