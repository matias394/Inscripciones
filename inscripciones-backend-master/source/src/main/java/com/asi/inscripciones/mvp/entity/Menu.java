package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = ConstanteBD.TABLA_MENU)
@SequenceGenerator(name=ConstanteBD.SEQ_MENU, sequenceName = ConstanteBD.SEQ_MENU, allocationSize = 1)
@Data
public class Menu implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_MENU)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ruta")
    private String ruta;

    @Column(name = "padre_id")
    private Long padreId;

    @Column(name = "hijo_orden")
    private Long hijoOrden;

    @Column(name = "baja")
    private Integer baja;

    @Column(name = "icono")
    private String icono;

    @Column(name = "color")
    private String color;

    @Column(name = "estilo")
    private String estilo;

    @Column(name = "nombre")
    private String nombre;
 
}