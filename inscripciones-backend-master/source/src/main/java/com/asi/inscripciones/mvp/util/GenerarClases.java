package com.asi.inscripciones.mvp.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class GenerarClases {



    public static List<LocalDate> generar(LocalDate dateStart, LocalDate endStart, int diaDeLaSemana){

        Calendar calendarStart = convertLocalDateToCalendar(dateStart);
        Calendar calendarEnd = convertLocalDateToCalendar(endStart);

        List<LocalDate> fecha = generar(calendarStart,calendarEnd,diaDeLaSemana);

        return fecha;
    }


    private static List<LocalDate> generar(Calendar calendarStart, Calendar calendarEnd, int diaDeLaSemana) {
        calendarStart.setFirstDayOfWeek(Calendar.SUNDAY); // Establecer el Lunes como primer día de la semana
        List<LocalDate> fecha = new ArrayList<>();

        while(calendarStart.before(calendarEnd) || calendarStart.equals(calendarEnd)) {
            if (calendarStart.get(Calendar.DAY_OF_WEEK) == diaDeLaSemana){
                fecha.add(convertCalendarToLocalDate(calendarStart));
            }
            calendarStart.add(Calendar.DAY_OF_WEEK,1);
        }

        return fecha;
    }



    private static Calendar convertLocalDateToCalendar(LocalDate localDate){

        ZoneId zoneId = ZoneId.systemDefault();

        Date date = Date.from(localDate.atStartOfDay(zoneId).toInstant());

        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);

        return calendar;
    }


    private static LocalDate convertCalendarToLocalDate(Calendar calendar){

        LocalDate localDate = LocalDate.ofInstant(calendar.toInstant(), ZoneId.systemDefault());

        return localDate;
    }

}
