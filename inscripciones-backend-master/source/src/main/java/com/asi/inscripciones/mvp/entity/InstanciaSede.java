package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.dto.ClaseDTOMapper;
import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = ConstanteBD.TABLA_INSTANCIA_SEDE)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_INSTANCIA_SEDE, sequenceName = ConstanteBD.SEQ_INSTANCIA_SEDE, allocationSize = 1)
@Data
@EqualsAndHashCode(of = "id")
public class InstanciaSede implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_INSTANCIA_SEDE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "instancia_id")
    private Instancia instancia;

    @ManyToOne
    @JoinColumn(name = "sede_id")
    private Sede sede;

    @Column(name = "cupos")
    private Integer cupos;

    @Column(name = "url")
    private String url = null;

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

    @Column(name = "estado")
    private Integer estado;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Transient
    private List<Clase> clase;

    @Transient
    private List<ClaseDTOMapper> claseDTOMapper;

}
