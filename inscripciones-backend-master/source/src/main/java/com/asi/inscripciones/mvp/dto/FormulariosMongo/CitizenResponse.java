package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "ciudadano_respuestas")
public class CitizenResponse {
    @Id
    public String id;
    public String idMongo;
    public String cuil;
    public String nombre;
    public String apellido;
    public String email;
    public String cuilMiba;
    public String nombreMiba;
    public String apellidoMiba;
    public String emailMiba;
    public Long inscripcionId;
    public Long instanciaId;
    public Long instanciaSedeId;
    public Long sedeId;
    public Long claseId;
    public String formularioId;
    public Object respuesta;
    public Boolean synchronizedToOracle;
    public Boolean deleted;
    public String deleteType;
    public String synchronizedError;
    public Boolean estado;
    public String createdAt;
}
