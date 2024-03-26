package com.asi.inscripciones.mvp.mapper.rowmapper;

import com.asi.inscripciones.mvp.entity.report.ReporteEventoResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

public class ReporteEventoResponseMapper implements RowMapper<ReporteEventoResponse> {

    @Override
    public ReporteEventoResponse mapRow(ResultSet rs, int rowNum) throws SQLException {

        ReporteEventoResponse reporteEventoResponse = new ReporteEventoResponse();

        String nombreApellido = rs.getString("NOMBRE_ALUMNO") +" "+ rs.getString("APELLIDO_ALUMNO");

        reporteEventoResponse.setFechaEvento(rs.getString("FECHA_INICIO"));
        reporteEventoResponse.setNombreApellido(nombreApellido);
        reporteEventoResponse.setEvento(rs.getString("NOMBRE_EVENTO"));
        reporteEventoResponse.setEmail(rs.getString("EMAIL"));
        reporteEventoResponse.setCuilDniPass(rs.getString("CUIL"));
        reporteEventoResponse.setAsistencia(rs.getInt("ASISTENCIA"));

        return reporteEventoResponse;
    }

}
