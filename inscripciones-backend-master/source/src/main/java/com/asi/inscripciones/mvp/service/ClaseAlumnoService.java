package com.asi.inscripciones.mvp.service;


import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.repository.ClaseAlumnoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClaseAlumnoService {

    @Autowired
    final private ClaseAlumnoRepository claseAlumnoRepository;


    public List<ClaseAlumno> getByClaseId(final Long claseId){

        List<ClaseAlumno> claseAlumnoList = claseAlumnoRepository.findByClaseId(claseId);

        return  claseAlumnoList;
    }

    public ClaseAlumno getByClaseIdUsuarioId(final Long claseId, final Long usuarioId){
        ClaseAlumno claseAlumno = claseAlumnoRepository.findByClaseIdUsuarioId(claseId, usuarioId);
        return claseAlumno;
    }

    @Transactional
    public void updateAsistencia(final Long claseId, final Long usuarioId, final Integer asistencia){
        ClaseAlumno claseAlumno = claseAlumnoRepository.findByClaseIdUsuarioId(claseId,usuarioId);

        claseAlumno.setAsistencia(asistencia);
        claseAlumnoRepository.save(claseAlumno);

    }

    @Transactional
    public void updateAsistenciaAll(final AsistenciaRequestDTO asistenciaRequestDTO){


        List<UsuarioRequestDTO> alumnosListDTO = asistenciaRequestDTO.getAlumnos();
        alumnosListDTO.forEach(alumno->{
            ClaseAlumno claseAlumno = claseAlumnoRepository.findByClaseIdUsuarioId(asistenciaRequestDTO.getClaseid(), alumno.getUsuarioId());
            claseAlumno.setAsistencia(alumno.getAsistencia());
            claseAlumnoRepository.save(claseAlumno);
        });
    }

    public ClaseAlumno save(ClaseAlumno claseAlumno){
        claseAlumnoRepository.save(claseAlumno);
        return claseAlumno;
    }


    public List<ClaseAlumno> getStudentByCuilAndClaseId(final List<Long> claseId, final String cuil){
        List<ClaseAlumno> claseAlumno = claseAlumnoRepository.findByCuilAndClase(claseId, cuil);
        return claseAlumno;
    }

    public ClaseAlumno  findByClaseIdUsiarioId(final Long claseId, final Long usuarioId){
        return claseAlumnoRepository.findByClaseIdUsiarioId(claseId,usuarioId);
    }


    public void softDeleteByClaseId(final Long claseId, final Long usuarioId){
        claseAlumnoRepository.softDeleteByClaseId(claseId, usuarioId);
    }

}
