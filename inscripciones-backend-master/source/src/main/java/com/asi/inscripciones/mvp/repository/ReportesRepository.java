package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.entity.report.MedioDeAsignacionResponse;
import com.asi.inscripciones.mvp.entity.report.ReporteEventoRequest;
import com.asi.inscripciones.mvp.entity.report.ReporteEventoResponse;
import com.asi.inscripciones.mvp.entity.report.ReporteParticipanteInscritosResponse;
import com.asi.inscripciones.mvp.mapper.rowmapper.MedioDeAsignacionMapper;
import com.asi.inscripciones.mvp.mapper.rowmapper.ReporteEventoResponseMapper;
import com.asi.inscripciones.mvp.mapper.rowmapper.ReporteParticipantesInscritosMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReportesRepository {

    @Autowired
    JdbcOperations jdbcOperations;

    public List<ReporteEventoResponse> reporteAsistenciaEvento(String sql){

        List<ReporteEventoResponse>  responseList = jdbcOperations.query(sql, new ReporteEventoResponseMapper());

        return responseList;
    }


    public List<ReporteParticipanteInscritosResponse> reporteParticipanteInscritoEvento(String sql){

        List<ReporteParticipanteInscritosResponse>  responseList = jdbcOperations.query(sql, new ReporteParticipantesInscritosMapper());

        return responseList;
    }



    public List<MedioDeAsignacionResponse> medioDeAsignacionEvento(String sql){

        List<MedioDeAsignacionResponse>  responseList = jdbcOperations.query(sql, new MedioDeAsignacionMapper());

        return responseList;
    }
}
