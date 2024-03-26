package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_ORGANISMO)
@Data @EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_ORGANISMO, sequenceName = ConstanteBD.SEQ_ORGANISMO, allocationSize = 1)
public class Organismo extends AbstractGenericEntity implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_ORGANISMO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;
    
}
