package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.entity.Clase;
import com.asi.inscripciones.mvp.entity.ClaseAlumno;
import com.asi.inscripciones.mvp.entity.ClaseProfesor;
import com.asi.inscripciones.mvp.entity.Instancia;
import com.asi.inscripciones.mvp.entity.InstanciaSede;
import com.asi.inscripciones.mvp.entity.Sede;
import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.mapper.redis.InstanciaSedeMapper;
import com.asi.inscripciones.mvp.repository.ClaseRepository;
import com.asi.inscripciones.mvp.repository.InstanciaSedeProjection;
import com.asi.inscripciones.mvp.repository.InstanciaSedeRepository;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.GenerarClases;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstanciaSedeService  {

    @Autowired
    private final InstanciaSedeRepository instanciaSedeRepository;

    @Autowired
    private ClaseService claseService;

    @Autowired
    private ClaseProfesorService claseProfesorService;

    @Autowired
    private ContadorCupoService contadorCupoService;

    @Autowired
    private ClaseAlumnoService claseAlumnoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private InstanciaSedeMapper instanciaSedeMapper;

    public InstanciaSede save(final InstanciaSede instanciaSede){
        InstanciaSede instanciaSedeSave =instanciaSedeRepository.save(instanciaSede);
        return instanciaSedeSave;
    }

    public List<InstanciaSede> allAvailable() {
        return (List<InstanciaSede>) instanciaSedeRepository.getAllAvailable();
    }

    public List<InstanciaSede> all() {
        return (List<InstanciaSede>) instanciaSedeRepository.getAll();
    }

    public InstanciaSede getByID(final Long id){
        Optional<InstanciaSede> instanciaSedeOp = instanciaSedeRepository.findById(id);
        InstanciaSede instanciaSede  = instanciaSedeOp.orElseThrow(()->new EntityNotFoundException(String.valueOf(id)));
        instanciaSede.setClase(claseService.getByInstanciaSedeId(id));
        return instanciaSede;
    }

    public InstanciaSede getByIdInstanciaSede(final Long id){
        Optional<InstanciaSedeProjection> instanciaSedeProjectionOptional = instanciaSedeRepository.getProjectionById(id);
        if (instanciaSedeProjectionOptional.isPresent())
            return instanciaSedeMapper.convertToInstanciaSede(instanciaSedeProjectionOptional.get());
        else
            return null;
    }

    public List<InstanciaSede> getByInstanciaId(final Long instaciaId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaId(instaciaId);

        instanciaSedeList.forEach(item->{
            item.setClase(claseService.getByInstanciaSedeId(item.getId()));
        });

        return instanciaSedeList;
    }

    public List<InstanciaSede> findByIdWhitClass(final Long instaciaId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaId(instaciaId);

        instanciaSedeList.forEach(item->{
            item.setClaseDTOMapper(claseService.getClaseByInstanciaSede(item.getId()));
        });

        return instanciaSedeList;
    }

    public List<InstanciaSede> findForInscription(final Long instaciaId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaId(instaciaId);

        instanciaSedeList.forEach(item->{
            item.setClaseDTOMapper(claseService.getClaseByInstanciaSedeForInscription(item.getId()));
        });

        return instanciaSedeList;
    }

    
    public List<InstanciaSede> findForInscriptionWithoutClass(final Long instaciaId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaId(instaciaId);

        return instanciaSedeList;
    }

    public List<InstanciaSede> findForInscriptionAndSedeWithoutClass(final Long instaciaId, final Long sedeId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaAndSedeId(instaciaId, sedeId);

        return instanciaSedeList;
    }


    public List<InstanciaSede> getByInstanciaIdAndSedeId(final Long instaciaId, final Long sedeId){
        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaAndSedeId(instaciaId,sedeId);

        instanciaSedeList.forEach(item->{
            item.setClase(claseService.getByInstanciaSedeId(item.getId()));
        });

        return instanciaSedeList;
    }

    public List<InstanciaSede> getByInstanciaIdAndSedeIdData(final Long instaciaId, final Long sedeId){
        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaAndSedeId(instaciaId,sedeId);

        instanciaSedeList.forEach(item->{
            item.setClase(claseService.getByInstanciaSedeIdData(item.getId()));
        });

        return instanciaSedeList;
    }

    public List<DiaDTO> loadClaseSedes(final InstanciaSede instanciaSede){

        List<DiaDTO> diasList = new ArrayList<>();

        diasList.add(DiaDTO.builder().dia(Constante.DOMINGO).value(instanciaSede.getDomingo()).label(Constante.DOMINGO).build());
        diasList.add(DiaDTO.builder().dia(Constante.LUNES).value(instanciaSede.getLunes()).label(Constante.LUNES).build());
        diasList.add(DiaDTO.builder().dia(Constante.MARTES).value(instanciaSede.getMartes()).label(Constante.MARTES).build());
        diasList.add(DiaDTO.builder().dia(Constante.MIERCOLES).value(instanciaSede.getMiercoles()).label(Constante.MIERCOLES).build());
        diasList.add(DiaDTO.builder().dia(Constante.JUEVES).value(instanciaSede.getJueves()).label(Constante.JUEVES).build());
        diasList.add(DiaDTO.builder().dia(Constante.VIERNES).value(instanciaSede.getViernes()).label(Constante.VIERNES).build());
        diasList.add(DiaDTO.builder().dia(Constante.SABADO).value(instanciaSede.getSabado()).label(Constante.SABADO).build());

        return diasList;
    }


    List<InstanciaSede> getByProfesorAndSedeAndInscripcionAndInstancia(final Long profesorId, final Long sedeId, final Long inscripcionId, final Long instanciaId){

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getByProfesorAndSedeAndInscripcionAndInstancia(profesorId, sedeId, inscripcionId, instanciaId);

        List<InstanciaSede> instanciaSedeList = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede()).collect(Collectors.toSet()).stream().toList();

        return instanciaSedeList;
    }


    public List<InstanciaSedeDTOResponse> getDisponibleById(final Long id){

        List<InstanciaSedeDTOResponse> instanciaSedeDTOResponse = new ArrayList<>();

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaIdSecond(id);

        List<InstanciaSede> newInstancias = new ArrayList<>();

        for(InstanciaSede instanciaSede : instanciaSedeList){
            Mono<ContadorCupo> response = contadorCupoService.findByInstanciaSedeId(instanciaSede.getId());
            Integer counter = response.blockOptional().orElse(new ContadorCupo()).getCounter();
            Integer counterTernario = counter == null ? 0 : counter;

            List<Clase> claseList = claseService.findByInstanciaSedeId(instanciaSede.getId());

            if(counterTernario < instanciaSede.getCupos()){
                LocalDate fechaInicioReal = claseList.get(0).getFecha();
                instanciaSede.getInstancia().setFechaInicio(fechaInicioReal);
                newInstancias.add(instanciaSede);
            }
        }
        instanciaSedeDTOResponse = convertListInstanciaSedeDTO(newInstancias);
        return instanciaSedeDTOResponse;
    }


    private List<Integer> getDiaInteger(InstanciaSede instanciaSede){
        List<Integer> diaClaseList= new ArrayList<>();

        if (instanciaSede.getLunes() == 1){
            diaClaseList.add(Calendar.MONDAY);
        }

        if (instanciaSede.getMartes() == 1){
            diaClaseList.add(Calendar.TUESDAY);
        }

        if (instanciaSede.getMiercoles() == 1){
            diaClaseList.add(Calendar.WEDNESDAY);
        }

        if (instanciaSede.getJueves() == 1){
            diaClaseList.add(Calendar.THURSDAY);
        }

        if (instanciaSede.getViernes() == 1){
            diaClaseList.add(Calendar.FRIDAY);
        }

        if (instanciaSede.getSabado() == 1){
            diaClaseList.add(Calendar.SATURDAY);
        }

        if (instanciaSede.getDomingo() == 1){
            diaClaseList.add(Calendar.SUNDAY);
        }

        return diaClaseList;
    }

    public List<InstanciaSedeDTOResponse> convertListInstanciaSedeDTO(List<InstanciaSede> instanciaSedeList){

        List<InstanciaSedeDTOResponse> instanciaSedeDTOList = new ArrayList<>();

        for(InstanciaSede instanciaSede : instanciaSedeList){

            InstanciaSedeDTOResponse instanciaSedeDTOResponse = InstanciaSedeDTOResponse.builder()
                    .id(instanciaSede.getId())
                    .cupos(instanciaSede.getCupos())
                    .horaFin(instanciaSede.getHoraFin())
                    .horaInicio(instanciaSede.getHoraInicio())
                    .instancia(instanciaSede.getInstancia())
                    .sede(instanciaSede.getSede())
                    .fechaInicio(instanciaSede.getInstancia().getFechaInicio())
                    .lunes(instanciaSede.getLunes())
                    .martes(instanciaSede.getMartes())
                    .miercoles(instanciaSede.getMiercoles())
                    .jueves(instanciaSede.getJueves())
                    .viernes(instanciaSede.getViernes())
                    .sabado(instanciaSede.getSabado())
                    .domingo(instanciaSede.getDomingo())
                    .build();

            instanciaSedeDTOList.add(instanciaSedeDTOResponse);

        }

        return instanciaSedeDTOList;
    }


    public List<InstanciaSedeDataDTO> convertListInstanciaSedeDataDTO(List<InstanciaSede> instanciaSedeList){

        List<InstanciaSedeDataDTO> instanciaSedeDTOList = new ArrayList<>();


        for(InstanciaSede instanciaSede : instanciaSedeList) {

            String sedeNombre = instanciaSede.getSede().getNombre();
            Integer cupos = instanciaSede.getCupos();

            List<ClaseProfesorDTO> claseProfesorDTOList = new ArrayList<>();
            for(Clase clase : instanciaSede.getClase()){

                if(clase.getClaseProfesor()!=null)
                    for(ClaseProfesor claseProfesor :  clase.getClaseProfesor()){
                        claseProfesorDTOList = new ArrayList<>();

                        claseProfesorDTOList.add(
                                ClaseProfesorDTO
                                        .builder()
                                        .nombre( claseProfesor.getUsuario().getNombre())
                                        .apellido( claseProfesor.getUsuario().getApellido())
                                        .email( claseProfesor.getUsuario().getEmail())
                                        .build());
                    }
            }

            instanciaSedeDTOList.add(InstanciaSedeDataDTO
                    .builder()
                    .id(instanciaSede.getSede().getId())
                    .nombreSede(sedeNombre)
                    .cupos(cupos)
                    .claseProfesors(claseProfesorDTOList)
                    .build());

        }

        return instanciaSedeDTOList;
    }

    public List<InstanciaSede> getByInstancia(final Long instanciaId, final Pageable pageable){
        List<InstanciaSede> sedeList = instanciaSedeRepository.getByInstancia(instanciaId,pageable);
        return sedeList;
    }

    public long getByInstanciaCount(final Long instanciaId){
        return instanciaSedeRepository.getByInstanciaCount(instanciaId);
    }

    public long getByInscripcionCount(final Long inscripcionId){
        return instanciaSedeRepository.getByInscripcionCount(inscripcionId);
    }


    public InstanciaSedeDTO convertToDTO(InstanciaSede entity){

        List<ClaseDTO> claseDTOList = new ArrayList<>();
        /* Buscar Clases */
        List<Clase> claseList = claseService.getByInstanciaSedeId(entity.getId());
        for(Clase clase : claseList){
            ClaseDTO claseDto = claseService.convertToClaseDTO(clase);
            claseDTOList.add(claseDto);
        }
        List<FechaDiasDTO> fechaDiasList = multiScheduleFechaDias(claseDTOList);

        InstanciaSedeDTO dto = InstanciaSedeDTO.builder()
                .id(entity.getId())
                .sedeNomnbre(entity.getSede().getNombre())
                .instanciaNombre(entity.getInstancia().getNombre())
                .horaFin(entity.getHoraFin())
                .horaInicio(entity.getHoraInicio())
                .fechaDiasList(fechaDiasList)
                .build();

        return dto;
    }

    public List<InstanciaSedeDTO> convertToDTOList(List<InstanciaSede> entity){

        List<InstanciaSedeDTO> list = new ArrayList<>();

        for(InstanciaSede sede : entity){
            list.add(convertToDTO(sede));
        }

        return list;
    }

    public AsistenciaDTO validateStudentAndGetInstanciaSede(final Long id, final String cuil){
        LocalDate today = LocalDate.now();
        AsistenciaDTO asistenciaDTO = new AsistenciaDTO();
        Usuario usuario = usuarioService.findUsuarioByCuil(cuil);
        if(usuario != null){
            Optional<InstanciaSede> instanciaSedeOp = instanciaSedeRepository.findById(id);
            InstanciaSede instanciaSede  = instanciaSedeOp.orElseThrow(()->new EntityNotFoundException(String.valueOf(id)));
            instanciaSede.setClase(claseService.getByInstanciaSedeIdAndDate(id,today));
            if(!instanciaSede.getClase().isEmpty()){
                List<Long> listaIds = instanciaSede.getClase().stream().map(Clase::getId).collect(Collectors.toList());
                List<ClaseAlumno> claseAlumno = claseAlumnoService.getStudentByCuilAndClaseId(listaIds, cuil);
                if(!claseAlumno.isEmpty()){
                    asistenciaDTO.setAlumnoId(claseAlumno.get(0).getUsuario().getId());
                    asistenciaDTO.setInstanciaSede(instanciaSede);
                    asistenciaDTO.setStatus(200);
                }else{
                    asistenciaDTO.setStatus(404);
                }
            }else{
                asistenciaDTO.setStatus(404);
            }
        }else{
            asistenciaDTO.setStatus(500);
        }

        return asistenciaDTO;
    }

    public List<InstanciaSede> getInstanciaSedeByInscripcion(Long id, final Pageable pageable){

        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.getByInscripcion(id, pageable);

        return instanciaSedeList;

    }

    public List<FechaDiasDTO> convertObjectList(Clase clase){
        List<FechaDiasDTO> fechaDiasList = new ArrayList<>();


        return fechaDiasList;
    }

    public List<FechaDiasDTO> multiScheduleFechaDias(List<ClaseDTO> claseList) {
        Map<String, Set<String>> hourToDaysMap = new HashMap<>();
        List<FechaDiasDTO> fechaDiasDTOList = new ArrayList<>();
        Map<String, Integer> dayToNumber = new HashMap<>();
        dayToNumber.put("Lunes", 1);
        dayToNumber.put("Martes", 2);
        dayToNumber.put("Miercoles", 3);
        dayToNumber.put("Jueves", 4);
        dayToNumber.put("Viernes", 5);
        dayToNumber.put("Sabado", 6);
        dayToNumber.put("Domingo", 7);

        for (ClaseDTO clase : claseList) {
            String hourRange = clase.getHoraInicio() + " a " + clase.getHoraFin();
            hourToDaysMap
                    .computeIfAbsent(hourRange, key -> new HashSet<>())
                    .add(clase.getDia());
        }

        for (Map.Entry<String, Set<String>> entry : hourToDaysMap.entrySet()) {
            String hourRange = entry.getKey();
            Set<String> days = entry.getValue();

            List<String> sortedDays = new ArrayList<>(days);
            sortedDays.sort(Comparator.comparingInt(dayToNumber::get));

            String dayStr = String.join(" - ", sortedDays);

            FechaDiasDTO fechaDiasDTO = new FechaDiasDTO();
            fechaDiasDTO.setDias(dayStr);
            fechaDiasDTO.setHorario(hourRange);
            fechaDiasDTOList.add(fechaDiasDTO);
        }

        return fechaDiasDTOList;
    }

    public InstanciaSede getByIDWithoutClass(final Long id){
        Optional<InstanciaSede> instanciaSedeOp = instanciaSedeRepository.findById(id);
        InstanciaSede instanciaSede  = instanciaSedeOp.orElseThrow(()->new EntityNotFoundException(String.valueOf(id)));
        instanciaSede.setClase(claseService.getByInstanciaSedeIdData(id));
        return instanciaSede;
    }

}
