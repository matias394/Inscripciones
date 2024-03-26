package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_TIPO)
@SequenceGenerator(name=ConstanteBD.SEQ_TIPO, sequenceName = ConstanteBD.SEQ_TIPO, allocationSize = 1)
@Data
@EqualsAndHashCode(callSuper = true)
public class Tipo extends AbstractGenericEntity implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_TIPO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;
}
