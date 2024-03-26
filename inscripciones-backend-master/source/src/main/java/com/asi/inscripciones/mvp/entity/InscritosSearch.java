package com.asi.inscripciones.mvp.entity;


import com.asi.inscripciones.mvp.dto.InscripcionFiltroDTO;
import com.asi.inscripciones.mvp.dto.InstanciaFiltroDTO;
import com.asi.inscripciones.mvp.dto.SedeFiltroDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "#{@inscritosSearchConfig.getElasticsearchIndexName()}")
public class InscritosSearch {
	@Id
    private String id;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String respuestaIdRefMongo;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String cuil;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String nombre;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String apellido;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String email;
	
	@Field(type = FieldType.Object, name = "inscripcion")
	private InscripcionFiltroDTO inscripcion;
	
	@Field(type = FieldType.Object, name = "instancia")
	private InstanciaFiltroDTO instancia;

	@Field(type = FieldType.Object, name = "sede")
	private SedeFiltroDTO sede;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String formularioIdRefMongo;

	@Field(type = FieldType.Text, name = "respuesta")
	private String respuesta;

	@Field(type = FieldType.Boolean, name = "synchronizedToOracle")
	private Boolean synchronizedToOracle;

	@Field(type = FieldType.Boolean, name = "deleted")
	private Boolean deleted;

	@Field(type = FieldType.Boolean, name = "estado")
	private Boolean estado;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String createdAt;

	@Field(type = FieldType.Integer, name = "id_organismo")
	private Long id_organismo;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String nombre_organismo;

	@Field(type = FieldType.Integer, name = "id_categoria")
	private Long id_categoria;

	@MultiField(mainField = @Field(type = FieldType.Text),
			otherFields = { @InnerField(suffix = "keyword", type = FieldType.Keyword) })
	private String nombre_categoria;

}
