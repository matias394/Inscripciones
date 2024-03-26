package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.report.*;
import com.asi.inscripciones.mvp.repository.ReportesRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReporteService {


    final private ReportesRepository reportesRepository;


    public List<ReporteEventoResponse> reporteAsistencia(ReporteEventoRequest request) {

        String sqlSelect="SELECT \n" +
                "    DISTINCT ins.ID, I.NOMBRE AS NOMBRE_EVENTO, ins.FECHA_INICIO,\n" +
                "    CA.ASISTENCIA, U.NOMBRE AS NOMBRE_ALUMNO, U.APELLIDO AS APELLIDO_ALUMNO, \n" +
                "    U.EMAIL, ins.FECHA_INICIO, U.CUIL \n" +
                "FROM INSCRIPCION I \n" +
                "INNER JOIN INSTANCIA ins ON I.ID = ins.INSCRIPCION_ID \n" +
                "INNER JOIN CLASE_SEDE cla ON ins.ID = cla.INSTANCIA_ID \n" +
                "INNER JOIN SEDE SE ON cla.SEDE_ID = SE.ID \n" +
                "INNER JOIN CLASE_ALUMNO CA ON cla.ID = CA.CLASE_SEDE_ID \n" +
                "INNER JOIN USUARIO U ON U.ID = CA.USUARIO_ID \n";


        String sqlWhere = "WHERE I.TIPO_ID = 0 \n" +
                "AND ins.FECHA_INICIO < CURRENT_DATE";

        if(ObjectUtils.isNotEmpty(request.getInstanciaId()))
            sqlWhere+=" AND ins.ID ="+request.getInstanciaId();

        if(ObjectUtils.isNotEmpty(request.getUsuarioId()))
            sqlWhere+=" AND U.ID ="+request.getUsuarioId();

        if(ObjectUtils.isNotEmpty(request.getAsistencia()))
            sqlWhere+=" AND CA.ASISTENCIA ="+request.getAsistencia();

        if(ObjectUtils.isNotEmpty(request.getSedeId()))
            sqlWhere+=" AND SE.ID ="+request.getSedeId();

        if(ObjectUtils.isNotEmpty(request.getFechaInicio()) && ObjectUtils.isNotEmpty(request.getFechaFin()))
            sqlWhere+=" AND (ins.FECHA_INICIO >= TO_DATE('"+request.getFechaInicio()+"','yyyy-mm-dd') " +
                            " AND ins.FECHA_INICIO <= TO_DATE('"+request.getFechaFin()+"','yyyy-mm-dd')) ";


        String sql = sqlSelect + sqlWhere;

        List<ReporteEventoResponse> responseList = reportesRepository.reporteAsistenciaEvento(sql);

        return  responseList;
    }


    public List<ReporteParticipanteInscritosResponse> reporteInscritos(ReporteParticipanteInscritosRequest request) {

        String sqlSelect="SELECT \n" +
                "    DISTINCT ins.ID, I.NOMBRE AS NOMBRE_EVENTO, ins.FECHA_INICIO,\n" +
                "    CA.ASISTENCIA, U.NOMBRE AS NOMBRE_ALUMNO, U.APELLIDO AS APELLIDO_ALUMNO, \n" +
                "    U.EMAIL, ins.FECHA_INICIO, U.CUIL \n" +
                " FROM INSCRIPCION I \n" +
                " INNER JOIN INSTANCIA ins ON I.ID = ins.INSCRIPCION_ID \n" +
                " INNER JOIN CLASE_SEDE cla ON ins.ID = cla.INSTANCIA_ID \n" +
                " INNER JOIN SEDE SE ON cla.SEDE_ID = SE.ID \n" +
                " INNER JOIN CLASE_ALUMNO CA ON cla.ID = CA.CLASE_SEDE_ID \n" +
                " INNER JOIN USUARIO U ON U.ID = CA.USUARIO_ID \n";


        String sqlWhere = "WHERE I.TIPO_ID = 0 ";

        if(ObjectUtils.isNotEmpty(request.getInstanciaId()))
            sqlWhere+=" AND ins.ID ="+request.getInstanciaId();

        if(ObjectUtils.isNotEmpty(request.getUsuarioId()))
            sqlWhere+=" AND U.ID ="+request.getUsuarioId();

        if(ObjectUtils.isNotEmpty(request.getSedeId()))
            sqlWhere+=" AND SE.ID ="+request.getSedeId();

        if(ObjectUtils.isNotEmpty(request.getFechaInicio()) && ObjectUtils.isNotEmpty(request.getFechaFin()))
            sqlWhere+=" AND (ins.FECHA_INICIO >= TO_DATE('"+request.getFechaInicio()+"','yyyy-mm-dd') " +
                    " AND ins.FECHA_INICIO <= TO_DATE('"+request.getFechaFin()+"','yyyy-mm-dd')) ";


        String sql = sqlSelect + sqlWhere;

        List<ReporteParticipanteInscritosResponse> responseList = reportesRepository.reporteParticipanteInscritoEvento(sql);

        return  responseList;
    }


    public List<MedioDeAsignacionResponse> medioDeAsignacionEvento(MedioDeAsignacionRequest request) {

        String sqlSelect="SELECT \n" +
                "    DISTINCT ins.ID, I.NOMBRE AS NOMBRE_EVENTO, ins.FECHA_INICIO,\n" +
                "    CA.ASISTENCIA, U.NOMBRE AS NOMBRE_ALUMNO, U.APELLIDO AS APELLIDO_ALUMNO, \n" +
                "    U.EMAIL, ins.FECHA_INICIO, U.CUIL \n" +
                " FROM INSCRIPCION I \n" +
                " INNER JOIN INSTANCIA ins ON I.ID = ins.INSCRIPCION_ID \n" +
                " INNER JOIN MODALIDAD MO ON ins.MODALIDAD_ID = MO.ID \n" +
                " INNER JOIN CLASE_SEDE cla ON ins.ID = cla.INSTANCIA_ID \n" +
                " INNER JOIN CLASE_ALUMNO CA ON cla.ID = CA.CLASE_SEDE_ID \n" +
                " INNER JOIN USUARIO U ON U.ID = CA.USUARIO_ID \n";


        String sqlWhere = "WHERE I.TIPO_ID = 0 ";

        if(ObjectUtils.isNotEmpty(request.getInstanciaId()))
            sqlWhere+=" AND ins.ID ="+request.getInstanciaId();

        if(ObjectUtils.isNotEmpty(request.getUsuarioId()))
            sqlWhere+=" AND U.ID ="+request.getUsuarioId();

        if(ObjectUtils.isNotEmpty(request.getModalidadId()))
            sqlWhere+=" AND MO.ID ="+request.getModalidadId();

        if(ObjectUtils.isNotEmpty(request.getFechaInicio()) && ObjectUtils.isNotEmpty(request.getFechaFin()))
            sqlWhere+=" AND (ins.FECHA_INICIO >= TO_DATE('"+request.getFechaInicio()+"','yyyy-mm-dd') " +
                    " AND ins.FECHA_INICIO <= TO_DATE('"+request.getFechaFin()+"','yyyy-mm-dd')) ";


        String sql = sqlSelect + sqlWhere;

        List<MedioDeAsignacionResponse> responseList = reportesRepository.medioDeAsignacionEvento(sql);

        return  responseList;
    }



}
