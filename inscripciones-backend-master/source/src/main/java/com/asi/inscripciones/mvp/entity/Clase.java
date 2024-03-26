package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = ConstanteBD.TABLA_CLASE)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name = ConstanteBD.SEQ_CLASE, sequenceName = ConstanteBD.SEQ_CLASE, allocationSize = 1)
@Data
@EqualsAndHashCode(of = "id", callSuper = false)
public class Clase extends AbstractGenericEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_CLASE)
    private Long id;

    @Column
    private LocalDate fecha;

    @Column
    private String nombre;

    @Column(name = "lunes")
    private Integer lunes;

    @Column(name = "martes")
    private Integer martes;

    @Column(name = "miercoles")
    private Integer miercoles;

    @Column(name = "jueves")
    private Integer jueves;

    @Column(name = "viernes")
    private Integer viernes;

    @Column(name = "sabado")
    private Integer sabado;

    @Column(name = "domingo")
    private Integer domingo;

    @Column(name = "hora_inicio")
    private LocalTime horaInicio;

    @Column(name = "hora_fin")
    private LocalTime horaFin;
    
    @ManyToOne
    @JoinColumn(name = "instancia_sede_id")
    private InstanciaSede instanciaSede;

    @Transient
    List<ClaseProfesor> claseProfesor;

    @Transient
    List<ClaseAlumno> claseAlumno;

}

