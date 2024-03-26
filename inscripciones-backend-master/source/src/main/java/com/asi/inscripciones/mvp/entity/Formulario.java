package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_FORMULARIO)
@Data 
@EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_FORMULARIO, sequenceName = ConstanteBD.SEQ_FORMULARIO, allocationSize = 1)
public class Formulario extends AbstractGenericEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_FORMULARIO)
    public Long id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "descripcion", nullable = false, length = 250)
    private String descripcion;

    @Column(name = "id_ref_mongo")
    private String idRefMongo;

}
