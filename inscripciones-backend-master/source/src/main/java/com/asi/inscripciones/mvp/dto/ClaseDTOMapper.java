package com.asi.inscripciones.mvp.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ClaseDTOMapper {

     Long getId();
     String getNombre();
     LocalDate getFecha();
     LocalTime getHoraInicio();
     LocalTime getHoraFin();
     Integer getEstado();
     Long getInstanciaSedeId();
     String getSede();
}
