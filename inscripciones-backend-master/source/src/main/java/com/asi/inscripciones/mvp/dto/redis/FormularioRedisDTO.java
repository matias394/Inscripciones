package com.asi.inscripciones.mvp.dto.redis;


import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Formulario")
public class FormularioRedisDTO implements Serializable {

    @Id
    public String id;
    public String nombre;
    public String descripcion;
    public String campos;
    public Boolean puedeEditarseNombre;

}
