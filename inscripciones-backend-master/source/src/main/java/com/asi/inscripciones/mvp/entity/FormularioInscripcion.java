package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_FORMULARIO_INSCRIPCION)
@Data 
@EqualsAndHashCode
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_FORMULARIO_INSCRIPCION, sequenceName = ConstanteBD.SEQ_FORMULARIO_INSCRIPCION, allocationSize = 1)
public class FormularioInscripcion implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_FORMULARIO_INSCRIPCION)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "formulario_id")
    public Formulario formulario;

    @ManyToOne
    @JoinColumn(name = "inscripcion_id")
    public Inscripcion inscripcion;

    @Column(name = "dirigido")
    private Integer dirigido;

    @Column(name = "estado")
    private Integer estado;

}
