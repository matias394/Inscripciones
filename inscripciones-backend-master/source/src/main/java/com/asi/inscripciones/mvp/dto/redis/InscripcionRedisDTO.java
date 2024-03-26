package com.asi.inscripciones.mvp.dto.redis;

import com.asi.inscripciones.mvp.entity.*;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Inscripcion")
public class InscripcionRedisDTO implements Serializable {

    private Long id;

    private Integer cuposParaOtros;

    private Integer feriado;

    private Integer cuposGrupales;

    private Integer loginMiba;

    private Integer cantidadMaxima;

    private String nombre;

    private String url;

    private String retornoUrl;

    private String token;

    private OrganismoCategoria organismoCategoria;

    private Correo correo;

    private Notificacion notificacion;

    private Tipo tipo;

    private Estado estadoInscripcion;

    Long organismo;

    Long categoria;

    public void setTokenFromUrl(){
        String[] urlSplit = this.url.split("_");
        System.out.println("antes: " + this.token);
        this.token=urlSplit[1];
        System.out.println("despues: " + this.token);
    }
}
