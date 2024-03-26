package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = ConstanteBD.TABLA_PERMISO_MENU)
@SequenceGenerator(name=ConstanteBD.SEQ_PERMISO_MENU, sequenceName = ConstanteBD.SEQ_PERMISO_MENU, allocationSize = 1)
@Setter @Getter @NoArgsConstructor @AllArgsConstructor @ToString
public class PermisoMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_PERMISO_MENU)
    private Long id;

    @ManyToOne
    @JoinColumn(name="menu_id")
    private Menu menu;

    @ManyToOne
    @JoinColumn(name="permiso_id")
    private Permiso permiso;

}
