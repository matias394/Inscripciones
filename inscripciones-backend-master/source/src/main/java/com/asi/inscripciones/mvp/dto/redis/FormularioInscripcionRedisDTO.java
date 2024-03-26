package com.asi.inscripciones.mvp.dto.redis;


import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
@Data
@RedisHash("FormularioInscripcion")
public class  FormularioInscripcionRedisDTO implements Serializable {

    @Id
    public Long idInscripcion;
    public Long idFormulario;
    public String idRefMongo;

}
