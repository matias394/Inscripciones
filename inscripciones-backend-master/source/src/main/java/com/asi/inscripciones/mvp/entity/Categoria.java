package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_CATEGORIA)
@Data @EqualsAndHashCode(callSuper = false)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_TABLA_CATEGORIA, sequenceName = ConstanteBD.SEQ_TABLA_CATEGORIA, allocationSize = 1)
public class Categoria extends AbstractGenericEntity implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_TABLA_CATEGORIA)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "nivel")
    private String nivel;

    @Column(name = "padre_id")
    private Long padreId;

    @Column(name = "seq")
    private String seq;

}
