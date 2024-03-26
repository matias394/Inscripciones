package com.asi.inscripciones.mvp.dto.FormulariosMongo;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Getter
@ToString
@Document(collection = "formularios_mongo")
public class  FormularioMongoDTO {
    public String id;
    public String nombre;
    public String descripcion;
    public String campos;
    public Boolean puedeEditarseNombre;
}
