package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = ConstanteBD.TABLA_ORGANISMO_CATEGORIA)
@Data
@SequenceGenerator(name=ConstanteBD.SEQ_ORGANISMO_CATEGORIA, sequenceName = ConstanteBD.SEQ_ORGANISMO_CATEGORIA, allocationSize = 1)
public class OrganismoCategoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_ORGANISMO_CATEGORIA)
    private Long id;

    @ManyToOne
	@JoinColumn(name = "organismo_id")
    private Organismo organismo;

    @ManyToOne
	@JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Column(name = "estado")
    private Integer estado;
    
}
