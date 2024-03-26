package com.asi.inscripciones.mvp.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

@MappedSuperclass
@Setter @Getter
public abstract class AbstractGenericEntity {

    @CreatedDate
    @Column(name = "creado")
    private LocalDate creado;

    @CreatedBy
    @Column(name = "creado_por")
    private String creadoPor;

    @LastModifiedDate
    @Column(name = "modificado")
    private LocalDate modificado;

    @LastModifiedBy
    @Column(name = "modificado_por")
    private String modificadoPor;

    @Column(name = "estado")
    private Integer estado;

}