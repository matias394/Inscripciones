package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class FieldGroupDTO {
    private String className;
    private String key;
    private String type;
    private TemplateOptionsDTO templateOptions;
    private ValidationDTO validation;
}
