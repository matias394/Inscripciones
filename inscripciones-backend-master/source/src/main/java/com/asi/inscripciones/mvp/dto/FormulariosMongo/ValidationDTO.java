package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "formularios_mongo")
public class ValidationDTO {
    private MessagesDTO messages;
}
