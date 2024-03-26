package com.asi.inscripciones.mvp.mapper.rowmapper;

import com.asi.inscripciones.mvp.entity.report.MedioDeAsignacionResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MedioDeAsignacionMapper implements RowMapper<MedioDeAsignacionResponse> {

    @Override
    public MedioDeAsignacionResponse mapRow(ResultSet rs, int rowNum) throws SQLException {

        MedioDeAsignacionResponse response = new MedioDeAsignacionResponse();

        String nombreApellido = rs.getString("NOMBRE_ALUMNO") +" "+ rs.getString("APELLIDO_ALUMNO");

        response.setFechaEvento(rs.getString("FECHA_INICIO"));
        response.setNombreApellido(nombreApellido);
        response.setEvento(rs.getString("NOMBRE_EVENTO"));
        response.setEmail(rs.getString("EMAIL"));
        response.setCuilDniPass(rs.getString("CUIL"));

        return response;
    }

}
