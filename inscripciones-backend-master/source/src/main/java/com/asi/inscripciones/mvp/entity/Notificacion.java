package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_NOTIFICACION)
@SequenceGenerator(name=ConstanteBD.SEQ_NOTIFICACION, sequenceName = ConstanteBD.SEQ_NOTIFICACION, allocationSize = 1)
@Data
@EqualsAndHashCode(callSuper = true)
public class Notificacion extends AbstractGenericEntity implements Serializable{
   
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_NOTIFICACION)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    
}
