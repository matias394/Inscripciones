package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.dto.front.InscripcionFrontDTO;
import com.asi.inscripciones.mvp.dto.front.InstanciaSedeFrontDTO;
import com.asi.inscripciones.mvp.dto.front.SedeFrontDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.exception.CodigoError;
import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.mapper.*;
import com.asi.inscripciones.mvp.repository.InscripcionRepository;
import com.asi.inscripciones.mvp.repository.InstanciaRepository;
import com.asi.inscripciones.mvp.repository.InstanciaSedeRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class InscripcionService {


    @Value("${dominio.inscripcion.enlace}")
    private String dominioUrl;

    @Autowired
    final private InscripcionRepository inscripcionRepository;

    @Autowired
    private OrganismoCategoriaService organismoCategoriaService;

    @Autowired
    private CorreoService correoService;

    @Autowired
    private SedeService sedeService;

    @Autowired
    private NotificacionService notificacionService;

    @Autowired
    private TipoService tipoService;

    @Autowired
    private EstadoService estadoService;

    @Autowired
    private InstanciaService instanciaService;

    @Autowired
    private FormularioService formularioService;

    @Autowired
    private FormularioInscripcionService formularioInscripcionService;

    @Autowired
    private ClaseProfesorService claseProfesorService;

    @Autowired
    private ClaseAlumnoService claseAlumnoService;

    @Autowired
    private UsuarioOrganismoCategoriaService uocService;

    @Autowired
    private InscripcionMapper inscripcionMapper;

    @Autowired
    private InscripcionPageMapper inscripcionPageMapper;

    @Autowired
    private InstanciaMapper instanciaMapper;

    @Autowired
    private FormularioInscripcionMapper formularioInscripcionMapper;

    @Autowired
    private ClaseMapper claseMapper;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    @Autowired
    private ClaseService claseService;

    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private InstanciaSedeRepository instanciaSedeRepository;

    @Autowired
    private InstanciaRepository instanciaRepository;

    @Autowired
    private RedisService redisService;
    
    @Transactional
    public void saveInscripcionTransaccion(final InscripcionDTO inscripcionDTO){

        Inscripcion inscripcion = new Inscripcion();

        instanciaService.validList(inscripcionDTO.instancias(), Accion.CREAR);

        inscripcion = loadInscripcion(inscripcionDTO, Accion.CREAR);

        inscripcion = saveInscripcion(inscripcion);

        List<Instancia> instanciaList = instanciaService.getInstanciaList(inscripcionDTO.instancias(),inscripcion, Accion.CREAR);

        List<FormularioInscripcion> formularioInscripcionList =formularioInscripcionService.getFormularioInscripcionList(inscripcionDTO.formularioInscripcion(),inscripcion);

        instanciaList.forEach(instanciaService::saveInstancia);

        formularioInscripcionList.forEach(formularioInscripcionService::saveFormularioInscripcion);

        String url = createUrl(inscripcion.getId());

        inscripcion.setUrl(url);

        updateInscripcion(inscripcion);

        // Escribe en REDIS la informacion de la InstanciaSede
        redisService.saveInstanciaSede(instanciaList);

        //Escribe en REDIS la informacion de la Inscripcion
        redisService.saveInscripcion(inscripcion);

        //Escribe en REDIS la informacion del formulario
        redisService.saveFormularios(formularioInscripcionList);
    }

    
    @Transactional
    public void updateInscripcionCompletaEnRedis(final List<Instancia> listaInstancias, final Inscripcion inscripcion, final List<FormularioInscripcion> listaFormularioInscripcion){
        // Escribe en REDIS la informacion de la InstanciaSede
        redisService.saveInstanciaSede(listaInstancias);
        //Escribe en REDIS la informacion de la Inscripcion
        redisService.saveInscripcion(inscripcion);
        //Escribe en REDIS la informacion del formulario
        redisService.saveFormularios(listaFormularioInscripcion);
    }

    public Inscripcion getInscripcionById1(final Long id){
        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);
        return inscripcion.orElse(new Inscripcion());
    }

    public Inscripcion saveInscripcion(final Inscripcion inscripcion){
        Inscripcion inscripcionSave = inscripcionRepository.save(inscripcion);
        return inscripcionSave;
    }


    public List<Inscripcion> getStateAll(final Integer estado){
        List<Inscripcion> inscripcionList = inscripcionRepository.getStateAll(estado);
        for (Inscripcion item : inscripcionList) {
            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(item.getId());
            List<FormularioInscripcion> formularioInscripcionList = formularioInscripcionService.getFormularioInscripcionByIdInscripcion(item.getId());
            item.setInstancias(instanciaList);
            item.setFormularioInscripcion(formularioInscripcionList);
        }
        
        return inscripcionList;
    }

    public List<Inscripcion> getInscripcionPage(final Integer estado, final Pageable pageable){
        
        List<Inscripcion> inscripcionPage = inscripcionRepository.findByEstadoLike(estado, pageable);
        for (Inscripcion item : inscripcionPage) {
            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(item.getId());
            List<FormularioInscripcion> formularioInscripcionList = formularioInscripcionService.getFormularioInscripcionByIdInscripcion(item.getId());
            item.setInstancias(instanciaList);
            item.setFormularioInscripcion(formularioInscripcionList);
        }
        
        return inscripcionPage;

    }

    public void valid(final InscripcionDTO inscripcionDTO, final Accion accion){

        if(accion.equals(Accion.CREAR)){

            Inscripcion inscripcion = inscripcionRepository.findByName(inscripcionDTO.nombre());

            if (ObjectUtils.isNotEmpty(inscripcion))
                throw new ResponseStatusException(HttpStatus.FOUND);

            if (ObjectUtils.isNotEmpty(inscripcionDTO.id())) 
                throw new GenericException(CodigoError.E002.getCodigo(),CodigoError.E002.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.feriado())) 
                throw new GenericException(CodigoError.E006.getCodigo(),CodigoError.E006.getMensaje());         
            
            if (ObjectUtils.isEmpty(inscripcionDTO.cuposGrupales())) 
                throw new GenericException(CodigoError.E007.getCodigo(),CodigoError.E007.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.loginMiba())) 
                throw new GenericException(CodigoError.E008.getCodigo(),CodigoError.E008.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.cantidadMaxima())) 
                throw new GenericException(CodigoError.E009.getCodigo(),CodigoError.E009.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.nombre())) 
                throw new GenericException(CodigoError.E013.getCodigo(),CodigoError.E013.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.organismoCategoria())) 
                throw new GenericException(CodigoError.E016.getCodigo(),CodigoError.E016.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.correo())) 
                throw new GenericException(CodigoError.E018.getCodigo(),CodigoError.E018.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.notificacion())) 
                throw new GenericException(CodigoError.E019.getCodigo(),CodigoError.E019.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.tipo()))
                throw new GenericException(CodigoError.E021.getCodigo(),CodigoError.E021.getMensaje());

            if (ObjectUtils.isEmpty(inscripcionDTO.estadoInscripcion()))
                throw new GenericException(CodigoError.E022.getCodigo(),CodigoError.E022.getMensaje());

        }else if (accion.equals(Accion.MODIFICAR)) {
            if (ObjectUtils.isEmpty(inscripcionDTO.id())) 
            throw new GenericException(CodigoError.E035.getCodigo(),CodigoError.E036.getMensaje());
        }
    }


    public Inscripcion findInscripcionByIdWhitInstance(final Long id){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

        if(inscripcion.isPresent()){

            List<Instancia> instanciaList = instanciaService.findInstanciaListById(inscripcion.get().getId());

            inscripcion.get().setInstancias(instanciaList);
        }

        return inscripcion.orElse(new Inscripcion());
    }


    public Inscripcion getInscripcionById(final Long id){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

        if(inscripcion.isPresent()){

            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(inscripcion.get().getId());

            inscripcion.get().setInstancias(instanciaList);
        }
        return inscripcion.orElse(new Inscripcion());
    }


    public Inscripcion findByIdWhitInstanciaSede(final Long id){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

        if(inscripcion.isPresent()){
            List<Instancia> instanciaList = instanciaService.findByIdInscripcionWhitInstanciaSede(inscripcion.get().getId());
            List<FormularioInscripcion> formularioInscripcionList = formularioInscripcionService.getFormularioInscripcionByIdInscripcion(inscripcion.get().getId());

            inscripcion.get().setInstancias(instanciaList);
            inscripcion.get().setFormularioInscripcion(formularioInscripcionList);
        }

        return inscripcion.orElse(new Inscripcion());
    }

    public Inscripcion findInscripcionById(final Long id){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

        if(inscripcion.isPresent()){

            List<Instancia> instanciaList = instanciaService.findByInscripcionIdForGetInscription(inscripcion.get().getId());
            List<FormularioInscripcion> formularioInscripcionList = formularioInscripcionService.getFormularioInscripcionByIdInscripcion(inscripcion.get().getId());

            inscripcion.get().setInstancias(instanciaList);
            inscripcion.get().setFormularioInscripcion(formularioInscripcionList);
            inscripcion.get().setOrganismo(inscripcion.get().getOrganismoCategoria().getOrganismo().getId());
            inscripcion.get().setCategoria(inscripcion.get().getOrganismoCategoria().getCategoria().getId());
        }
        return inscripcion.orElse(new Inscripcion());
    }


    /**
     * Devuelve una inscripcion, con Sus Istancias, peor sin sede
     * @param id
     * @return
     */
    public Inscripcion findWhitClassById(final Long id){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);

        if(inscripcion.isPresent()){
            List<Instancia> instanciaList = instanciaService.getListByIdWhitClass(inscripcion.get().getId());
            inscripcion.get().setInstancias(instanciaList);
        }

        return inscripcion.orElse(new Inscripcion());

    }


    public List<InscripcionListDTO> getInscripcionListPage(final Integer estado, final Pageable pageable){

        List<InscripcionListDTO> inscripcionList = new ArrayList<>();

        List<Inscripcion> inscripcionPage = inscripcionRepository.findByEstadoLike(estado, pageable);


        inscripcionList = mapToDTOList(inscripcionPage);


        return inscripcionList;
    }



    public void updateInscripcion(final Inscripcion inscripcion){
        
        inscripcionRepository.save(inscripcion);        
    }

    public void deleteById(final Long id) {
        
        Inscripcion inscripcion = this.getInscripcionById(id);
        inscripcion.setEstado(ConstanteEstados.INACTIVO);
        inscripcionRepository.save(inscripcion);
    }

    public void deleteInstanciaByInscripcionId(final Long id) {
        
        instanciaService.deleteByInscripcion(id);
        
    }

    public Inscripcion loadInscripcion(final InscripcionDTO inscripcionDTO, final Accion accion){

        Inscripcion inscripcion = inscripcionMapper.convertDtoToInscripcion(inscripcionDTO);

        OrganismoCategoria organismoCategoria = organismoCategoriaService.getOrganismoCategoriaById(inscripcionDTO.organismoCategoria());
        Correo correo = correoService.getCorreoById(inscripcionDTO.correo());
        Notificacion notificacion =  notificacionService.getNotificacionById(inscripcionDTO.notificacion());
        Tipo tipo = tipoService.getTipoById(inscripcionDTO.tipo());
        Estado estadoInscripcion =  estadoService.getEstadoById(0L);

        List<FormularioInscripcion> formularioInscripcionList = new ArrayList<>();

        inscripcion.setOrganismoCategoria(organismoCategoria);
        inscripcion.setCorreo(correo);
        inscripcion.setNotificacion(notificacion);
        inscripcion.setTipo(tipo);
        inscripcion.setEstadoInscripcion(estadoInscripcion);
        inscripcion.setCuposParaOtros(inscripcionDTO.cuposParaOtros());


        if (accion.equals(Accion.MODIFICAR)) {

            Inscripcion inscripcionUrl = inscripcionRepository.findById(inscripcionDTO.id()).orElseThrow();
            inscripcion.setUrl(inscripcionUrl.getUrl());

            List<Instancia> instanciaList = new ArrayList<>();

            for (InstanciaDTO instanciaDTO : inscripcionDTO.instancias()) {

                Instancia instancia = instanciaMapper.convertDtoToInstancia(instanciaDTO);
                List<InstanciaSede> instanciaSedeList = new ArrayList<>();

                for(InstanciaSedeDTO instanciaSedeDTO : instanciaDTO.getInstanciaSedes()) {

                    InstanciaSede instanciaSede = new InstanciaSede();

                    instanciaSede.setUrl(instanciaSedeDTO.getUrlSede());
                    instanciaSede.setId(instanciaSedeDTO.getId());
                    instanciaSede.setEstado(instanciaSedeDTO.getEstado());
                    instanciaSede.setSede(sedeService.getSedeById(instanciaSedeDTO.getSede()));
                    instanciaSede.setInstancia(instancia);
                    ExecutorService executor = Executors.newFixedThreadPool(4);

                    List<ClaseDTO> claseDTOList =  instanciaSedeDTO.getClaseDTOList();

                    List<CompletableFuture<Clase>> futures = claseDTOList.parallelStream()
                        .map(dto -> CompletableFuture.supplyAsync(() -> instanciaService.buildClass(dto), executor))
                        .collect(Collectors.toList());

                    List<Clase> claseList = futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList());

                    executor.shutdown();
                    instanciaSede.setClase(claseList);
                    instanciaSede.setCupos(instanciaSedeDTO.getCupos());

                    instanciaSedeList.add(instanciaSede);
                }

                instancia.setInscripcion(inscripcion);
                instancia.setInstanciaSede(instanciaSedeList);
                instanciaList.add(instancia);
            }

            inscripcionDTO.formularioInscripcion().forEach(dto->{

                FormularioInscripcion formularioInscripcion = formularioInscripcionMapper.convertDtoToFormularioInscrpcion(dto);
                formularioInscripcion.setInscripcion(inscripcion);
                formularioInscripcion.setFormulario(formularioService.getFormularioById(dto.formulario()));
                formularioInscripcionList.add(formularioInscripcion);

            });
            

            inscripcion.setInstancias(instanciaList);

            inscripcion.setFormularioInscripcion(formularioInscripcionList);
        }

        return inscripcion;
    }

    public InscripcionDTO convertToDtoWhitTeacher(Inscripcion inscripcion){

        List<InstanciaDTO> instanciaDTOList = instanciaService.converListToDTOWhitTeacher(inscripcion.getInstancias());
        List<FormularioInscripcionDTO> FormularioInscripcionDTOList = formularioInscripcionMapper.mapToDto(inscripcion.getFormularioInscripcion());
        InscripcionDTO inscripcionDTO = inscripcionMapper.converInscripcionToDto(inscripcion);

        InscripcionDTO inscripcionResponse = InscripcionDTO.builder()
                .cantidadMaxima(inscripcionDTO.cantidadMaxima())
                .correo(inscripcionDTO.correo())
                .cuposGrupales(inscripcionDTO.cuposGrupales())
                .cuposInscripcion(inscripcionDTO.cuposInscripcion())
                .estadoInscripcion(inscripcionDTO.estadoInscripcion())
                .feriado(inscripcionDTO.feriado())
                .id(inscripcionDTO.id())
                .instancias(instanciaDTOList)
                .formularioInscripcion(FormularioInscripcionDTOList)
                .loginMiba(inscripcionDTO.loginMiba())
                .nombre(inscripcionDTO.nombre())
                .notificacion(inscripcionDTO.notificacion())
                .organismoCategoria(inscripcionDTO.organismoCategoria())
                .organismo(inscripcionDTO.organismo())
                .categoria(inscripcionDTO.categoria())
                .tipo(inscripcionDTO.tipo())
                .url(inscripcionDTO.url())
                .retornoUrl(inscripcionDTO.retornoUrl())
                .estado(inscripcionDTO.estado())
                .cantidadInstancias(inscripcion.getInstancias().size())
                .cuposParaOtros(inscripcionDTO.cuposParaOtros())
                .build();

        return inscripcionResponse;
    }


    public InscripcionDTO convertToDto(Inscripcion inscripcion){

        List<InstanciaDTO> instanciaDTOList = instanciaService.converListToDTO(inscripcion.getInstancias());
        List<FormularioInscripcionDTO> FormularioInscripcionDTOList = formularioInscripcionMapper.mapToDto(inscripcion.getFormularioInscripcion());
        InscripcionDTO inscripcionDTO = inscripcionMapper.converInscripcionToDto(inscripcion);
        
        InscripcionDTO inscripcionResponse = InscripcionDTO.builder()
                                            .cantidadMaxima(inscripcionDTO.cantidadMaxima())
                                            .correo(inscripcionDTO.correo())
                                            .cuposGrupales(inscripcionDTO.cuposGrupales())
                                            .cuposInscripcion(inscripcionDTO.cuposInscripcion())
                                            .estadoInscripcion(inscripcionDTO.estadoInscripcion())
                                            .feriado(inscripcionDTO.feriado())
                                            .id(inscripcionDTO.id())
                                            .instancias(instanciaDTOList)
                                            .formularioInscripcion(FormularioInscripcionDTOList)
                                            .loginMiba(inscripcionDTO.loginMiba())
                                            .nombre(inscripcionDTO.nombre())
                                            .notificacion(inscripcionDTO.notificacion())
                                            .organismoCategoria(inscripcionDTO.organismoCategoria())
                                            .organismo(inscripcionDTO.organismo())
                                            .categoria(inscripcionDTO.categoria())
                                            .tipo(inscripcionDTO.tipo())
                                            .url(inscripcionDTO.url())
                                            .retornoUrl(inscripcionDTO.retornoUrl())
                                            .profesor(getNombreProfesores(inscripcion.getId()))
                                            .inscritos(getInscritos(inscripcion.getId()))
                                            .estado(inscripcionDTO.estado())
                                            .cantidadInstancias(inscripcion.getInstancias().size())
                                            .cuposParaOtros(inscripcionDTO.cuposParaOtros())
                                            .build();
    
        return inscripcionResponse;   
    }


    public List<InscripcionDataDTO> convertToPageDtoList(List<Inscripcion> inscripcionList){

        List<InscripcionDataDTO> responseList = new ArrayList<>();

        inscripcionList.forEach(item->responseList.add(convertToPageDto(item)));

        return  responseList;
    }


    public InscripcionDataDTO convertToPageDto(Inscripcion inscripcion){

        InscripcionDataDTO inscripcionDataDTO = inscripcionPageMapper.converInscripcionToDto(inscripcion);

        List<InstanciaDataDTO> InstanciaDataList = new ArrayList<>();

        
        if(inscripcion.getInstancias() != null && !inscripcion.getInstancias().isEmpty()){
            inscripcion.getInstancias().forEach(instancia->{

                List<InstanciaSedeDataDTO> instanciaSedeDataDTOS = new ArrayList<>();
    
                instancia.getInstanciaSede().forEach(instanciaSede->{
    
                    List<ClaseDTO> claseDTOList = new ArrayList<>();
    
                    List<ClaseDataDTO> claseDataDTOList = new ArrayList<>();
    
                        instanciaSede.getClase().forEach(clase->{
                            claseDataDTOList.add(ClaseDataDTO.builder()
                                    .id(clase.getId())
                                    .fechaInicio(instancia.getFechaInicio())
                                    .fechaFinal(instancia.getFechaFin())
                                    .fecha(clase.getFecha())
                                    .horaInicio(clase.getHoraInicio())
                                    .horaFin(clase.getHoraFin())
                                    .nombreClase(clase.getNombre())
                                    .build());
                            });
        
                            List<ClaseDataDTO> claseDataDTOListOrdenado = claseDataDTOList.stream()
                                .sorted(Comparator.comparing(ClaseDataDTO::getFecha))
                                .collect(Collectors.toList());
        
                            Map<LocalDate, List<ClaseDataDTO>> clasesAgrupadasPorFecha = claseDataDTOListOrdenado.stream()
                                .collect(Collectors.groupingBy(ClaseDataDTO::getFecha));
        
                            List<FechasClasesDTO> fechaClasesDTOList = clasesAgrupadasPorFecha.entrySet().stream()
                                .map(entry -> new FechasClasesDTO(entry.getKey(), entry.getValue()))
                                .collect(Collectors.toList());
        
                            for(Clase clase : instanciaSede.getClase()){
                                    ClaseDTO claseDto = claseService.convertToClaseDTO(clase);
                                    claseDTOList.add(claseDto);
                                }
                            List<FechaDiasDTO> fechaDiasList = instanciaSedeService.multiScheduleFechaDias(claseDTOList);
        
                        instanciaSedeDataDTOS.add(InstanciaSedeDataDTO.builder()
                                .id(instanciaSede.getId())
                                .nombreSede(instanciaSede.getSede().getNombre())
                                .cupos(instanciaSede.getCupos())
                                .clasedatas(claseDataDTOList)
                                .fechaClases(fechaClasesDTOList)
                                .fechaDias(fechaDiasList)
                                .sedeUrl(instanciaSede.getUrl())
                                .build());
                });
    
                InstanciaDataList.add(InstanciaDataDTO.builder()
                        .id(instancia.getId())
                        .nombre(instancia.getNombre())
                        .estado(instancia.getEstado())
                        .fechaInicio(instancia.getFechaInicio())
                        .fechaFinal(instancia.getFechaFin())
                        .instanciaSedeDataDTO(instanciaSedeDataDTOS)
                        .build());
            });
        }

        InscripcionDataDTO inscripcionResponse = InscripcionDataDTO.builder()
                .cantidadMaxima(inscripcionDataDTO.getCantidadMaxima())
                .correo(inscripcionDataDTO.getCorreo())
                .cuposGrupales(inscripcionDataDTO.getCuposGrupales())
                .estadoInscipcion(inscripcionDataDTO.getEstadoInscipcion())
                .feriado(inscripcionDataDTO.getFeriado())
                .id(inscripcionDataDTO.getId())
                .loginMiba(inscripcionDataDTO.getLoginMiba())
                .cantidadInstancias((inscripcion.getInstancias() != null) ? inscripcion.getInstancias().size() : 0)
                .modalidad(inscripcionDataDTO.getModalidad())
                .nombre(inscripcionDataDTO.getNombre())
                .notificacion(inscripcionDataDTO.getNotificacion())
                .organismo(inscripcion.getOrganismoCategoria().getOrganismo().getNombre())
                .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
                .instanciaData(InstanciaDataList)
                .tipo(inscripcionDataDTO.getTipo())
                .url(inscripcionDataDTO.getUrl())
                .estado(inscripcionDataDTO.getEstado())
                .build();

        return inscripcionResponse;
    }


    public InscripcionDataDTO convertToPageDtoWhitNameTeacherWhitinClass(Inscripcion inscripcion) {

        InscripcionDataDTO inscripcionDataDTO = inscripcionPageMapper.converInscripcionToDto(inscripcion);

        List<InstanciaDataDTO> InstanciaDataList = new ArrayList<>();

        inscripcion.getInstancias().forEach(instancia -> {

            List<InstanciaSedeDataDTO> instanciaSedeDataDTOS = new ArrayList<>();

            instancia.getInstanciaSede().forEach(instanciaSede -> {

                List<ClaseDataDTO> claseDataDTOList = new ArrayList<>();


                instanciaSedeDataDTOS.add(InstanciaSedeDataDTO.builder()
                        .id(instanciaSede.getId())
                        .cupos(instanciaSede.getCupos())
                        .clasedatas(claseDataDTOList)
                        .build());

            });

            InstanciaDataList.add(InstanciaDataDTO.builder()
                    .id(instancia.getId())
                    .nombre(instancia.getNombre())
                    .estado(instancia.getEstado())
                    .fechaInicio(instancia.getFechaInicio())
                    .fechaFinal(instancia.getFechaFin())
                    .instanciaSedeDataDTO(instanciaSedeDataDTOS)
                    .build());
        });

        InscripcionDataDTO inscripcionResponse = InscripcionDataDTO.builder()
                .cantidadMaxima(inscripcionDataDTO.getCantidadMaxima())
                .correo(inscripcionDataDTO.getCorreo())
                .cuposGrupales(inscripcionDataDTO.getCuposGrupales())
                .estadoInscipcion(inscripcionDataDTO.getEstadoInscipcion())
                .feriado(inscripcionDataDTO.getFeriado())
                .id(inscripcionDataDTO.getId())
                .loginMiba(inscripcionDataDTO.getLoginMiba())
                .cantidadInstancias(inscripcion.getInstancias().size())
                .modalidad(inscripcionDataDTO.getModalidad())
                .nombre(inscripcionDataDTO.getNombre())
                .notificacion(inscripcionDataDTO.getNotificacion())
                .organismo(inscripcion.getOrganismoCategoria().getOrganismo().getNombre())
                .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
                .instanciaData(InstanciaDataList)
                .tipo(inscripcionDataDTO.getTipo())
                .url(inscripcionDataDTO.getUrl())
                //.profesor(getNombreProfesores(inscripcion))
                .inscritos(getInscritos(inscripcion))
                .estado(inscripcionDataDTO.getEstado())
                .build();

        return inscripcionResponse;
    }


    public InscripcionDataDTO convertToPageDtoWhitNameTeacher(Inscripcion inscripcion){

        InscripcionDataDTO inscripcionDataDTO = inscripcionPageMapper.converInscripcionToDto(inscripcion);

        List<InstanciaDataDTO> InstanciaDataList = new ArrayList<>();

        if(inscripcion.getInstancias() != null){
            inscripcion.getInstancias().forEach(instancia->{

                List<InstanciaSedeDataDTO> instanciaSedeDataDTOS = new ArrayList<>();
    
                instancia.getInstanciaSede().forEach(instanciaSede->{
    
                    List<ClaseDTO> claseDTOList = new ArrayList<>();
    
                    List<ClaseDataDTO> claseDataDTOList = new ArrayList<>();
    
                    if(!instanciaSede.getClase().isEmpty())
                        instanciaSede.getClase().forEach(clase->{
    
                            claseDataDTOList.add(ClaseDataDTO.builder()
                                .id(clase.getId())
                                .fechaInicio(instancia.getFechaInicio())
                                .fechaFinal(instancia.getFechaFin())
                                .fecha(clase.getFecha())
                                .horaInicio(clase.getHoraInicio())
                                .horaFin(clase.getHoraFin())
                                .nombreClase(clase.getNombre())
                                .build());
                        });
    
                        List<ClaseDataDTO> claseDataDTOListOrdenado = claseDataDTOList.stream()
                            .sorted(Comparator.comparing(ClaseDataDTO::getFecha))
                            .collect(Collectors.toList());
    
                        Map<LocalDate, List<ClaseDataDTO>> clasesAgrupadasPorFecha = claseDataDTOListOrdenado.stream()
                            .collect(Collectors.groupingBy(ClaseDataDTO::getFecha));
    
                        List<FechasClasesDTO> fechaClasesDTOList = clasesAgrupadasPorFecha.entrySet().stream()
                            .map(entry -> new FechasClasesDTO(entry.getKey(), entry.getValue()))
                            .collect(Collectors.toList());
    
                        for(Clase clase : instanciaSede.getClase()){
                                ClaseDTO claseDto = claseService.convertToClaseDTO(clase);
                                claseDTOList.add(claseDto);
                            }
                        List<FechaDiasDTO> fechaDiasList = instanciaSedeService.multiScheduleFechaDias(claseDTOList);
    
                    instanciaSedeDataDTOS.add(InstanciaSedeDataDTO.builder()
                            .id(instanciaSede.getId())
                            .cupos(instanciaSede.getCupos())
                            .nombreSede(instanciaSede.getSede().getNombre())
                            .clasedatas(claseDataDTOList)
                            .fechaClases(fechaClasesDTOList)
                            .fechaDias(fechaDiasList)
                            .build());
                });
    
                InstanciaDataList.add(InstanciaDataDTO.builder()
                        .id(instancia.getId())
                        .nombre(instancia.getNombre())
                        .estado(instancia.getEstado())
                        .fechaInicio(instancia.getFechaInicio())
                        .fechaFinal(instancia.getFechaFin())
                        .instanciaSedeDataDTO(instanciaSedeDataDTOS)
                        .build());
            });    
        }

        InscripcionDataDTO inscripcionResponse = InscripcionDataDTO.builder()
                                            .cantidadMaxima(inscripcionDataDTO.getCantidadMaxima())
                                            .correo(inscripcionDataDTO.getCorreo())
                                            .cuposGrupales(inscripcionDataDTO.getCuposGrupales())
                                            .estadoInscipcion(inscripcionDataDTO.getEstadoInscipcion())
                                            .feriado(inscripcionDataDTO.getFeriado())
                                            .id(inscripcionDataDTO.getId())
                                            .loginMiba(inscripcionDataDTO.getLoginMiba())
                                            .cantidadInstancias((inscripcion.getInstancias() != null) ? inscripcion.getInstancias().size() : 0)
                                            .modalidad(inscripcionDataDTO.getModalidad())
                                            .nombre(inscripcionDataDTO.getNombre())
                                            .notificacion(inscripcionDataDTO.getNotificacion())
                                            .organismo(inscripcion.getOrganismoCategoria().getOrganismo().getNombre())
                                            .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
                                            .instanciaData(InstanciaDataList)
                                            .tipo(inscripcionDataDTO.getTipo())
                                            .url(inscripcionDataDTO.getUrl())
                                            //.profesor())
                                            //.inscritos(getInscritos(inscripcion.getId()))
                                            .estado(inscripcionDataDTO.getEstado())
                                            .build();
    
        return inscripcionResponse;   
    }


    public Integer getInscritos(Inscripcion inscripcion){

        List<Clase> clasesList = new ArrayList<>();
        List<ClaseAlumno> claseAlumnoList = new ArrayList<>();
        List<Usuario> usuarioList = new ArrayList<>();

        for (Instancia instancia: inscripcion.getInstancias()) {

            for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){

                List<Clase> claseList = claseService.getByInstanciaSedeIdData(instanciaSede.getId());

                clasesList.addAll(claseList);
            }

        }
        for (Clase clase: clasesList) {

            claseAlumnoList.addAll(clase.getClaseAlumno());
        }
        for (ClaseAlumno claseAlumno: claseAlumnoList){

            usuarioList.add(claseAlumno.getUsuario());
        }

        Set<ClaseAlumno> claseAlumnoSet = Set.copyOf(claseAlumnoList);
        Set<String> nombresAlumnoeSet = claseAlumnoSet.stream().map(item->item.getUsuario().getNombre()+" "+item.getUsuario().getApellido())
                .collect(Collectors.toSet());

        Integer inscritos = nombresAlumnoeSet.size();

        return inscritos;

    }


    public Integer getInscritos(Long inscripcionId){

        Inscripcion inscripcion = getInscripcionById(inscripcionId);
        List<Clase> clasesList = new ArrayList<>();
        List<ClaseAlumno> claseAlumnoList = new ArrayList<>();
        List<Usuario> usuarioList = new ArrayList<>();

        for (Instancia instancia: inscripcion.getInstancias()) {

            for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){

                clasesList.addAll(instanciaSede.getClase());
            }

        }
        for (Clase clase: clasesList) {

            claseAlumnoList.addAll(clase.getClaseAlumno());
        }
        for (ClaseAlumno claseAlumno: claseAlumnoList){

            usuarioList.add(claseAlumno.getUsuario());
        }

        Set<ClaseAlumno> claseAlumnoSet = Set.copyOf(claseAlumnoList);
        Set<String> nombresAlumnoeSet = claseAlumnoSet.stream().map(item->item.getUsuario().getNombre()+" "+item.getUsuario().getApellido())
                .collect(Collectors.toSet());

        Integer inscritos = nombresAlumnoeSet.size();

        return inscritos;

    }



    public String getNombreProfesores(final Long inscripcionId){


        List<ClaseProfesor> claseProfesors = claseProfesorService.getByInscripcion(inscripcionId);

        Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesors);

        Set<String> nombresProfesoreSet = claseProfesorSet.stream().map(item->item.getUsuario().getNombre()+" "+item.getUsuario().getApellido())
                .collect(Collectors.toSet());

        String nombresProfesores = nombresProfesoreSet.stream().collect(Collectors.joining(", "));


        return nombresProfesores;


    }

    /*
    public String getNombreProfesores(Long inscripcionId){

        Inscripcion inscripcion = getInscripcionById(inscripcionId);
        List<Clase> clasesList = new ArrayList<>();
        List<ClaseProfesor> claseProfesorList = new ArrayList<>();
        List<Usuario> usuarioList = new ArrayList<>();

        for (Instancia instancia: inscripcion.getInstancias()) {

            for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){

                clasesList.addAll(instanciaSede.getClase());
            }
        }

        for (Clase clase: clasesList) {

            claseProfesorList.addAll(clase.getClaseProfesor());
        }

        for (ClaseProfesor claseProfesor : claseProfesorList){

            usuarioList.add(claseProfesor.getUsuario());
        }

        Set<ClaseProfesor> claseProfesorSet = Set.copyOf(claseProfesorList);

        Set<String> nombresProfesoreSet = claseProfesorSet.stream().map(item->item.getUsuario().getNombre()+" "+item.getUsuario().getApellido())
                .collect(Collectors.toSet());

        String nombresProfesores = nombresProfesoreSet.stream().collect(Collectors.joining(", "));



        return nombresProfesores;


    }
*/

    public String createUrl(Long idFormuario){

        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();
        String idFormularioString = idFormuario.toString();

        String url = dominioUrl+idFormularioString.concat("_").concat(uuidString);

        return url;
    }


    public List<Inscripcion> getInscripcionByOrganisoId(final Long organismoId){
        
        List<Inscripcion> inscripcionList = inscripcionRepository.findByIdOrganismoCategoria(organismoId, ConstanteEstados.ACTIVO);

        setInstanciasByList(inscripcionList);

        return inscripcionList.stream().limit(10).toList();
    }


    public List<Inscripcion> getByOrganisoAndTipo(final Long organismoId, final Long tipoId){

        List<Inscripcion> inscripcionList = inscripcionRepository.findByOrganisoAndTipo(organismoId,tipoId, ConstanteEstados.ACTIVO);

        setInstanciasByList(inscripcionList);

        return inscripcionList;
    }



    public long getByOrganisoAndTipoFilterUsuarioSize(final Long organismoId, final Long tipoId, final Long usuarioId, final String filter){

        String actualFilter = filter != null && !filter.trim().isEmpty() ? "%" + filter + "%" : null;

        if (actualFilter != null) {
            return inscripcionRepository.countByOrganismoTipoUsuarioAndNombreFilter(organismoId, tipoId, usuarioId, ConstanteEstados.ACTIVO, actualFilter);
        } else {
            return inscripcionRepository.findByIdOrganismoAndTipoCount(organismoId, tipoId, usuarioId, ConstanteEstados.ACTIVO);
        }
    }


    @Transactional
    public List<InscripcionListDTO> getByOrganisoAndTipoFilterUsuario(final Long organismoId, final Long tipoId, final Long usuarioId, Pageable pageable, final String filter){

        String actualFilter = filter != null && !filter.trim().isEmpty() ? "%" + filter + "%" : null;

        List<Inscripcion> inscripcionList;

        if (actualFilter != null) {
            inscripcionList = inscripcionRepository.findByOrganismoTipoUsuarioAndNombreFilter(organismoId, tipoId, usuarioId, ConstanteEstados.ACTIVO, actualFilter, pageable);
        } else {
            inscripcionList = inscripcionRepository.findByIdOrganismoAndTipo(organismoId, tipoId, usuarioId, ConstanteEstados.ACTIVO, pageable);
        }

        List<InscripcionListDTO> inscriptionDtoList = new ArrayList<>();

        for(Inscripcion inscripcion : inscripcionList){

            inscriptionDtoList.add(
                    InscripcionListDTO
                            .builder()
                            .id(inscripcion.getId())
                            .nombre(inscripcion.getNombre())
                            .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
                            .profesor(getNombreProfesores(inscripcion.getId()))
                            .build()
            );
        }

        return inscriptionDtoList;

    }



    public List<Inscripcion> getInscripcionPageNoInstance(final Integer estado, String filter, final Pageable pageable) {
        if (filter != null && !filter.trim().isEmpty()) {
            return inscripcionRepository.findByEstadoAndNombreLike(estado, filter , pageable);
        } else {
            return inscripcionRepository.findByEstadoLike(estado, pageable);
        }
    }

    public long countInscripcionByEstado(Integer estado) {
        return inscripcionRepository.countByEstado(estado);
    }

    public long countInscripcionesByEstadoAndNombre(Integer estado, String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return inscripcionRepository.countByEstadoAndNombreLike(estado, "%" + filter + "%");
        } else {
            return inscripcionRepository.countByEstado(estado);
        }
    }



    public List<Inscripcion> getInscripcionByOrganisoIdUsuarioId(final Long idUsuario){

        Set<Inscripcion> inscripcionSet = claseProfesorService.getInscrpcionByUsuarioId(idUsuario);

        setInstanciasByList(inscripcionSet.stream().toList());

        return inscripcionSet.stream().limit(10).toList();
    }


    public List<Inscripcion> getByUsuarioAndTipo1(final Long usuarioId, final Long tipoId){

        Set<Inscripcion> inscripcionSet = claseProfesorService.getInscrpcionByUsuarioId(usuarioId);

        List<Inscripcion> inscripcionList = inscripcionSet.stream().filter(item->item.getTipo().getId().equals(tipoId)).toList();

        setInstanciasByList(inscripcionList);

        return inscripcionList;
    }

    public List<Inscripcion> getAllInscripcionByOrganisoId(Long idOrganismo, Integer estado, Pageable pageable ){
        
        List<Inscripcion> inscripcionList = inscripcionRepository.findByIdOrganismoCategoriaAll(idOrganismo, estado, pageable);

        setInstanciasByList(inscripcionList);
       
        return inscripcionList;
    }

    public long getAllInscripcionByOrganisoIdCount(Long idOrganismo, Integer estado){

        long count = inscripcionRepository.findByIdOrganismoCategoriaAllCount(idOrganismo, estado);

        return count;
    }




    public InscripcionDataDTO convertToDTO(Inscripcion inscripcion){

        List<InstanciaDataDTO> InstanciaDataList = getInstanciaDataDTO(inscripcion);

        InscripcionDataDTO inscripcionDataDTO = InscripcionDataDTO.builder()
            .nombre(inscripcion.getNombre())
            .organismo(inscripcion.getOrganismoCategoria().getOrganismo().getNombre())
            .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
            .instanciasNumero(inscripcion.getInstancias().size())
            .instanciaData(InstanciaDataList)
            .id(inscripcion.getId())
            .profesor(getNombreProfesores(inscripcion.getId()))
            .estado(inscripcion.getEstado())
            .build();

        return inscripcionDataDTO;
    }


    public InscripcionDataDTO convertToDTOOnlyInstance(Inscripcion inscripcion){

        List<InstanciaDataDTO> InstanciaDataList = getInstanciaDTO(inscripcion);

        InscripcionDataDTO inscripcionDataDTO = InscripcionDataDTO.builder()
                .nombre(inscripcion.getNombre())
                .organismo(inscripcion.getOrganismoCategoria().getOrganismo().getNombre())
                .categoria(inscripcion.getOrganismoCategoria().getCategoria().getNombre())
                .instanciasNumero(inscripcion.getInstancias().size())
                .instanciaData(InstanciaDataList)
                .id(inscripcion.getId())
                //.profesor(getNombreProfesores(inscripcion.getId()))
                .estado(inscripcion.getEstado())
                .build();

        return inscripcionDataDTO;
    }



    public  List<InstanciaDataDTO> getInstanciaDTO(final Inscripcion inscripcion) {

        List<InstanciaDataDTO> instanciaDataList = new ArrayList<>();

        for(Instancia instancia : inscripcion.getInstancias()){

            List<InstanciaSedeDataDTO> InstanciaSedeDTOList = new ArrayList<>();

            Long id = instancia.getId();
            String nombre = instancia.getNombre();
            String periodo = "Desde: "+instancia.getFechaInicio().toString()+" Hasta: " + instancia.getFechaFin().toString();
            String modalidad = instancia.getModalidad().getNombre();
            Integer estado = instancia.getEstado();


            instanciaDataList.add(InstanciaDataDTO.builder()
                    .id(id)
                    .nombre(nombre)
                    .periodo(periodo)
                    .estado(estado)
                    .modalidad(modalidad)
                    .instanciaSedeDataDTO(InstanciaSedeDTOList).build());
        }

        return instanciaDataList;
    }



    public  List<InstanciaDataDTO> getInstanciaDataDTO(final Inscripcion inscripcion) {

        List<InstanciaDataDTO> InstanciaDataList = new ArrayList<>();

        for(Instancia instancia : inscripcion.getInstancias()){

            List<InstanciaSedeDataDTO> InstanciaSedeDTOList = new ArrayList<>();

            Long id = instancia.getId();
            String nombre = instancia.getNombre();
            String periodo = "Desde: "+instancia.getFechaInicio().toString()+" Hasta: " + instancia.getFechaFin().toString();
            String modalidad = instancia.getModalidad().getNombre();
            Integer estado = instancia.getEstado();

            for(InstanciaSede instanciaSede : instancia.getInstanciaSede()) {

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

                    InstanciaSedeDTOList.add(InstanciaSedeDataDTO
                            .builder()
                            .id(instanciaSede.getSede().getId())
                            .nombreSede(sedeNombre)
                            .cupos(cupos)
                            .claseProfesors(claseProfesorDTOList)
                            .build());

            }

            InstanciaDataList.add(InstanciaDataDTO.builder()
                    .id(id)
                    .nombre(nombre)
                    .periodo(periodo)
                    .estado(estado)
                    .modalidad(modalidad)
                    .instanciaSedeDataDTO(InstanciaSedeDTOList).build());
        }

        return InstanciaDataList;
    }



    public int getInscrpcionByUsuarioIdCount(final Long usuarioId, String filter){

        String actualFilter = filter != null && !filter.trim().isEmpty() ? "%" + filter + "%" : null;

        List<Long> idList;

        if (actualFilter != null) {
            idList = inscripcionRepository.findByUsuarioProfesorWithFilter(usuarioId, actualFilter);
        } else {
            idList = inscripcionRepository.findByUsuarioProfesor(usuarioId);
        }

        List<Long> idNoDuplicados = new HashSet<>(idList).stream().toList();

        return idNoDuplicados.size();
    }


    public List<Inscripcion> getInscrpcionByUsuarioId(final Long usuarioId, String filter,  Pageable pageable){

        String actualFilter = filter != null && !filter.trim().isEmpty() ? "%" + filter + "%" : null;

        List<Long> idList;

        if (actualFilter != null) {
            idList = inscripcionRepository.findByUsuarioProfesorWithFilter(usuarioId, actualFilter);
        } else {
            idList = inscripcionRepository.findByUsuarioProfesor(usuarioId);
        }

        List<Long> idNoDuplicados = new HashSet<>(idList).stream().toList();

        List<Inscripcion> inscripcionList = inscripcionRepository.findById(idNoDuplicados,pageable);

        return inscripcionList;
    }

    public List<InscripcionProfesorDTO> getListProfesoresByInscripcion(Long usuarioId, String filter, Pageable pageable){

        List<InscripcionProfesorDTO> inscripcionProfesorDTOList = new ArrayList<>();
        List<Inscripcion> inscripcionList = inscripcionService.getInscrpcionByUsuarioId(usuarioId, filter, pageable);

        inscripcionList.forEach(item->{
            InscripcionProfesorDTO inscripcionProfesorDTO = InscripcionProfesorDTO.builder()
                    .inscripcionId(item.getId())
                    .nombre(item.getNombre())
                    .categoria(item.getOrganismoCategoria().getCategoria().getNombre())
                    .build();

            inscripcionProfesorDTOList.add(inscripcionProfesorDTO);

        });

        return inscripcionProfesorDTOList;
    }


    public List<Inscripcion> getInscripcionByTipo(Long tipoId, Integer estado, Pageable pageable){

        List<Inscripcion> inscripcionList = inscripcionRepository.findInscripcionsByTipo(tipoId, estado, pageable);

        setInstanciasByList(inscripcionList);

        return inscripcionList;
    }
    public long getInscripcionByTipoCount(Long tipoId, Integer estado){

        long count = inscripcionRepository.findInscripcionsByTipoCount(tipoId, estado);

        return count;
    }

    public List<InscripcionDataDTO> getByUsuarioAndSede(final Long profesorId, final Long sedeId){
        List<Long> inscripcionList = inscripcionRepository.findLongListForInscription(profesorId, sedeId);

        List<Inscripcion> inscripcionListObject = inscripcionRepository.findByIdWithOutPage(inscripcionList);

        List<InscripcionDataDTO> response = mapToPageDTO(inscripcionListObject);

        return response;
    }

    public List<InscripcionDataDTO> getByUsuarioAndSedeAndTipo(final Long usuarioId, final Long sedeId, final Long tipoId){

        Set<Inscripcion>  inscripcionSet = claseProfesorService.getInstanciasByUsuarioIdAndTipoIdProfesor(usuarioId,tipoId);

        List<Inscripcion> inscripcionList = new ArrayList<>();

        inscripcionSet.forEach(inscripcion->{
            inscripcion.getInstancias().forEach(instancia -> {
                inscripcionList.addAll(instancia.getInstanciaSede()
                        .stream()
                        .filter(instanciaSede->instanciaSede.getSede().getId().equals(sedeId))
                        .map(instanciaSede->instanciaSede.getInstancia().getInscripcion())
                        .toList());
            });
        });

        setInstanciasByList(inscripcionList);

        List<InscripcionDataDTO> response = mapToPageDTO(inscripcionList);

        return response;

    }


    public Set<InscripcionDataDTO> getBySedeAndTipo(final Long sedeId, final Long tipoId, Pageable pageable){

        List<Inscripcion>  inscripcionList = inscripcionRepository.getBySedeAndTipo(sedeId,tipoId,pageable);

        setInstanciasByList(inscripcionList);

        List<InscripcionDataDTO> response = mapToPageDTO(inscripcionList);

        return response.stream().collect(Collectors.toSet());

    }

    public long getBySedeAndTipoCount(final Long sedeId, final Long tipoId){

        long count = inscripcionRepository.getBySedeAndTipoCount(sedeId,tipoId);
        return count;

    }


    public List<InscripcionDataDTO> getBySedeAndTipoAndOrganismo(final Long sedeId, final Long tipoId, final long organismoId){

        List<Inscripcion>  inscripcionList =
                inscripcionRepository.getBySedeAndTipoAndOrganismo(sedeId,tipoId,organismoId,ConstanteEstados.ACTIVO);

        setInstanciasByList(inscripcionList);

        List<InscripcionDataDTO> response = mapToPageDTO(inscripcionList);

        return response;

    }



    public List<Inscripcion> getBySedeAndTipoAndOrganismoAndUsuario(final Long sedeId, final Long tipoId, final long organismoId, final long usuarioId){

        List<Categoria> categoriaList = uocService.getCategoriasByIdUsuario(usuarioId);

        List<Inscripcion>  inscripcionList = inscripcionRepository.getBySedeAndTipoAndOrganismo(sedeId,tipoId,organismoId,ConstanteEstados.ACTIVO);

        List<Inscripcion> inscripcionReturnList = inscripcionList.stream()
                .filter(inscripcion->categoriaList.stream()
                        .anyMatch(categoria->categoria.getId().equals(inscripcion.getOrganismoCategoria().getCategoria().getId()))).toList();

        setInstanciasByListAndSede(inscripcionReturnList,sedeId);


        return inscripcionReturnList;

    }


    public List<InscripcionDataDTO> getBySedeAndTipoAndOrganismoAndUsuarioData(final Long sedeId, final Long tipoId, final long organismoId, final long usuarioId){

        List<Inscripcion>  inscripcionList = inscripcionRepository.getBySedeAndTipoAndOrganismoAndUsuario(sedeId,tipoId,organismoId,usuarioId,ConstanteEstados.ACTIVO);

        List<Inscripcion>  inscripcionListResult = inscripcionList.stream().collect(Collectors.toSet()).stream().toList();

        //setInstanciasByListAndSedeData(inscripcionListResult,sedeId);

        List<InscripcionDataDTO> response = convertToPageDtoList(inscripcionListResult);

        return response;

    }


    public List<InscripcionDataDTO> getBySede(final Long sedeId){

        List<Inscripcion> inscripcionList = inscripcionRepository.getBySede(sedeId, ConstanteEstados.ACTIVO);

        setInstanciasByList(inscripcionList);

        List<InscripcionDataDTO> response = mapToPageDTO(inscripcionList);

        return response;
    }


    public List<InscripcionDataDTO> mapEntityToDTO(List<Inscripcion> inscripcions){

        List<InscripcionDataDTO> inscripcionDataDTOS = new ArrayList<>();

        inscripcions.forEach(item->{
            inscripcionDataDTOS.add(convertToDTO(item));
        });

        return inscripcionDataDTOS;
    }


    public List<InscripcionDataDTO> mapToPageDTO(List<Inscripcion> inscripcion){

        List<InscripcionDataDTO> inscripcionDataDTO = new ArrayList<>();

        for (Inscripcion item : inscripcion) {
            inscripcionDataDTO.add(convertToPageDtoWhitNameTeacher(item));
        }

        return inscripcionDataDTO;

    }


    public List<InscripcionListDTO> mapToDTOList(List<Inscripcion> inscripcion){

        List<InscripcionListDTO> inscripcionListDTO = new ArrayList<>();



        for(Inscripcion item : inscripcion){


            InscripcionListDTO inscripcionDTO = InscripcionListDTO.builder()
                    .id(item.getId())
                    .nombre(item.getNombre())
                    .organismoId(item.getOrganismoCategoria().getOrganismo().getId())
                    .organismo(item.getOrganismoCategoria().getOrganismo().getNombre())
                    .categoria(item.getOrganismoCategoria().getCategoria().getNombre())
                    .notificacion(item.getNotificacion().getId())
                    .correo(item.getCorreo().getId())
                    .tipo(item.getTipo().getNombre())
                    .build();


            inscripcionListDTO.add(inscripcionDTO);
        }

        return inscripcionListDTO;

    }



    public List<InscripcionListDTO> mapToDTOListForOrganimo(List<Inscripcion> inscripcion){

        List<InscripcionListDTO> inscripcionListDTO = new ArrayList<>();



        for(Inscripcion item : inscripcion){

            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(item.getId());

            String periodo="";
            if (instanciaList.size() > 0)
                periodo = "Desde: "+instanciaList.get(0).getFechaInicio().toString()+" Hasta: "+instanciaList.get(0).getFechaFin().toString();


            InscripcionListDTO inscripcionDTO = InscripcionListDTO
                    .builder()
                    .id(item.getId())
                    .nombre(item.getNombre())
                    .organismoId(item.getOrganismoCategoria().getOrganismo().getId())
                    .organismo(item.getOrganismoCategoria().getOrganismo().getNombre())
                    .categoria(item.getOrganismoCategoria().getCategoria().getNombre())
                    .tipo(item.getTipo().getNombre())
                    .profesor(getNombreProfesores(item.getId()))
                    .periodo(periodo)
                    .build();

            inscripcionListDTO.add(inscripcionDTO);
        }

        return inscripcionListDTO;

    }




    public List<InscripcionDTO> mapToDTO(List<Inscripcion> inscripcion){

        List<InscripcionDTO> inscripcionDTO = new ArrayList<>();

        for (Inscripcion item : inscripcion) {
            inscripcionDTO.add(convertToDto(item));
        }

        return inscripcionDTO;

    }


    public void setInstanciasByList(List<Inscripcion> inscripcionList){

        for (Inscripcion item : inscripcionList) {
            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(item.getId());
            item.setInstancias(instanciaList);
        }

    }

    public void setInstancias(List<Inscripcion> inscripcionList){

        for (Inscripcion item : inscripcionList) {
            List<Instancia> instanciaList = instanciaService.findInstanciaByIdInscripcion(item.getId());
            item.setInstancias(instanciaList);
        }

    }


    public void setInstanciasByListAndSedeData(List<Inscripcion> inscripcionList, final Long sedeId){

        for (Inscripcion item : inscripcionList) {
            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcionAndSedeData(item.getId(),sedeId);
            item.setInstancias(instanciaList);
        }

    }

    public void setInstanciasByListAndSede(List<Inscripcion> inscripcionList, final Long sedeId){

        for (Inscripcion item : inscripcionList) {
            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcionAndSede(item.getId(),sedeId);
            item.setInstancias(instanciaList);
        }

    }

    public Integer getLoginMibaByInscripcion(Long inscripcionId){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(inscripcionId);
        Integer loginMiba = inscripcion.get().getLoginMiba();

        return loginMiba;
    }

    public NotificacionDTO getNotificacionByInscripcion(Long inscripcionId){

        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(inscripcionId);
        Notificacion notificacion = inscripcion.get().getNotificacion();
        NotificacionDTO notificacionDTO = NotificacionDTO.builder()
                .id(notificacion.getId())
                .nombre(notificacion.getNombre())
                .descripcion(notificacion.getDescripcion())
                .estado(notificacion.getEstado())
                .build();

        return notificacionDTO;
    }

    public List<UsuarioOrganismoCursoResponseDTO> getUsuarioOrganismoCursoPage(UsuarioOrganismoCursoRequestDTO uocrdto, Pageable pageable){

        List<Inscripcion> inscripcionList = inscripcionRepository.findInscripcionByTipoAndOrganismoAll(uocrdto.getIdTipo(), uocrdto.getIdOrganismo(), ConstanteEstados.ACTIVO, pageable);

        List<UsuarioOrganismoCursoResponseDTO> uocrdtoList = mapToDTOResponse( inscripcionList);

        return uocrdtoList;
    }

    public List<UsuarioOrganismoCursoResponseDTO> mapToDTOResponse(List<Inscripcion> inscripcionList){

        List<UsuarioOrganismoCursoResponseDTO> uocrdtoList = new ArrayList<>();

        inscripcionList.forEach(item->{
            UsuarioOrganismoCursoResponseDTO uocrdto = UsuarioOrganismoCursoResponseDTO.builder()
                    .nombreInscripcion(item.getNombre())
                    .nombreCategoria(item.getOrganismoCategoria().getOrganismo().getNombre())
                    .build();

            uocrdtoList.add(uocrdto);
        });

        return uocrdtoList;

    }


    public Integer getCantidadInscripcionByInscripcion(Inscripcion inscripcion){


        List<Long> instanciaList = inscripcion.getInstancias().stream().map(Instancia::getId).toList();

        List<Long> claseList = new ArrayList<>();

        Set<Long> usuariosIdList  = new TreeSet<>();


        for (Long item: instanciaList) {
            Instancia instancia = instanciaService.getInstanciaById(item);

            for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){

                List<Long> clases = instanciaSede.getClase().stream().map((Clase::getId)).toList();
                claseList.addAll(clases);
            }

        }


        for (Long item: claseList) {
            List<ClaseAlumno> claseAlumnos = claseAlumnoService.getByClaseId(item);

            claseAlumnos.forEach(claseAlumno->{
                usuariosIdList.add(claseAlumno.getUsuario().getId());
            });

        }

        return usuariosIdList.size();

    }

    
    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduledcloseInstancy() {
        
        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.getAllAvailable();
        closeInstancy(instanciaSedeList);

        List<Instancia> instanciaList = instanciaRepository.getAll();
        closeInstancies(instanciaList);
    }

    public void closeInstancy(List<InstanciaSede> instanciaSedeList){
        LocalDate today = LocalDate.now();
        for(InstanciaSede instanciaSede : instanciaSedeList){
            if(instanciaSede.getFechaFin() != null){
                if(today.isAfter(instanciaSede.getFechaFin())){
                    instanciaSede.setEstado(0);
                    instanciaSedeService.save(instanciaSede);
                }
            }
        }
    }

    public void closeInstancies(List<Instancia> instanciaList){
        for(Instancia instancia : instanciaList){
            List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.findByInstanciaId(instancia.getId());
            if(instanciaSedeList.isEmpty()){
                instancia.setEstado(0);
                instanciaService.saveInstancia(instancia);
            }
        }
    }

    public List<Inscripcion> findByNameLike(final String filter){
        return inscripcionRepository.findByNameLike(filter);
    }

    public List<InscripcionFiltroDTO> getByCategoriaAndOrganismo(final Long categoriaId, final long organismoId){

        List<InscripcionFiltroDTO> inscripcionDataDTOList = new ArrayList<>();
        List<Inscripcion>  inscripcionList = inscripcionRepository.findByOrganismoAndCategoriaFilter(organismoId,categoriaId,ConstanteEstados.ACTIVO);

        List<Inscripcion>  inscripcionListResult = inscripcionList.stream().collect(Collectors.toSet()).stream().toList();


        inscripcionListResult.forEach(inscripcion -> {
            InscripcionFiltroDTO inscripcionDataDTO = InscripcionFiltroDTO.builder()
                    .id(inscripcion.getId())
                    .nombre(inscripcion.getNombre())
                    .estado(inscripcion.getEstado()).build();

            inscripcionDataDTOList.add(inscripcionDataDTO);
        });

        return inscripcionDataDTOList;

    }

    public List<InscripcionFrontDTO> getByCategoriaAndOrganismoPage(final Long categoriaId, final long organismoId, final String filter, Pageable pageable){

        List<Inscripcion>  inscripcionList = new ArrayList<>();
        if (filter != null && !filter.trim().isEmpty()) {
            inscripcionList = inscripcionRepository.findByOrganismoAndCategoriaFilterByName(organismoId,categoriaId,ConstanteEstados.ACTIVO, filter, pageable);
        } else {
            inscripcionList = inscripcionRepository.findByOrganismoAndCategoriaFilterPage(organismoId,categoriaId,ConstanteEstados.ACTIVO, pageable);
        }

        List<InscripcionFrontDTO> inscripcionFrontDTOList = new ArrayList<>();
        inscripcionList.forEach(inscripcion -> {
            List<SedeFrontDTO> sedeFrontDTOList = new ArrayList<>();
            List<InstanciaSede> instanciaSedes = instanciaSedeRepository.getByInscripcionId(inscripcion.getId());
            instanciaSedes.forEach(instanciaSede -> {
                Sede sede = instanciaSede.getSede();
                SedeFrontDTO sedeFrontDTO = SedeFrontDTO.builder()
                        .id(sede.getId())
                        .nombre(sede.getNombre())
                        .direccion(sede.getDireccion())
                        .piso(sede.getPiso())
                        .build();

                sedeFrontDTOList.add(sedeFrontDTO);
            });

            InscripcionFrontDTO inscripcionFrontDTO = InscripcionFrontDTO.builder()
                            .id(inscripcion.getId())
                            .nombre(inscripcion.getNombre())
                            .sedes(sedeFrontDTOList)
                            .url(inscripcion.getUrl())
                            .build();

            inscripcionFrontDTOList.add(inscripcionFrontDTO);
        });

        return inscripcionFrontDTOList;

    }

    public long countInscripcionesByEstadoAndNombreAndOrganismosAndCategoria(Integer estado, String filter, Long categoria, Long organismo) {
        if (filter != null && !filter.trim().isEmpty()) {
            return inscripcionRepository.countByEstadoAndNombreLike(estado, "%" + filter + "%", categoria, organismo);
        } else {
            return inscripcionRepository.countByEstadoAndCategoriaAndOrganismo(estado,categoria,organismo);
        }
    }
}
