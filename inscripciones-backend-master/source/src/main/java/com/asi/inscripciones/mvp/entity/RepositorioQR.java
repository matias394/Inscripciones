package com.asi.inscripciones.mvp.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.asi.inscripciones.mvp.util.ConstanteBD;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Table(name = ConstanteBD.TABLA_REPOSITORIO_QR)
@SequenceGenerator(name=ConstanteBD.SEQ_REPOSITORIO_QR, sequenceName = ConstanteBD.SEQ_REPOSITORIO_QR, allocationSize = 1)
@Data @EqualsAndHashCode(callSuper = true)
public class RepositorioQR extends AbstractGenericEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_REPOSITORIO_ARCHIVO)
    private Long id;

    @Column(nullable = false)
    private String cuil;

    @Column(nullable = false)
    private String url_qr;

    @Column(nullable = false)
    private String nombre_qr;

    @Column(nullable = true)
    private LocalDate vencimiento;

    @ManyToOne
    @JoinColumn(name = "inscripcion_id")
    private Inscripcion inscripcion_id;

    @ManyToOne
    @JoinColumn(name = "instancia_sede_id")
    private InstanciaSede instancia_sede_id;
    
    @Column(nullable = false)
    private byte[] base64;
}
