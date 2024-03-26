package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "contador_cupos")
public class ContadorCupo {
    @Id
    public String id;
    public Integer counter;
    public Long inscripcionId;
    public Long instanciaId;
    public Long instanciaSedeId;
    public Long sedeId;
    public Long claseId;
    public String formularioId;
    public Boolean synchronizedToOracle;
    public String synchronizedError;
    public Boolean  estado;
    public String  createdAt;
}
