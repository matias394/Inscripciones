package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = ConstanteBD.TABLA_USUARIO_ORGANISMO_CATEGORIA)
@Data 
@SequenceGenerator(name=ConstanteBD.SEQ_USUARIO_ORGANISMO_CATEGORIA, sequenceName = ConstanteBD.SEQ_USUARIO_ORGANISMO_CATEGORIA, allocationSize = 1)
public class UsuarioOrganismoCategoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_USUARIO_ORGANISMO_CATEGORIA)
    private Long id;

    @ManyToOne
	@JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
	@JoinColumn(name = "organismo_categoria_id")
    private OrganismoCategoria organismoCategoria;

    @Column(name = "estado")
    private Integer estado;

}
