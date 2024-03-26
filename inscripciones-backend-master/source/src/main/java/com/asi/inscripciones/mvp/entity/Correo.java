package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_CORREO)
@SequenceGenerator(name=ConstanteBD.SEQ_CORREO, sequenceName = ConstanteBD.SEQ_CORREO, allocationSize = 1)
@Data
@EqualsAndHashCode(callSuper = true)
public class Correo extends AbstractGenericEntity implements Serializable{


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_CORREO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "asunto")
    private String asunto;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "html")
    private String html;

    
}
