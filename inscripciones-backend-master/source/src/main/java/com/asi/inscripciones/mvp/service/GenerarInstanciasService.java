package com.asi.inscripciones.mvp.service;


import com.asi.inscripciones.mvp.dto.GenerarInstanciasDTO;
import com.asi.inscripciones.mvp.dto.InstanciaDTO;
import com.asi.inscripciones.mvp.entity.Modalidad;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.time.temporal.ChronoUnit.WEEKS;


@Service
public class GenerarInstanciasService {

    @Autowired
    private ModalidadService modalidadService;

    public List<InstanciaDTO> generarInstancias(GenerarInstanciasDTO generarInstanciasDTO){

        List<InstanciaDTO> instanciaDTOList = new ArrayList<>();
        double validateNumberWeeks = 0;
        try{

            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String firstDay = generarInstanciasDTO.vigenciaInicio().format(dateTimeFormatter);
            String lastDay = generarInstanciasDTO.vigenciaFin().format(dateTimeFormatter);

            ZoneId defaultZoneId = ZoneId.systemDefault();
            Date dateCallFirst = Date.from(generarInstanciasDTO.vigenciaInicio().atStartOfDay(defaultZoneId).toInstant());
            Date dateCallLast = Date.from(generarInstanciasDTO.vigenciaFin().atStartOfDay(defaultZoneId).toInstant());

            Calendar calFirst = Calendar.getInstance();
            calFirst.setTime(dateCallFirst);
            Calendar calLast = Calendar.getInstance();
            calLast.setTime(dateCallLast);
            LocalDate myFirstDay = LocalDate.parse(firstDay);
            LocalDate myLastDay = LocalDate.parse(lastDay);

            long diasEntreFechas = ChronoUnit.DAYS.between(myFirstDay,myLastDay);

            validateNumberWeeks = (double) (diasEntreFechas + 1) / generarInstanciasDTO.duracionSemana();

            Modalidad modalidad = modalidadService.getModalidadById(generarInstanciasDTO.modalidad());

            if (validateNumberWeeks % 1 == 0) {
                int diffDays= 1;
                int instancia = 1;
                int inscriptionWeek = 7;
                Date firstDayCurso = new Date();
                Date lastDayInscription = new Date();
                int cursoDuracion = generarInstanciasDTO.duracionSemana() * inscriptionWeek;
                while (calFirst.before(calLast) || calFirst.equals(calLast)) {

                    if(instancia == 1){
                        firstDayCurso = calFirst.getTime();
                        Calendar lastDayIns = calFirst;
                        lastDayIns.add(Calendar.DATE, -generarInstanciasDTO.limiteInscripcion());
                        lastDayInscription = lastDayIns.getTime();
                        calFirst.setTime(firstDayCurso);
                    }

                    if(diffDays == cursoDuracion){
                        diffDays = 1;
                        instancia = 1;

                        LocalDate primerDiaCurso = firstDayCurso.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        LocalDate ultimoDiaCurso = calFirst.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        LocalDate ultimoDiaInscricion;

                        if(generarInstanciasDTO.limiteInscripcion() == 0){
                            ultimoDiaInscricion = calFirst.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        } else {
                            ultimoDiaInscricion = lastDayInscription.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        }


                        InstanciaDTO saveInstancia = InstanciaDTO.builder()
                                .vigenciaInicio(primerDiaCurso)
                                .vigenciaFin(ultimoDiaCurso)
                                .limiteInscripcion(ultimoDiaInscricion)
                                .modalidadName(modalidad.getNombre())
                                .estado(ConstanteEstados.ACTIVO)
                                .bloqueado(0)
                                .duracionSemana(generarInstanciasDTO.duracionSemana())
                                .build();


                        instanciaDTOList.add(saveInstancia);

                    }else{
                        diffDays++;
                        instancia++;
                    }
                    calFirst.add(Calendar.DATE, 1);
                }
            } else {

                throw new GenericException(CodigoError.E035.getCodigo(),CodigoError.E035.getMensaje());
            }

            for (InstanciaDTO item : instanciaDTOList){
                item.setNombre("Módulo ");
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return instanciaDTOList;
    }
}