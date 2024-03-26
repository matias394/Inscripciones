package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = ConstanteBD.TABLA_PERMISO)
@SequenceGenerator(name=ConstanteBD.SEQ_PERMISO, sequenceName = ConstanteBD.SEQ_PERMISO, allocationSize = 1)
@Data @EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
public class Permiso extends AbstractGenericEntity implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_PERMISO)
    private Long id;

    @Column(nullable = false, length = 45)
    private String nombre;

}