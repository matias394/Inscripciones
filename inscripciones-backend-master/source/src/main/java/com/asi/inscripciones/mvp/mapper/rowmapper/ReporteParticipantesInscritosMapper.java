package com.asi.inscripciones.mvp.mapper.rowmapper;

import com.asi.inscripciones.mvp.entity.report.ReporteEventoResponse;
import com.asi.inscripciones.mvp.entity.report.ReporteParticipanteInscritosResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReporteParticipantesInscritosMapper implements RowMapper<ReporteParticipanteInscritosResponse> {

    @Override
    public ReporteParticipanteInscritosResponse mapRow(ResultSet rs, int rowNum) throws SQLException {

        ReporteParticipanteInscritosResponse response = new ReporteParticipanteInscritosResponse();

        String nombreApellido = rs.getString("NOMBRE_ALUMNO") +" "+ rs.getString("APELLIDO_ALUMNO");

        response.setFechaEvento(rs.getString("NOMBRE_ALUMNO"));
        response.setNombreApellido(nombreApellido);
        response.setEvento(rs.getString("NOMBRE_EVENTO"));
        response.setEmail(rs.getString("EMAIL"));
        response.setCuilDniPass(rs.getString("CUIL"));

        return response;
    }
}
