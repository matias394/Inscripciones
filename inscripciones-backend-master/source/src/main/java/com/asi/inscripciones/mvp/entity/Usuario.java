package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = ConstanteBD.TABLA_USUARIO)
@Data
@EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_USUARIO, sequenceName = ConstanteBD.SEQ_USUARIO, allocationSize = 1)
public class Usuario extends AbstractGenericEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_USUARIO)
    private Long id;

    @Column(name = "dni")
    private String dni;

    @Column(name = "cuil")
    private String cuil;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 100)
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "genero")
    private String genero;

    @Column(name = "password")
    private String password;

    @Column(name = "nacionalidad")
    private String nacionalidad;

    @ManyToOne
    @JoinColumn(name = "organismo_id")
    private Organismo organismo;

    @Column(name = "intentos")
    private Integer intentos;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;


    @Transient
    @ToString.Exclude
    private List<Categoria> categorias;

}
