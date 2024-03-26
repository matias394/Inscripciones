package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = ConstanteBD.TABLA_INSTANCIA)
@Data @EqualsAndHashCode(callSuper = true)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_INSTANCIA, sequenceName = ConstanteBD.SEQ_INSTANCIA, allocationSize = 1)
public class Instancia extends AbstractGenericEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_INSTANCIA)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "inscripcion_id")
    private Inscripcion inscripcion;

    @ManyToOne
    @JoinColumn(name = "modalidad_id")
    private Modalidad modalidad;

    @Column(name = "duracion_semana")
    private Integer duracionSemana;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "limite_inscripcion")
    private LocalDate limiteInscripcion;

    @Column(name = "bloqueado")
    private Integer bloqueado;

    @Transient
    @ToString.Exclude
    List<InstanciaSede> instanciaSede;

    @Transient
    @ToString.Exclude
    String nombreProfesores;

}
