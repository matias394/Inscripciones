package com.asi.inscripciones.mvp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CitizenFilterDTO {
    String name;
    String lastname;
    String cuil;
}