package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.ClaseMapper;
import com.asi.inscripciones.mvp.mapper.InstanciaMapper;
import com.asi.inscripciones.mvp.mapper.SedeMapper;
import com.asi.inscripciones.mvp.repository.ClaseRepository;
import com.asi.inscripciones.mvp.repository.InstanciaRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstanciaService {

    @Autowired
    final private InstanciaRepository instanciaRepository;

    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    @Autowired
    private ClaseService claseService;

    @Autowired
    private SedeService sedeService;

    @Autowired
    private InstanciaMapper instanciaMapper;

    @Autowired
    private ClaseMapper claseMapper;

    @Autowired
    private ClaseProfesorService claseProfesorService;



    public Instancia saveInstancia(final Instancia instancia){

        Instancia instanciaSave = instanciaRepository.save(instancia);

        List<InstanciaSede> instanciaSedeList = instancia.getInstanciaSede();

        if(instancia.getInstanciaSede() != null && !instancia.getInstanciaSede().isEmpty()){
            
        instanciaSedeList.forEach(item->item.setInstancia(instanciaSave));

        instanciaSedeList.forEach(item->{

            LocalDate lastDay = ultimaFecha(item.getClase());

            item.setFechaFin(lastDay);

            InstanciaSede instanciaSede = instanciaSedeService.save(item);

            if(item.getClase() != null){
                List<Clase> claseList = item.getClase();

                claseList.parallelStream().forEach(value->value.setInstanciaSede(instanciaSede));

                claseService.saveAll(claseList);
            }
        });
    }
        return instanciaSave;
    }

    public static LocalDate ultimaFecha(List<Clase> classList) {
        if (classList == null || classList.isEmpty()) {
            return null;
        }

        LocalDate fechaMayor = classList.get(0).getFecha();

        for (Clase objeto : classList) {
            if (objeto.getFecha().compareTo(fechaMayor) > 0) {
                fechaMayor = objeto.getFecha();
            }
        }

        return fechaMayor;
    }


    public Instancia findInstanciaInstanciaById(final Long id){
        Optional<Instancia> instancia = instanciaRepository.findById(id);
        return instancia.orElse(new Instancia());
    }

    public List<Instancia> getListByIdWhitClass(final Long id){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(id);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.findByIdWhitClass(id);
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }

    public Instancia getInstanciaById(final Long id){

        Instancia instancia = findInstanciaById(id);

        List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaId(id);

        instancia.setInstanciaSede(instanciaSedeList);

        return instancia;
    }




    public List<Instancia> findByIdInscripcionWhitInstanciaSede(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscricionWhitInstanciaSede(inscripcionId);

        
        return instanciaList;
    }

    public List<Instancia> findInstanciaListById(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(inscripcionId);

        return instanciaList;
    }


    public List<Instancia> findInstanciaByIdInscripcion(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(inscripcionId);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.findForInscriptionWithoutClass(instancia.getId());
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }

    

    public List<Instancia> findInstanciaByInscriptionAndSede(final Long inscripcionId, final Long sedeId){

        List<Instancia> instanciaList = instanciaRepository.findInstanciaBySedeAndEstado(inscripcionId, sedeId);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.findForInscriptionAndSedeWithoutClass(instancia.getId(), sedeId);
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }

    public List<Instancia> findByInscripcionIdForGetInscription(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(inscripcionId);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.findForInscription(instancia.getId());
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }
    

    public List<Instancia> getInstanciaByIdInscripcion(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcionAll(inscripcionId);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaId(instancia.getId());
            instancia.setNombreProfesores(getNombreProfesores(instancia.getId()));
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }

    public List<Instancia> getInstanciaByIdInscripcionAll(final Long inscripcionId){

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcionAll(inscripcionId);

        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaId(instancia.getId());
            instancia.setNombreProfesores(getNombreProfesores(instancia.getId()));
            instancia.setInstanciaSede(instanciaSedeList);
        }

        return instanciaList;
    }

    public List<Instancia> getInstanciaByIdInscripcionForFilterReport(final Long inscripcionId) {

        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcionAll(inscripcionId);

        return instanciaList;
    }

    public List<InstanciaCitizenDTO> getEntityfindByInscripcionId(Long inscripcionId){
        List<InstanciaCitizenDTO> instanciaCitizenDTOList = new ArrayList<>();
        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(inscripcionId);

            for(Instancia instancia : instanciaList){
                InstanciaCitizenDTO instanciaCitizenDTO = new InstanciaCitizenDTO();
                instanciaCitizenDTO.setId(instancia.getId());
                instanciaCitizenDTO.setNombreInstancia(instancia.getNombre());
                instanciaCitizenDTOList.add(instanciaCitizenDTO);
            }

        return instanciaCitizenDTOList;
    }


    public List<InstanciaCitizenDTO> getEntityfindByInscripcionId1(Long inscripcionId){
        List<InstanciaCitizenDTO> instanciaCitizenDTOList = new ArrayList<>();
        List<Instancia> instanciaList = instanciaRepository.findByIdInscripcion(inscripcionId);

        for(Instancia instancia : instanciaList){
            InstanciaCitizenDTO instanciaCitizenDTO = new InstanciaCitizenDTO();
            instanciaCitizenDTO.setId(instancia.getId());
            instanciaCitizenDTO.setNombreInstancia(instancia.getNombre());
            instanciaCitizenDTO.setNombreProfesores(getNombreProfesores(instancia.getId()));
            instanciaCitizenDTOList.add(instanciaCitizenDTO);
        }

        return instanciaCitizenDTOList;
    }



    public List<Instancia> getInstanciaByIdInscripcionAndSedeData(final Long inscripcionId, final Long sedeId){

        List<Instancia> instanciaList = instanciaRepository.findInstanciaBySede(inscripcionId,sedeId);

        List<Instancia> instanciaList1 = instanciaList.stream().collect(Collectors.toSet()).stream().toList();

        for(Instancia instancia : instanciaList1){

            List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaIdAndSedeIdData(instancia.getId(),sedeId);
            instancia.setInstanciaSede(instanciaSedeList);

        }

        return instanciaList1;
    }


    public List<Instancia> getInstanciaByIdInscripcionAndSede(final Long inscripcionId, final Long sedeId){

        List<Instancia> instanciaList = instanciaRepository.findInstanciaBySede(inscripcionId,sedeId);

        for(Instancia instancia : instanciaList){

            List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaIdAndSedeId(instancia.getId(),sedeId);
            instancia.setNombreProfesores(getNombreProfesores(instancia.getId()));
            instancia.setInstanciaSede(instanciaSedeList);

        }


        return instanciaList;
    }



    public List<Instancia> getInstanciaByIdInscripcionAndUsuario(final Long inscripcionId, final Long profesorId){

        List<Instancia> instanciaList = getInstanciaByIdInscripcion(inscripcionId);

        Iterator<Instancia>  instanciaIteratora = instanciaList.iterator();

        boolean existeInstancia = false;

        while(instanciaIteratora.hasNext()){

            Instancia instancia = instanciaIteratora.next();

            existeInstancia = instancia.getInstanciaSede().stream().anyMatch(item->{
                return item.getClase().stream().anyMatch(clase->{
                    return clase.getClaseProfesor().stream().anyMatch(profesor-> profesor.getUsuario().getId().equals(profesorId));
                });
            });

            if(existeInstancia){

                boolean existeInstanciaSede = false;

                Iterator<InstanciaSede> instanciaSedeIterator =  instancia.getInstanciaSede().iterator();

                while(instanciaSedeIterator.hasNext()) {

                    InstanciaSede instanciaSede =  instanciaSedeIterator.next();

                    existeInstanciaSede = instanciaSede.getClase().stream().anyMatch(clase->{
                        return clase.getClaseProfesor().stream().anyMatch(profesor-> profesor.getUsuario().getId().equals(profesorId));
                    });

                    if(existeInstanciaSede){

                        boolean existeProfesor = false;

                        Iterator<Clase> claseIterator =  instanciaSede.getClase().iterator();

                        while(claseIterator.hasNext()){

                            Clase clase = claseIterator.next();

                            existeProfesor = clase.getClaseProfesor().stream().anyMatch(profesor->profesor.getUsuario().getId().equals(profesorId));

                            if(!existeProfesor){
                                claseIterator.remove();
                            }
                        }

                    } else {
                        instanciaSedeIterator.remove();
                    }

                }

            } else {
                instanciaIteratora.remove();
            }

        }

        return instanciaList;
    }



    public List<Clase> getClaseSedeListByinstanciaId(final Long instanciaId){

        List<Clase> claseSedeList = claseService.getByInstanciaSedeId(instanciaId);

        return claseSedeList;
    }


    public void deleteByInscripcion(final Long idInscripcion){

        List<Instancia> instanciaList = getInstanciaByIdInscripcion(idInscripcion);
        instanciaList.forEach(instanciaRepository::delete);
    }



    public Instancia loadInstancia(final InstanciaDTO instanciaDTO){

        Instancia instancia = instanciaMapper.convertDtoToInstancia(instanciaDTO);
        instancia.setLimiteInscripcion(instanciaDTO.getLimiteInscripcion());


        return instancia;
    }

    public LocalDate generarFechaLimiteInscripcion(Integer limiteInscripcion, LocalDate fechaInicio, LocalDate fechaFin){
         LocalDate fecha = null;

         if (limiteInscripcion <= 0){
             fecha = fechaFin;
         } else {
             fecha = fechaInicio.minusDays(limiteInscripcion);
         }

        return fecha;
    }

    public void validList(final List<InstanciaDTO> instanciaDTOList, final Accion accion){

        for (InstanciaDTO instanciaDTO : instanciaDTOList) {
            valid(instanciaDTO,accion);
        }

    }


    public  List<Instancia> getInstanciaList(List<InstanciaDTO> instanciaDTO, Inscripcion inscripcion, Accion accion){

        List<Instancia> instanciaList = new ArrayList<>();

        for (InstanciaDTO item : instanciaDTO){

            Instancia instanciaTemp = loadInstancia(item);
            instanciaTemp.setInscripcion(inscripcion);

            List<InstanciaSedeDTO> instanciaSedeDTOList = item.getInstanciaSedes();

            List<InstanciaSede> instanciaSedeList = new ArrayList<>();

            for(InstanciaSedeDTO instanciaSedeItem : instanciaSedeDTOList) {
                Sede sede = sedeService.getSedeById(instanciaSedeItem.getSede());
                InstanciaSede instanciaSede = new InstanciaSede();

                ExecutorService executor = Executors.newFixedThreadPool(4);

                List<ClaseDTO> claseDTOList =  instanciaSedeItem.getClaseDTOList();

                List<CompletableFuture<Clase>> futures = claseDTOList.parallelStream()
                        .map(dto -> CompletableFuture.supplyAsync(() -> buildClass(dto), executor))
                        .collect(Collectors.toList());

                List<Clase> claseList = futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList());

                executor.shutdown();
                instanciaSede.setClase(claseList);
                instanciaSede.setId(instanciaSedeItem.getId());
                instanciaSede.setEstado(instanciaSedeItem.getEstado());
                instanciaSede.setSede(sede);
                instanciaSede.setCupos(instanciaSedeItem.getCupos());
                instanciaSede.setHoraInicio(instanciaSedeItem.getHoraInicio());
                instanciaSede.setHoraFin(instanciaSedeItem.getHoraFin());
                instanciaSede.setInstancia(instanciaTemp);
                instanciaSede.setUrl(instanciaSedeItem.getUrlSede());
                instanciaSedeList.add(instanciaSede);
            }

            instanciaTemp.setInstanciaSede(instanciaSedeList);
            instanciaList.add(instanciaTemp);

        }

        int contador=1;

        for(Instancia instancia : instanciaList.stream().sorted(Comparator.comparing(Instancia::getFechaInicio)).toList())
            instancia.setNombre("Instancia "+contador++);

        return instanciaList;
    }

    public Clase buildClass(ClaseDTO claseDTO){
                Clase clase = new Clase();
                clase.setId(claseDTO.getId());
                clase.setNombre(claseDTO.getNombre());
                clase.setHoraInicio(claseDTO.getHoraInicio());
                clase.setHoraFin(claseDTO.getHoraFin());
                clase.setFecha(claseDTO.getFecha());
                clase.setEstado(claseDTO.getEstado());
                Locale locale = new Locale("es", "ES");
                DayOfWeek dayOfWeek = clase.getFecha().getDayOfWeek();
                String day = dayOfWeek.getDisplayName(java.time.format.TextStyle.FULL, locale).toLowerCase();
                switch (day.toLowerCase()) {
                    case "lunes":
                        clase.setLunes(1);
                        clase.setMartes(0);
                        clase.setMiercoles(0);
                        clase.setJueves(0);
                        clase.setViernes(0);
                        clase.setSabado(0);
                        clase.setDomingo(0);
                        break;
                    case "martes":
                        clase.setLunes(0);
                        clase.setMartes(1);
                        clase.setMiercoles(0);
                        clase.setJueves(0);
                        clase.setViernes(0);
                        clase.setSabado(0);
                        clase.setDomingo(0);
                        break;
                    case "miércoles":
                        clase.setLunes(0);
                        clase.setMartes(0);
                        clase.setMiercoles(1);
                        clase.setJueves(0);
                        clase.setViernes(0);
                        clase.setSabado(0);
                        clase.setDomingo(0);
                        break;
                    case "jueves":
                        clase.setLunes(0);
                        clase.setMartes(0);
                        clase.setMiercoles(0);
                        clase.setJueves(1);
                        clase.setViernes(0);
                        clase.setSabado(0);
                        clase.setDomingo(0);
                        break;
                    case "viernes":
                        clase.setLunes(0);
                        clase.setMartes(0);
                        clase.setMiercoles(0);
                        clase.setJueves(0);
                        clase.setViernes(1);
                        clase.setSabado(0);
                        clase.setDomingo(0);
                        break;
                    case "sábado":
                        clase.setLunes(0);
                        clase.setMartes(0);
                        clase.setMiercoles(0);
                        clase.setJueves(0);
                        clase.setViernes(0);
                        clase.setSabado(1);
                        clase.setDomingo(0);
                        break;
                    case "domingo":
                        clase.setLunes(0);
                        clase.setMartes(0);
                        clase.setMiercoles(0);
                        clase.setJueves(0);
                        clase.setViernes(0);
                        clase.setSabado(0);
                        clase.setDomingo(1);
                        break;
                }
        return clase;
    }



    public void valid(final InstanciaDTO instanciaDTO, final Accion accion){

        if (ObjectUtils.isNotEmpty(instanciaDTO.getId()))
                throw new GenericException(CodigoError.E002.getCodigo(),CodigoError.E002.getMensaje());


        if (ObjectUtils.isEmpty(instanciaDTO.getVigenciaInicio()))
            throw new GenericException(CodigoError.E032.getCodigo(),CodigoError.E032.getMensaje());


        if (ObjectUtils.isEmpty(instanciaDTO.getVigenciaFin()))
            throw new GenericException(CodigoError.E033.getCodigo(),CodigoError.E033.getMensaje());


        if (ObjectUtils.isEmpty(instanciaDTO.getEstado()))
            throw new GenericException(CodigoError.E022.getCodigo(),CodigoError.E022.getMensaje());
    }


    public Instancia findInstanciaById(final Long id){
        Optional<Instancia> instancia = instanciaRepository.findById(id);
        return instancia.orElseThrow(()->new EntityNotFoundException(id.toString()));
    }


    public List<Instancia> getInstanciaByTipo(final Long tipoId){

        LocalDate fechaActual = LocalDate.now();
        List<Instancia> instanciaList = instanciaRepository.findInstanciaByTipo(tipoId,fechaActual);

        return instanciaList;
    }


    public DetalleInstanciaDTO converListToDetalleDTO(Long idInscripcion){

        DetalleInstanciaDTO detalleInstanciaDTO = new DetalleInstanciaDTO();

        List<Instancia> instanciaList = getInstanciaByIdInscripcion(idInscripcion);

        List<InstanciaDTO> list = converListToDTO(instanciaList);

        if(list.size()>0){

            Inscripcion inscripcion = inscripcionService.getInscripcionById(idInscripcion);

            detalleInstanciaDTO.setNombreInscripcion(inscripcion.getNombre());
            detalleInstanciaDTO.setInstanciaDTOList(list);
        }

        return detalleInstanciaDTO;
    }


    public List<InstanciaDTO> converListToDTO1(List<Instancia> instancia){

        List<InstanciaDTO> instanciaDTOList = new ArrayList<>();
        instancia.forEach(item->{
            instanciaDTOList.add(convertUnitToDTO(item));
        });

        return instanciaDTOList;
    }

    public List<InstanciaDTO> converListToDTO(List<Instancia> instancia){

        List<InstanciaDTO> instanciaDTOList = new ArrayList<>();
        instancia.forEach(item->{
            instanciaDTOList.add(convertUnitToDTO(item));
        });

        return instanciaDTOList;
    }


    public List<InstanciaDTO> converListToDTOWhitTeacher(List<Instancia> instancia){

        List<InstanciaDTO> instanciaDTOList = new ArrayList<>();
        instancia.forEach(item->{
            instanciaDTOList.add(convertUnitToDTOWhitTeacher(item));
        });

        return instanciaDTOList;
    }


    public InstanciaDTO convertUnitToDTOWhitTeacher(Instancia instancia){
        List<DiaDTO> diaDTOList = new ArrayList<>();
        List<InstanciaSedeDTO> instanciaSedeDTOList = new ArrayList<>();

        for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){

            InstanciaSedeDTO instanciaSedeDTO = InstanciaSedeDTO.builder()
                    .id(instanciaSede.getId())
                    .cupos(instanciaSede.getCupos())
                    .sedeNomnbre(instanciaSede.getSede().getNombre())
                    .horaFin(instanciaSede.getHoraFin())
                    .horaInicio(instanciaSede.getHoraInicio())
                    .sede(instanciaSede.getSede().getId())
                    .urlSede(instanciaSede.getUrl())
                    .claseDTOMapperList(instanciaSede.getClaseDTOMapper())
                    .claseHorarios(multiSchedule(instanciaSede.getClaseDTOMapper()))
                    .dias(diaDTOList)
                    .estado(instanciaSede.getEstado())
                    .build();

            instanciaSedeDTOList.add(instanciaSedeDTO);
        }


        InstanciaDTO response = instanciaMapper.convertInstanciaToDto(instancia);

        response.setInstanciaSedes(instanciaSedeDTOList);

        return response;
    }

    public InstanciaDTO convertUnitToDTO(Instancia instancia){

        List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaId(instancia.getId());

        List<InstanciaSedeDTO> instanciaSedeDTOList = new ArrayList<>();

        for(InstanciaSede instanciaSede : instanciaSedeList){

            List<Clase> claseList = instanciaSede.getClase();

            List<ClaseDTO> claseDTOList = new ArrayList<>();

            for(Clase clase : claseList){
                ClaseDTO claseDTO = claseMapper.convertEntityToDto(clase);
                claseDTO.setNombreProfesores(claseService.getNombreProfesor(claseDTO.getId()));
                claseDTOList.add(claseDTO);
            }

            InstanciaSedeDTO instanciaSedeDTO = InstanciaSedeDTO.builder()
                    .cupos(instanciaSede.getCupos())
                    .horaFin(instanciaSede.getHoraFin())
                    .horaInicio(instanciaSede.getHoraInicio())
                    .sede(instanciaSede.getSede().getId())
                    .claseDTOList(claseDTOList)
                    .build();

            instanciaSedeDTOList.add(instanciaSedeDTO);

        }

        InstanciaDTO response = instanciaMapper.convertInstanciaToDto(instancia);
        response.setInstanciaSedes(instanciaSedeDTOList);

        return response;
    }



    public List<ListaDTO> mapToDTO(List<Instancia> instancias){

        List<ListaDTO> instanciaListaDTO = new ArrayList<>();
        instancias.forEach(item->{
            instanciaListaDTO.add(convertToDTO(item));
        });

        return instanciaListaDTO;
    }

    public ListaDTO convertToDTO(Instancia instancia){

        ListaDTO listaDTO = ListaDTO.builder()
                .nombreApellido(instancia.getNombre())
                .id(instancia.getId())
                .build();

        return listaDTO;
    }

    public List<InstanciaSedeResponseDTO> getInstanciaByTipoSede(final Long idSede, final Long idTipo){

        List<InstanciaSedeResponseDTO> instanciaSedeResponseDTOList = new ArrayList<>();
        List<Instancia> instanciaList = instanciaRepository.findInstanciaByTipoSede(idSede, idTipo);
        instanciaList.forEach(item->{
            InstanciaSedeResponseDTO instanciaSedeResponseDTO = new InstanciaSedeResponseDTO();
            instanciaSedeResponseDTO.setIdInstancia(item.getId());
            instanciaSedeResponseDTO.setNombreInstancia(item.getNombre());
            instanciaSedeResponseDTO.setFechaInicio(item.getFechaInicio());
            instanciaSedeResponseDTO.setFechaFin(item.getFechaFin());


            instanciaSedeResponseDTOList.add(instanciaSedeResponseDTO);
        });

        return instanciaSedeResponseDTOList;
    }


    public InstanciaOrganismoDTO instanciaOrganismoDTO(Long idInscripcion, List<InstanciaDTO> instanciaDTOList){

        String nombreInscripcion = inscripcionService.getInscripcionById(idInscripcion).getNombre();
        InstanciaOrganismoDTO instanciaOrganismoDTO = new InstanciaOrganismoDTO();


        instanciaOrganismoDTO.setNombreInscripcion(nombreInscripcion);

        for (InstanciaDTO item : instanciaDTOList){

            List<InstanciaSedeDTO> instanciaSedeList =  item.getInstanciaSedes();

            List<InstanciaSedeDTO> instanciaSedeListNew =  new ArrayList<>();

            for(InstanciaSedeDTO InstanciaSedeDTO : instanciaSedeList){

                List<ClaseDTO> claseList = claseService.getDTOListByInstanciaId(InstanciaSedeDTO.getInstancia());

                InstanciaSedeDTO instanciaSedeDTO = InstanciaSedeDTO.builder()
                        .claseDTOList(claseList)
                        .build();

                instanciaSedeListNew.add(instanciaSedeDTO);
            }

            item.setInstanciaSedes(instanciaSedeListNew);

        }

        instanciaOrganismoDTO.setInstanciaDTOList(instanciaDTOList);

        return instanciaOrganismoDTO;
    }



    public String getNombreProfesores(final Long inscripcionId){


        List<ClaseProfesor> claseProfesors = claseProfesorService.getByInstancia(inscripcionId);

        Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesors);

        Set<String> nombresProfesoreSet = claseProfesorSet.stream().map(item->item.getUsuario().getNombre()+" "+item.getUsuario().getApellido())
                .collect(Collectors.toSet());

        String nombresProfesores = nombresProfesoreSet.stream().collect(Collectors.joining(", "));


        return nombresProfesores;


    }


    public List<Instancia> getByProfesorAndSedeAndInscripcion(final Long profesorId, final Long sedeId, final Long inscripcionId){

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getByProfesorAndSedeAndInscripcion(profesorId,sedeId,inscripcionId);

        List<Instancia> instanciaList = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede().getInstancia()).collect(Collectors.toSet()).stream().toList();

        return instanciaList;
    }


    public List<DiaDTO> convertDaysToDiaDTOList(InstanciaSede instanciaSede){
        List<DiaDTO> diaDTOList = new ArrayList<>();
        for (int i = 1; i <= 7; i++) {
            DiaDTO diaDTO = new DiaDTO();
            switch (i) {
                case 1:
                    diaDTO.setDia("Lunes");
                    diaDTO.setLabel("Lunes");
                    diaDTO.setValue(instanciaSede.getLunes());
                    break;
                case 2:
                    diaDTO.setDia("Martes");
                    diaDTO.setLabel("Martes");
                    diaDTO.setValue(instanciaSede.getMartes());
                    break;
                case 3:
                    diaDTO.setDia("Miercoles");
                    diaDTO.setLabel("Miércoles");
                    diaDTO.setValue(instanciaSede.getMiercoles());
                    break;
                case 4:
                    diaDTO.setDia("Jueves");
                    diaDTO.setLabel("Jueves");
                    diaDTO.setValue(instanciaSede.getJueves());
                    break;
                case 5:
                    diaDTO.setDia("Viernes");
                    diaDTO.setLabel("Viernes");
                    diaDTO.setValue(instanciaSede.getViernes());
                    break;
                case 6:
                    diaDTO.setDia("Sabado");
                    diaDTO.setLabel("Sábado");
                    diaDTO.setValue(instanciaSede.getSabado());
                    break;
                case 7:
                    diaDTO.setDia("Domingo");
                    diaDTO.setLabel("Domingo");
                    diaDTO.setValue(instanciaSede.getDomingo());
                    break;
                }
            diaDTOList.add(diaDTO);
        }
        return diaDTOList;
    }

    public List<String> multiSchedule(List<ClaseDTOMapper> claseList) {
        Map<String, Set<String>> hourToDaysMap = new HashMap<>(); 

        Map<String, Integer> dayToNumber = new HashMap<>();
        dayToNumber.put("lunes", 0);
        dayToNumber.put("martes", 1);
        dayToNumber.put("miércoles", 2);
        dayToNumber.put("jueves", 3);
        dayToNumber.put("viernes", 4);
        dayToNumber.put("sábado", 5);
        dayToNumber.put("domingo", 6);
        
        if(claseList != null){
            claseList.parallelStream().forEach(clase -> {
                String hourRange = clase.getHoraInicio() + " a " + clase.getHoraFin();
                Locale locale = new Locale("es", "ES");
                DayOfWeek dayOfWeek = clase.getFecha().getDayOfWeek();
                if (dayOfWeek != null) {
                    String day = dayOfWeek.getDisplayName(java.time.format.TextStyle.FULL, locale).toLowerCase();
                    synchronized (hourToDaysMap) {
                        hourToDaysMap.computeIfAbsent(hourRange, key -> new HashSet<>()).add(day);
                    }
                }
            });
        
            List<String> multiHourList = new ArrayList<>();
        
            for (Map.Entry<String, Set<String>> entry : hourToDaysMap.entrySet()) {
                String hourRange = entry.getKey();
                Set<String> days = entry.getValue();
            
                String dayStr = days.stream()
                                .sorted(Comparator.comparingInt(dayToNumber::get))
                                .collect(Collectors.joining(" - "));
            
                String combination = dayStr + " " + hourRange;
                multiHourList.add(combination);
            }
            return multiHourList;
        }else{
            return null;
        }
    }
}
