package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = ConstanteBD.TABLA_CLASE_PROFESOR)
@Data
@EqualsAndHashCode(of = "id", callSuper = false)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_CLASE_PROFESOR, sequenceName = ConstanteBD.SEQ_CLASE_PROFESOR, allocationSize = 1)
public class ClaseProfesor extends AbstractGenericEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_CLASE_PROFESOR)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "clase_id")
    private Clase clase;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;


}
