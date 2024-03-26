package com.asi.inscripciones.mvp.repository;

import java.time.LocalDate;

public interface InstanciaSedeProjection {

    Long getId();
    //INSCRIPCION
    Long getInscripcionId();
    String getInscripcionNombre();
    Integer getInscripcionEstado();
    //INSTANCIA
    Long getInstanciaId();
    String getInstanciaNombre();
    Integer getInstanciaEstado();
    LocalDate getInstanciaFechaInicio();
    LocalDate getInstanciaFechaFin();
    //SEDE
    Long getSedeId();
    String getSedeNombre();
    Integer getSedeBloqueado();
    //Categoria
    Long getCategoriaId();
    String getCategoriaNombre();
    //ORGANISMO
    Long getOrganismoId();
    String getOrganismoNombre();
}
