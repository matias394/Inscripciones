package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = ConstanteBD.TABLA_ROL_PERMISO)
@SequenceGenerator(name=ConstanteBD.SEQ_ROL_PERMISO, sequenceName = ConstanteBD.SEQ_ROL_PERMISO, allocationSize = 1)
@Data
public class RolPermiso {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_ROL_PERMISO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "permiso_id")
    private Permiso permiso;
}
