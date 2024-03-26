package com.asi.inscripciones.mvp.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.asi.inscripciones.mvp.util.ConstanteBD;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Table(name = ConstanteBD.TABLA_REPOSITORIO_ARCHIVO)
@SequenceGenerator(name=ConstanteBD.SEQ_REPOSITORIO_ARCHIVO, sequenceName = ConstanteBD.SEQ_REPOSITORIO_ARCHIVO, allocationSize = 1)
@Data @EqualsAndHashCode(callSuper = true)
public class RepositorioArchivo extends AbstractGenericEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_REPOSITORIO_ARCHIVO)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = true)
    private String cuil;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = true)
    private String metadata;

    @ManyToOne
    @JoinColumn(name = "inscripcion_id")
    private Inscripcion inscripcion_id;

    @ManyToOne
    @JoinColumn(name = "instancia_sede_id")
    private InstanciaSede instancia_sede_id;

    @Column(nullable = true)
    private Integer estado;
}