package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = ConstanteBD.TABLA_ROL)
@SequenceGenerator(name=ConstanteBD.SEQ_ROL, sequenceName = ConstanteBD.SEQ_ROL, allocationSize = 1)
@Data @EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
public class Rol extends AbstractGenericEntity implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_ROL)
    private Long id;

    
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Transient
    private List<Permiso> permisos;
}
