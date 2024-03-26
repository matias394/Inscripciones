package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.repository.*;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.GenerarClases;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Query;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClaseService {

    @Autowired
    final private ClaseRepository claseRepository;

    @Autowired
    private ClaseAlumnoService claseAlumnoService;

    @Autowired
    private ClaseProfesorService claseProfesorService;

    @Autowired
    private InstanciaService instanciaService;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    private final EntityManager entityManager;



    public Clase save(final Clase clase){
        Clase claseSave = claseRepository.save(clase);
        return claseSave;
    }

    public void saveAll(final List<Clase> claseList){
        claseRepository.saveAll(claseList);
    }

    public ClaseDetalleDTO getDetalleClase(Clase clase, ClaseDTO claseDTO){

        ClaseDetalleDTO claseDetalleDTO = new ClaseDetalleDTO();
        claseDetalleDTO.setNombreInstancia(claseRepository.findInstanciaNameByClaseID(clase.getId()));
        claseDetalleDTO.setNombreInscripcion(claseRepository.findInscripcionNameByClaseID(clase.getId()));
        claseDetalleDTO.setNombreClase(clase.getNombre());
        claseDetalleDTO.setClaseDTO(claseDTO);

        return claseDetalleDTO;
    }

    public ClaseInstanciaDTO getDetalleInstancia(final Long instanciaId, List<ClaseDTO> claseDTOList){

        Instancia instancia = instanciaService.findInstanciaById(instanciaId);

        ClaseInstanciaDTO claseInstanciaDTO = new ClaseInstanciaDTO();
        claseInstanciaDTO.setNombreInstancia(instancia.getNombre());
        claseInstanciaDTO.setNombreInscripcion(instancia.getInscripcion().getNombre());
        claseInstanciaDTO.setClaseDTO(claseDTOList);

        return claseInstanciaDTO;
    }


    public ClaseInstanciaDTO getByInstanciaSede(Long instanciaSedeId){

        List<ClaseDTO> claseDTOList = new ArrayList<>();
        InstanciaSede instanciaSede = instanciaSedeService.getByID(instanciaSedeId);

        for (Clase clase: instanciaSede.getClase()) {

            String nombreProfesores="";
            List<ClaseProfesor> claseProfesorList = clase.getClaseProfesor();

            if(!claseProfesorList.isEmpty()){
                Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

                nombreProfesores = claseProfesorSet.stream()
                        .map(record->record.getUsuario().getNombre() +" "+record.getUsuario().getApellido())
                        .collect(Collectors.joining(", "));
            }

            ClaseDTO claseDTO = ClaseDTO.builder()
                    .nombre(instanciaSede.getInstancia().getNombre()+", "+ clase.getNombre())
                    .fechaInicio(instanciaSede.getInstancia().getFechaInicio())
                    .fechaFin(instanciaSede.getInstancia().getFechaFin())
                    .id(clase.getId())
                    .nombreProfesores(nombreProfesores)
                    .fecha(clase.getFecha())
                    .sede(clase.getInstanciaSede().getSede().getNombre())
                    .build();

            claseDTOList.add(claseDTO);
        }

        ClaseInstanciaDTO claseInstanciaDTO = new ClaseInstanciaDTO();
        claseInstanciaDTO.setNombreInstancia(instanciaSede.getInstancia().getNombre());
        claseInstanciaDTO.setNombreInscripcion(instanciaSede.getInstancia().getInscripcion().getNombre());
        claseInstanciaDTO.setClaseDTO(claseDTOList);

        return claseInstanciaDTO;

    }


    public List<ClaseDTO> getDTOListByInstanciaId(Long instanciaId){

        List<ClaseDTO> claseDTOList = new ArrayList<>();
        List<Clase> claseList = claseRepository.findByInstanciaId(instanciaId);
        Instancia instancia = instanciaService.findInstanciaById(instanciaId);

        claseList.forEach(item->{

            Clase clase = getClaseById(item.getId());

            String nombreProfesores="";
            List<ClaseProfesor> claseProfesorList = clase.getClaseProfesor();

            if(!claseProfesorList.isEmpty()){
                Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

                nombreProfesores = claseProfesorSet.stream()
                        .map(record->record.getUsuario().getNombre() +" "+record.getUsuario().getApellido())
                        .collect(Collectors.joining(", "));
            }


            ClaseDTO claseDTO = ClaseDTO.builder()
                    .nombre(instancia.getNombre()+", "+ clase.getNombre())
                    .fechaInicio(instancia.getFechaInicio())
                    .fechaFin(instancia.getFechaFin())
                    .id(clase.getId())
                    .nombreProfesores(nombreProfesores)
                    .fecha(item.getFecha())
                    .sede(clase.getInstanciaSede().getSede().getNombre())
                    .build();

            claseDTOList.add(claseDTO);
        });



        return claseDTOList;
    }



    public Clase getClaseById(final Long id){

        Optional<Clase> clase = claseRepository.findById(id);

        clase.orElseThrow(()->new EntityNotFoundException(String.valueOf(id)));

        List<ClaseProfesor> claseProfesor = claseProfesorService.getByClaseId(id);

        List<ClaseAlumno> claseAlumnos = claseAlumnoService.getByClaseId(id);

        clase.get().setClaseProfesor(claseProfesor);

        clase.get().setClaseAlumno(claseAlumnos);

        return clase.get();
    }


    @Transactional
    public Clase updateClase(final Clase clase){

        return claseRepository.save(clase);
    }



    public List<Clase> getByInstanciaId(Long instanciaId){

        List<Clase> claseList = claseRepository.findByInstanciaId(instanciaId);
        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }


    public ClaseDataDTO getClasesByIdForReport(final long instanciaSedeId, final Long claseId) {

        Set<Usuario> usuarioSet = new HashSet<>();
        List<ClaseAlumno> claseAlumnoList = new ArrayList<>();
        List<ClaseAlumnoDTO> resultList = new ArrayList<>();
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);

        Clase clase = getClaseById(claseId);


        InstanciaSede instanciaSede = instanciaSedeService.getByID(instanciaSedeId);

        List<Clase> claseResultList = instanciaSede.getClase().stream().filter(item->item.getFecha().isEqual(clase.getFecha()) || item.getFecha().isBefore(clase.getFecha())).toList();

        claseResultList.forEach(item->claseAlumnoList.addAll(item.getClaseAlumno()));

        clase.getClaseAlumno().forEach(item->usuarioSet.add(item.getUsuario()));


        for (Usuario usuario : usuarioSet) {

            Long asistencias =  claseAlumnoList.stream().filter(item->(item.getAsistencia()==1 && item.getUsuario().getId().equals(usuario.getId()))).count();

            Long ausensias =  claseAlumnoList.stream().filter(item->(item.getAsistencia()==0 && item.getUsuario().getId().equals(usuario.getId()))).count();

            Long totalAsistencia = asistencias + ausensias;

            ClaseAlumno claseAlumno = claseAlumnoService.findByClaseIdUsiarioId(claseId,usuario.getId());

            if (claseAlumno.getEstado() != 1) {
                // Omitir inscripciones canceladas
                continue;
            }

            boolean asistio = claseAlumno.getAsistencia()>0?true:false;

            Float porcentaje = (float) 0;
            if (totalAsistencia > 0) {
                porcentaje = (float) ((asistencias * 100) / totalAsistencia);
            }


            ClaseAlumnoDTO claseAlumnoDTO = ClaseAlumnoDTO
                    .builder()
                    .id(usuario.getId())
                    .nombreApellido(usuario.getNombre() +" "+usuario.getApellido())
                    .email(usuario.getEmail())
                    .cuil(usuario.getCuil())
                    .asitencias(asistencias)
                    .asistio(asistio)
                    .ausencias(ausensias)
                    .porcentajeAsistencia(df.format(porcentaje))
                    .build();

            resultList.add(claseAlumnoDTO);

        }

        ClaseDataDTO claseDataDTO =  ClaseDataDTO.builder()
                .id(clase.getId())
                .nombreInstancia(clase.getInstanciaSede().getInstancia().getNombre())
                .nombreClase(clase.getNombre())
                .nombreSede(clase.getInstanciaSede().getSede().getNombre())
                .fecha(clase.getFecha())
                .horaInicio (clase.getHoraInicio())
                .horaFin(clase.getHoraFin())
                .fechaInicio(clase.getInstanciaSede().getInstancia().getFechaInicio())
                .fechaFinal(clase.getInstanciaSede().getInstancia().getFechaFin())
                .claseAlumnoDTOList(resultList)
                .build();

        return claseDataDTO;
    }


    public void softDeleteClaseAlumnoByUsuarioId(Long usuarioId, Long instanciaId){

        // Find all the Clase rows for the given instanciaId
        List<Clase> clases = getByInstanciaSedeId(instanciaId);

        // Loop over all the Clase rows
        for (Clase clase : clases) {
            // Soft-delete all the ClaseAlumno rows related to the current Clase row
            claseAlumnoService.softDeleteByClaseId(clase.getId(), usuarioId);
        }
    }


    public ClaseDataDTO getClasesByInstaciaId(final Long instanciaId){



        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);

        List<ClaseAlumnoDTO> resultList = new ArrayList<>();
        List<Clase> claseList = getByInstanciaSedeId(instanciaId);
        List<ClaseAlumno> claseAlumnoList = new ArrayList<>();
        Instancia instancia = instanciaService.getInstanciaById(instanciaId);



        claseList.forEach(item->claseAlumnoList.addAll(item.getClaseAlumno()));

        Set<Long> usuarioIdSet = claseAlumnoList.stream().map(item-> item.getUsuario().getId())
                .collect(Collectors.toSet());

        Set<Usuario> usuarioSet = new HashSet<>();

        for(Long id : usuarioIdSet) {
            usuarioSet.add(claseAlumnoList.stream()
                    .map(item->item.getUsuario())
                    .filter(item->item.getId().equals(id)).findFirst().get());
        }


        for (Usuario usuario : usuarioSet) {

            List<ClaseAlumno> usuarioListTest =  claseAlumnoList.stream().
                    filter(item->item.getUsuario().getId().equals(usuario.getId())).toList();

            Long asistencias =  usuarioListTest.stream().filter(item->item.getAsistencia()==1).count();

            Long ausensias =  usuarioListTest.stream().filter(item->item.getAsistencia()==0).count();

            Long totalAsistencia = asistencias + ausensias;

            Float porcentaje = (float) ((asistencias * 100) / totalAsistencia);

            ClaseAlumnoDTO claseAlumnoDTO = ClaseAlumnoDTO
                    .builder()
                    .id(usuario.getId())
                    .nombreApellido(usuario.getNombre() +" "+usuario.getApellido())
                    .email(usuario.getEmail())
                    .cuil(usuario.getCuil())
                    .asitencias(asistencias)
                    .ausencias(ausensias)
                    .porcentajeAsistencia(df.format(porcentaje))
                    .estado(usuario.getEstado())
                    .build();

            resultList.add(claseAlumnoDTO);
        }

        ClaseDataDTO claseDataDTO = ClaseDataDTO.builder()
                .nombreInstancia(instancia.getNombre())
                .claseAlumnoDTOList(resultList)
                .build();

        return claseDataDTO;
    }

    public List<Clase> getByInstanciaAndSede(final Long instanciaId, final Long sedeId){

        List<Clase> claseList = claseRepository.findByInstanciaAndSede(instanciaId,sedeId);

        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }

    public List<Clase> getByInstanciaAndSedeAndUsuario(final Long instanciaId, final Long sedeId, final Long profesorId){

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getByProfesorAndSedeAndInstancia(profesorId,sedeId,instanciaId);

        List<Clase> claseList = claseProfesorList.stream().map(ClaseProfesor::getClase).toList();

        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }



    public List<Clase> getByInstanciaSedeIdData(Long instanciaSedeId){

        List<Clase> claseList = claseRepository.findByInstanciaSedeId(instanciaSedeId);

        return claseList;
    }


    public List<Clase> getByInstanciaSedeId(Long instanciaSedeId){

        List<Clase> claseList = claseRepository.findByInstanciaSedeId(instanciaSedeId);
        claseList.parallelStream().forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }

    
    public List<ClaseDTOMapper> getClaseByInstanciaSede(Long instanciaSedeId){

        List<ClaseDTOMapper> claseList = claseRepository.findClaseByInstanciaSedeId(instanciaSedeId);
        return claseList;
    }

    public List<ClaseDTOMapper> getClaseByInstanciaSedeForInscription(Long instanciaSedeId){

        List<ClaseDTOMapper> claseList = claseRepository.findClaseByInstanciaSedeIdInscription(instanciaSedeId);
        return claseList;
    }

        public List<Clase> getByInstanciaSedeIdAndDate(Long instanciaSedeId, LocalDate date){

        List<Clase> claseList = claseRepository.findByInstanciaSedeIdAndDate(instanciaSedeId, date);
        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }


    public List<Clase> findByInstanciaSedeId(Long instanciaSedeId){

        List<Clase> claseList = claseRepository.findByInstanciaSedeId(instanciaSedeId);

        return claseList;
    }


    public List<Clase> getByInstanciaSedeId(final Long instanciaSedeId, final Long sedeId){

        List<Clase> claseList = claseRepository.findByInstanciaSedeAndSede(instanciaSedeId,sedeId);
        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        return claseList;
    }


    public List<Clase> getByInstanciaIdAndProfesorID(final Long instanciaId, final Long usuarioId){

        List<Clase> claseList = claseRepository.findByInstanciaId(instanciaId);

        claseList.forEach(clase->{
            List<ClaseAlumno> claseAlumnos= claseAlumnoService.getByClaseId(clase.getId());
            List<ClaseProfesor> claseProfesors = claseProfesorService.getByClaseId(clase.getId());
            clase.setClaseAlumno(claseAlumnos);
            clase.setClaseProfesor(claseProfesors);
        });

        List<Clase> claseResponse = new ArrayList<>();

        for (Clase clase: claseList) {

            for(ClaseProfesor claseProfesor : clase.getClaseProfesor()){

                if(claseProfesor.getUsuario().getId().equals(usuarioId)){
                    claseResponse.add(clase);
                    break;
                }
            }

        }


        return claseResponse;
    }

    public Clase getInstanciaById(Long claseId){

        Optional<Clase> clase = claseRepository.findById(claseId);

        if(clase.isPresent()){
            List<ClaseAlumno> claseAlumnoList = claseAlumnoService.getByClaseId(claseId);
            clase.get().setClaseAlumno(claseAlumnoList);
        }

        return clase.orElse(new Clase());
    }




    public String getNombreProfesor(Long claseId){

        Clase clase = getClaseById(claseId);
        String nombreProfesores="";

        List<ClaseProfesor> claseProfesorList = clase.getClaseProfesor();

        if(claseProfesorList.size()>0){

            Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

            nombreProfesores = claseProfesorSet.stream()
                    .map(record->record.getUsuario().getNombre() +" "+record.getUsuario().getApellido())
                    .collect(Collectors.joining(", "));
        }

        return nombreProfesores;
    }


    public InstanciaSedeDTO generate(GenerarClaseSedeDTO generarClaseSedeDTO){
        
        List<Integer> diaClaseList = getDiaInteger(generarClaseSedeDTO);

        List<ClaseDTO> claseDTOList = new ArrayList<>();

        diaClaseList.forEach(item->{

            String dia = getGenerateDay(item);

            List<LocalDate> fechaList = GenerarClases.generar(generarClaseSedeDTO.getVigenciaInicio(),generarClaseSedeDTO.getVigenciaFin(),item);

            fechaList.forEach(fecha->{
                ClaseDTO claseDTO = ClaseDTO.builder()
                        .fecha(fecha)
                        .dia(dia)
                        .horaInicio(generarClaseSedeDTO.getHoraInicio())
                        .horaFin(generarClaseSedeDTO.getHoraFin())
                        .build();

                claseDTOList.add(claseDTO);
            });
        });

        List<ClaseDTO> claseListSorted = claseDTOList.stream().sorted(Comparator.comparing(ClaseDTO::getFecha)).toList();

        int orden = 1;
        for (ClaseDTO item: claseListSorted){
            item.setNombre("Clase");
            orden++;
        }

        String descripcion = getDescriptionInstanciaSede(generarClaseSedeDTO.getDias(),generarClaseSedeDTO.getHoraInicio(),generarClaseSedeDTO.getHoraFin());

        LocalDate fechaFinInstanciaSede = ultimaFecha(claseListSorted);

        InstanciaSedeDTO instanciaSedeDTO = InstanciaSedeDTO.builder()
                .sede(generarClaseSedeDTO.getSede())
                .cupos(generarClaseSedeDTO.getCupos())
                .horaInicio(generarClaseSedeDTO.getHoraInicio())
                .horaFin(generarClaseSedeDTO.getHoraFin())
                .instanciaSedeDetalle(descripcion.toString())
                .claseDTOList(claseListSorted)
                .fechaFin(fechaFinInstanciaSede)
                .build();

        return instanciaSedeDTO;
    }



    public String getDescriptionInstanciaSede(List<DiaDTO> diaList, LocalTime dateBegin, LocalTime dateEnd){

        StringBuilder descripcion = new StringBuilder();

        descripcion
                .append(diaList.stream()
                    .filter(item->item.getValue().equals(1))
                    .map(DiaDTO::getLabel)
                    .collect(Collectors.joining(" - ")))
                .append(" de ")
                .append(dateBegin.toString())
                .append(" a ")
                .append(dateEnd.toString());

        return descripcion.toString();

    }


    public List<String> getDescriptionInstanciaSede(Map<LocalTime, List<InstanciaSede>> sedeService){

        List<String> responseList = new ArrayList<>();
        StringBuilder descripcion = new StringBuilder();



        sedeService.forEach((key,val)->{

            LocalTime localTime = key;

            List<DiaDTO> diaList = instanciaSedeService.loadClaseSedes(val.get(0));

            descripcion
                    .append(diaList.stream()
                            .filter(item->item.getValue().equals(1))
                            .map(DiaDTO::getLabel)
                            .collect(Collectors.joining(" - ")))
                    .append(" ")
                    .append(localTime);

            responseList.add(descripcion.toString());

        });


        return responseList;

    }


    private String getGenerateDay(Integer diaSemana){

        String dia = "";
        if (diaSemana.equals(2)){
            dia = "lunes";
        }else
        if (diaSemana.equals(3)){
            dia = "martes";
        }else
        if (diaSemana.equals(4)){
            dia = "miercoles";
        }else
        if (diaSemana.equals(5)){
            dia = "jueves";
        }else
        if (diaSemana.equals(6)){
            dia = "viernes";
        }else
        if (diaSemana.equals(7)){
            dia = "sabado";
        }else
        if (diaSemana.equals(1)){
            dia = "domingo";
        }

        return dia;
    }

    private List<Integer> getDiaInteger(GenerarClaseSedeDTO generarClaseSedeDTO){
        List<Integer> diaClaseList= new ArrayList<>();

        generarClaseSedeDTO.getDias().forEach(item->{
            if (item.getDia().equals("lunes") & item.getValue()==1){
                diaClaseList.add(Calendar.MONDAY);
            }else
            if (item.getDia().equals("martes") & item.getValue()==1){
                diaClaseList.add(Calendar.TUESDAY);
            }else
            if (item.getDia().equals("miercoles") & item.getValue()==1){
                diaClaseList.add(Calendar.WEDNESDAY);
            }else
            if (item.getDia().equals("jueves") & item.getValue()==1){
                diaClaseList.add(Calendar.THURSDAY);
            }else
            if (item.getDia().equals("viernes") & item.getValue()==1){
                diaClaseList.add(Calendar.FRIDAY);
            }else
            if (item.getDia().equals("sabado") & item.getValue()==1){
                diaClaseList.add(Calendar.SATURDAY);
            }else
            if (item.getDia().equals("domingo") & item.getValue()==1){
                diaClaseList.add(Calendar.SUNDAY);
            }
        });

        return diaClaseList;
    }

    public List<Clase> ordenarClases(List<Clase> claseList){

        return claseList.stream()
                .sorted(Comparator.comparing(Clase::getFecha))
                .collect(Collectors.toList());

    }

    public LocalDate getFechaPrimeraClase(List<ClaseDTO> claseDTOList){

        List<LocalDate> fechaPrimeraList = new ArrayList<>();
        for (ClaseDTO item : claseDTOList){
            LocalDate fecha = item.getFechaInicio();

            fechaPrimeraList.add(fecha);
            Collections.sort(fechaPrimeraList);
        }
        return fechaPrimeraList.get(0);

    }

    public LocalDate getFechaUltimaClase(List<ClaseDTO> claseDTOList){

        List<LocalDate> fechaUltimaList = new ArrayList<>();
        for (ClaseDTO item : claseDTOList){
            LocalDate fecha = item.getFechaInicio();

            fechaUltimaList.add(fecha);
            fechaUltimaList.sort(Collections.reverseOrder());
        }
        return fechaUltimaList.get(0);

    }

    public List<Clase>  getByProfesorAndSedeAndInscripcionAndInstanciaAndInstanciaSede(final Long profesorId, final Long sedeId, final Long inscripcionId, final Long instanciaId, final Long instanciaSedeId){

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getByProfesorAndSedeAndInscripcionAndInstanciaAndInstanciaSede(profesorId, sedeId, inscripcionId, instanciaId, instanciaSedeId);

        List<Clase> claseList = claseProfesorList.stream().map(item->item.getClase()).collect(Collectors.toSet()).stream().toList();

        return claseList;

    }

    public List<ListaDTO> getListaDTOClasesByInstanciaId(Long instanciaId){

        List<ListaDTO> alumnoslistaDTOS = new ArrayList<>();
        ClaseDataDTO claseAlumnoDTO = getClasesByInstaciaId(instanciaId);
        claseAlumnoDTO.getClaseAlumnoDTOList().forEach(item->{
            alumnoslistaDTOS.add(convertToDTO(item));

        });

        return alumnoslistaDTOS;
    }

    public ListaDTO convertToDTO(ClaseAlumnoDTO claseAlumnoDTO){

        ListaDTO listaDTO = ListaDTO.builder()
                .nombreApellido(claseAlumnoDTO.getNombreApellido())
                .cuilDniPas(claseAlumnoDTO.getCuil())
                .email(claseAlumnoDTO.getEmail())
                .id(claseAlumnoDTO.getId())
                .estado(claseAlumnoDTO.getEstado())
                .build();

        return listaDTO;
    }

    public static LocalDate ultimaFecha(List<ClaseDTO> classList) {
        if (classList == null || classList.isEmpty()) {
            return null;
        }

        LocalDate fechaMayor = classList.get(0).getFecha();

        for (ClaseDTO objeto : classList) {
            if (objeto.getFecha().compareTo(fechaMayor) > 0) {
                fechaMayor = objeto.getFecha();
            }
        }

        return fechaMayor;
    }

    public ClaseDTO convertToClaseDTO (Clase clase){
        ClaseDTO claseDTO = new ClaseDTO();
        claseDTO.setId(clase.getId());
        claseDTO.setNombre(clase.getNombre());
        claseDTO.setInstanciaSedeId(clase.getInstanciaSede().getId());
        claseDTO.setSede(clase.getInstanciaSede().getSede().getNombre());
        claseDTO.setFecha(clase.getFecha());
        if(clase.getLunes() == 1){
            claseDTO.setDia("Lunes");
        }else if(clase.getMartes() == 1){
            claseDTO.setDia("Martes");
        }else if(clase.getMiercoles() == 1){
            claseDTO.setDia("Miercoles");
        }else if(clase.getJueves() == 1){
            claseDTO.setDia("Jueves");
        }else if(clase.getViernes() == 1){
            claseDTO.setDia("Viernes");
        }else if(clase.getSabado() == 1){
            claseDTO.setDia("Sabado");
        }else if(clase.getDomingo() == 1){
            claseDTO.setDia("Domingo");
        }
        claseDTO.setNombreProfesores(getNombreProfesor(clase.getId()));
        claseDTO.setHoraInicio(clase.getHoraInicio());
        claseDTO.setHoraFin(clase.getHoraFin());
        return claseDTO;
    }


    public List<DiaDTO> converToDiaDTOList (Clase clase){
        List<DiaDTO> diaDTOList = new ArrayList<>();
            for (int i = 1; i <= 7; i++) {
            DiaDTO diaDTO = new DiaDTO();
            switch (i) {
                case 1:
                    diaDTO.setDia("lunes");
                    diaDTO.setLabel("Lunes");
                    diaDTO.setValue(clase.getLunes());
                    break;
                case 2:
                    diaDTO.setDia("martes");
                    diaDTO.setLabel("Martes");
                    diaDTO.setValue(clase.getMartes());
                    break;
                case 3:
                    diaDTO.setDia("miercoles");
                    diaDTO.setLabel("Miércoles");
                    diaDTO.setValue(clase.getMiercoles());
                    break;
                case 4:
                    diaDTO.setDia("jueves");
                    diaDTO.setLabel("Jueves");
                    diaDTO.setValue(clase.getJueves());
                    break;
                case 5:
                    diaDTO.setDia("viernes");
                    diaDTO.setLabel("Viernes");
                    diaDTO.setValue(clase.getViernes());
                    break;
                case 6:
                    diaDTO.setDia("sabado");
                    diaDTO.setLabel("Sábado");
                    diaDTO.setValue(clase.getSabado());
                    break;
                case 7:
                    diaDTO.setDia("domingo");
                    diaDTO.setLabel("Domingo");
                    diaDTO.setValue(clase.getDomingo());
                    break;
                }
            diaDTOList.add(diaDTO);
        }
        return diaDTOList;
    }

    public List<Clase> getByInstanciaSedeDates(final Long instanciaSedeId){

        List<Clase> claseList = claseRepository.findByInstanciaSedeId(instanciaSedeId);
        return claseList;
    }


    public List<FechaClasesEntityDTO> convertToFechaClases(List<Clase> claseList) {

        List<FechaClasesEntityDTO> fechaClasesDTOList = claseList.stream()
        .sorted(Comparator.comparing(Clase::getFecha))
        .collect(Collectors.groupingBy(Clase::getFecha, LinkedHashMap::new, Collectors.toList()))
        .entrySet().stream()
        .map(entry -> new FechaClasesEntityDTO(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());

        return fechaClasesDTOList;
    }


    public ClaseDataDTO getClaseReport(final long instanciaSedeId, final Long claseId) {

        Set<Usuario> usuarioSet = new HashSet<>();
        List<ClaseAlumnoDTO> resultList = new ArrayList<>();
        DecimalFormat df = new DecimalFormat();
        df.setMaximumFractionDigits(2);

        List<ClaseAlumno> claseAlumnoList = claseAlumnoService.getByClaseId(claseId);

        Clase clase = getClaseById(claseId);

        claseAlumnoList.forEach(item->usuarioSet.add(item.getUsuario()));

        for (Usuario usuario : usuarioSet) {

            Long asistencias =  claseAlumnoList.stream().filter(item->(item.getAsistencia()==1 && item.getUsuario().getId().equals(usuario.getId()))).count();

            Long ausensias =  claseAlumnoList.stream().filter(item->(item.getAsistencia()==0 && item.getUsuario().getId().equals(usuario.getId()))).count();

            Long totalAsistencia = asistencias + ausensias;

            ClaseAlumno claseAlumno = claseAlumnoService.findByClaseIdUsiarioId(claseId,usuario.getId());

            if (claseAlumno.getEstado() != 1) {
                continue;
            }

            boolean asistio = claseAlumno.getAsistencia()>0?true:false;

            Float porcentaje = (float) 0;
            if (totalAsistencia > 0) {
                porcentaje = (float) ((asistencias * 100) / totalAsistencia);
            }

            ClaseAlumnoDTO claseAlumnoDTO = ClaseAlumnoDTO
                    .builder()
                    .id(usuario.getId())
                    .nombreApellido(usuario.getNombre() +" "+usuario.getApellido())
                    .email(usuario.getEmail())
                    .cuil(usuario.getCuil())
                    .asitencias(asistencias)
                    .asistio(asistio)
                    .ausencias(ausensias)
                    .porcentajeAsistencia(df.format(porcentaje))
                    .build();

            resultList.add(claseAlumnoDTO);

        }

        ClaseDataDTO claseDataDTO =  ClaseDataDTO.builder()
                .id(clase.getId())
                .nombreInstancia(clase.getInstanciaSede().getInstancia().getNombre())
                .nombreClase(clase.getNombre())
                .nombreSede(clase.getInstanciaSede().getSede().getNombre())
                .fecha(clase.getFecha())
                .horaInicio (clase.getHoraInicio())
                .horaFin(clase.getHoraFin())
                .fechaInicio(clase.getInstanciaSede().getInstancia().getFechaInicio())
                .fechaFinal(clase.getInstanciaSede().getInstancia().getFechaFin())
                .claseAlumnoDTOList(resultList)
                .build();

        return claseDataDTO;
    }

    public ClaseInstanciaDTO getByInstanciaSedeOp(Long instanciaSedeId){

        List<ClaseDTO> claseDTOList = new ArrayList<>();
        InstanciaSede instanciaSede = instanciaSedeService.getByIDWithoutClass(instanciaSedeId);

        for (Clase clase: instanciaSede.getClase()) {

            String nombreProfesores="";
            List<ClaseProfesor> claseProfesorList = clase.getClaseProfesor();

            if(claseProfesorList != null && !claseProfesorList.isEmpty()){
                Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

                nombreProfesores = claseProfesorSet.stream()
                        .map(record->record.getUsuario().getNombre() +" "+record.getUsuario().getApellido())
                        .collect(Collectors.joining(", "));
            }

            ClaseDTO claseDTO = ClaseDTO.builder()
                    .nombre(instanciaSede.getInstancia().getNombre()+", "+ clase.getNombre())
                    .fechaInicio(instanciaSede.getInstancia().getFechaInicio())
                    .fechaFin(instanciaSede.getInstancia().getFechaFin())
                    .id(clase.getId())
                    .nombreProfesores(nombreProfesores)
                    .fecha(clase.getFecha())
                    .sede(clase.getInstanciaSede().getSede().getNombre())
                    .build();

            claseDTOList.add(claseDTO);
        }

        ClaseInstanciaDTO claseInstanciaDTO = new ClaseInstanciaDTO();
        claseInstanciaDTO.setNombreInstancia(instanciaSede.getInstancia().getNombre());
        claseInstanciaDTO.setNombreInscripcion(instanciaSede.getInstancia().getInscripcion().getNombre());
        claseInstanciaDTO.setClaseDTO(claseDTOList);

        return claseInstanciaDTO;

    }

}