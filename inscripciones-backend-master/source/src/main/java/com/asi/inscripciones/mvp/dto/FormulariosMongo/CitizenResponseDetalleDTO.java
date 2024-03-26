package com.asi.inscripciones.mvp.dto.FormulariosMongo;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.asi.inscripciones.mvp.dto.FechaDiasDTO;

import java.util.List;
import java.time.LocalTime;

@Data
@NoArgsConstructor
public class CitizenResponseDetalleDTO {
    @Id
    public String id;
    public Long inscripcionId;
    public String nombreInscripcion;
    public Long instanciaId;
    public Long instanciaSedeId;
    public String formularioId;
    public Object respuesta;
    public Boolean deleted;
    public Boolean  estado;
    public String  createdAt;
    public String  sede;
    public String  profesor;
    public String  formulario;
    public Integer lunes;
    public Integer martes;
    public Integer miercoles;
    public Integer jueves;
    public Integer viernes;
    public Integer sabado;
    public Integer domingo;
    public LocalTime horaInicio;
    public LocalTime horaFin;
    public Integer cupos;
    public FormularioMongoDTO formData;
    private List<FechaDiasDTO> horarios;

}
