package com.asi.inscripciones.mvp.entity;

import com.asi.inscripciones.mvp.util.ConstanteBD;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = ConstanteBD.TABLA_INSCRIPCION)
@EntityListeners(AuditingEntityListener.class)
@SequenceGenerator(name=ConstanteBD.SEQ_INSCRIPCION, sequenceName = ConstanteBD.SEQ_INSCRIPCION, allocationSize = 1)
@Data
@EqualsAndHashCode(callSuper = true)
public class Inscripcion extends AbstractGenericEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = ConstanteBD.SEQ_INSCRIPCION)
    private Long id;

    @Column(name = "cupos_para_otros")
    private Integer cuposParaOtros;

    @Column(name = "feriado")
    private Integer feriado;

    @Column(name = "cupos_grupales")
    private Integer cuposGrupales;

    @Column(name = "login_miba")
    private Integer loginMiba;

    @Column(name = "cantidad_maxima")
    private Integer cantidadMaxima;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "url")
    private String url;

    @Column(name = "retorno_url")
    private String retornoUrl;

    @ManyToOne
    @JoinColumn(name = "organismo_categoria_id")
    private OrganismoCategoria organismoCategoria;

    @ManyToOne
    @JoinColumn(name = "correo_id")
    private Correo correo;


    @ManyToOne
    @JoinColumn(name = "notificacion_id")
    private Notificacion notificacion;


    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private Estado estadoInscripcion;


    @Transient
    List<Instancia> instancias;

    @Transient
    List<FormularioInscripcion> formularioInscripcion;


    @Transient
    Long organismo;

    @Transient
    Long categoria;


    
}
