package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.*;
import com.asi.inscripciones.mvp.dto.InscripcionProfesorDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.mapper.InscripcionMapper;
import com.asi.inscripciones.mvp.repository.InstanciaSedeRepository;
import com.asi.inscripciones.mvp.service.*;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.Constante;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.INSCRIPCION)
public class InscripcionController {
    
    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private InstanciaService instanciaService;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    @Autowired
    private FormularioInscripcionService formularioInscripcionService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ClaseProfesorService claseProfesorService;

    @Autowired
    private ClaseService claseService;

    @Autowired
    private InstanciaSedeRepository instanciaSedeRepository;



    @PostMapping
    public ResponseEntity<Void> saveInscripcion(final @RequestBody InscripcionDTO inscripcionDTO) {

            inscripcionService.valid(inscripcionDTO, Accion.CREAR);

        try {
            inscripcionService.saveInscripcionTransaccion(inscripcionDTO);

        }catch (DataIntegrityViolationException ex){
            throw new ResponseStatusException(HttpStatus.CONFLICT, Constante.REASON,ex);
        }catch (Exception e){
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping
    public ResponseEntity<Page<InscripcionListDTO>> inscripciones(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ){

        List<Inscripcion> inscripcion = inscripcionService.getInscripcionPageNoInstance(ConstanteEstados.ACTIVO, filter, pageable);

        List<InscripcionListDTO> inscripcionDTOList =  inscripcionService.mapToDTOList(inscripcion);

        long totalCount = inscripcionService.countInscripcionesByEstadoAndNombre(ConstanteEstados.ACTIVO, filter);

        Page<InscripcionListDTO> pageReturn = new PageImpl<>(inscripcionDTOList, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }


    @GetMapping(Url.LISTA)
    public ResponseEntity<Page<InscripcionListDTO>> inscripcionesList(@PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable) {

        List<InscripcionListDTO> inscripcionList =inscripcionService.getInscripcionListPage(ConstanteEstados.ACTIVO,pageable);

        Page<InscripcionListDTO> pageReturn = new PageImpl<>(inscripcionList, pageable, inscripcionList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }


    @GetMapping(Url.DATA+"/{inscripcionId}")
    public ResponseEntity<InscripcionDataDTO> getInscripcionByIdData(final @PathVariable Long inscripcionId){

        Inscripcion inscripcion;
        InscripcionDataDTO inscripcionDataDTO;

        try {

            inscripcion = inscripcionService.getInscripcionById(inscripcionId);

            inscripcionDataDTO = inscripcionService.convertToDTO(inscripcion);

            inscripcionDataDTO.setInscritos(inscripcionService.getCantidadInscripcionByInscripcion(inscripcion));


        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);
    }



    @GetMapping(Url.DATA+Url.INSTANCIAS+"/{inscripcionId}")
    public ResponseEntity<InscripcionDataDTO> getDataInstancia(final @PathVariable Long inscripcionId){

        Inscripcion inscripcion = inscripcionService.findInscripcionByIdWhitInstance(inscripcionId);

        InscripcionDataDTO inscripcionDataDTO = inscripcionService.convertToDTOOnlyInstance(inscripcion);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);
    }



    @GetMapping(Url.DATA+Url.INSTANCIAS+Url.INSTANCIA_SEDE+"/{instanciaId}")
    public ResponseEntity<List<InstanciaSedeDataDTO>> getDataInstanciaAndInstanciaSede(final @PathVariable Long instanciaId){

        List<InstanciaSede> instanciaSedeList = instanciaSedeService.getByInstanciaId(instanciaId);

        List<InstanciaSedeDataDTO> inscripcionDataDTO = instanciaSedeService.convertListInstanciaSedeDataDTO(instanciaSedeList);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);
    }


    @GetMapping(Url.ALL)
    public ResponseEntity<List<InscripcionDTO>> inscripcionList(){

        List<Inscripcion> inscripcionList = inscripcionService.getStateAll(ConstanteEstados.ACTIVO);

        List<InscripcionDTO> inscripcionDTOList = inscripcionService.mapToDTO(inscripcionList);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDTOList);

    }


    @PutMapping
    public ResponseEntity<String> updateInscripcion(final @RequestBody InscripcionDTO inscripcionDTO) {

        Inscripcion inscripcion;
        List<FormularioInscripcion> formularioInscripcionList;

        inscripcionService.valid(inscripcionDTO, Accion.MODIFICAR);

        try {

            inscripcion = inscripcionService.loadInscripcion(inscripcionDTO, Accion.MODIFICAR);
            formularioInscripcionList = inscripcion.getFormularioInscripcion();

            inscripcionService.updateInscripcion(inscripcion);

            inscripcion.getInstancias().forEach(instanciaService::saveInstancia);

            formularioInscripcionService.deleteByInscripcion(inscripcion.getId());

            formularioInscripcionService.updateList(formularioInscripcionList);

            //Actualizacion en REDIS
            inscripcionService.updateInscripcionCompletaEnRedis(inscripcion.getInstancias(), inscripcion, formularioInscripcionList);
        
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,Constante.REASON);
        } catch (Exception e){
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInscripcion(final @PathVariable Long id) {

        InscripcionDTO inscripcionDTO =  InscripcionDTO.builder().id(id).build();
       
        inscripcionService.valid(inscripcionDTO, Accion.ELIMINAR);
        
        try {
        
            inscripcionService.deleteById(id);
            inscripcionService.deleteInstanciaByInscripcionId(id);

        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

       return ResponseEntity.status(HttpStatus.OK).build();
    }




    @GetMapping(Url.INSTANCIA_PROFESOR+"/{usuarioId}")
    public ResponseEntity<Page<InscripcionProfesorDTO>> getInscripcionsByProfesorId(
        final @PathVariable Long usuarioId,
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ) {

        List<InscripcionProfesorDTO> instanciasList = inscripcionService.getListProfesoresByInscripcion(usuarioId,filter, pageable);

        int count = inscripcionService.getInscrpcionByUsuarioIdCount(usuarioId, filter);

        Page<InscripcionProfesorDTO> pageReturn = new PageImpl<>(instanciasList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }





    @GetMapping(Url.SEDES+"/{sedeId}/{usuarioId}")
    public ResponseEntity< List<InscripcionDataDTO>> getByUsuarioAndSede(
                                                    final @PathVariable Long sedeId,
                                                    final @PathVariable Long usuarioId){

        List<InscripcionDataDTO> inscripcionDataDTO = inscripcionService.getByUsuarioAndSede(usuarioId,sedeId);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);

    }


    @GetMapping(Url.SEDES+"/{sedeId}/{usuarioId}/{tipoId}")
    public ResponseEntity< List<InscripcionDataDTO>> getByUsuarioAndSedeAndTipo(
            final @PathVariable Long sedeId, final @PathVariable Long usuarioId, final @PathVariable Long tipoId){

        List<InscripcionDataDTO> inscripcionDataDTO = inscripcionService.getByUsuarioAndSedeAndTipo(usuarioId,sedeId,tipoId);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);

    }


    @GetMapping(Url.ORGANISMOS_TIPO_SEDE+"/{organismoId}/{tipoId}/{sedeId}")
    public ResponseEntity<Set<InscripcionDataDTO>> getBySedeAndATipoOrganismo (
            final @PathVariable Long sedeId, final @PathVariable Long tipoId, final @PathVariable Long organismoId){

        List<InscripcionDataDTO> inscripcionDataDTO = inscripcionService.getBySedeAndTipoAndOrganismo(sedeId,tipoId,organismoId);
        Set<InscripcionDataDTO> inscripcionDataDTOSet = inscripcionDataDTO.stream().collect(Collectors.toSet());
        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTOSet);

    }


    @GetMapping(Url.ORGANISMOS_TIPO_SEDE+"/{organismoId}/{tipoId}/{sedeId}/{usuarioId}")
    public ResponseEntity<List<Inscripcion>> getBySedeAndATipoOrganismoAndUsuario (
            final @PathVariable Long sedeId, final @PathVariable Long tipoId, final @PathVariable Long organismoId,
            final @PathVariable Long usuarioId){

        List<Inscripcion> inscripcionDataDTO = inscripcionService.getBySedeAndTipoAndOrganismoAndUsuario(sedeId,tipoId,organismoId,usuarioId);
        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);
    }


    @GetMapping(Url.ORGANISMOS_TIPO_SEDE+Url.DATA+"/{organismoId}/{tipoId}/{sedeId}/{usuarioId}")
    public ResponseEntity<List<InscripcionDataDTO>> getBySedeAndATipoOrganismoAndUsuarioData (
            final @PathVariable Long sedeId, final @PathVariable Long tipoId, final @PathVariable Long organismoId,
            final @PathVariable Long usuarioId){

        List<InscripcionDataDTO> inscripcionDataDTO = inscripcionService.getBySedeAndTipoAndOrganismoAndUsuarioData(sedeId,tipoId,organismoId,usuarioId);
        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);
    }


    @GetMapping(Url.SEDES+"/{sedeId}")
    public ResponseEntity<Set<InscripcionDataDTO>> getBySede(final @PathVariable Long sedeId){

        List<InscripcionDataDTO> inscripcionDataDTO = inscripcionService.getBySede(sedeId);
        Set<InscripcionDataDTO> inscripcionDataDTOSet = inscripcionDataDTO.stream().collect(Collectors.toSet());
        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTOSet);

    }


    @PostMapping( Url.ASIGNAR_PROFESOR+Url.INSTANCIAS)
    public ResponseEntity<Void> setProfesorInscripcion(final @RequestBody AsignarProfesorDTO asignarProfesorDTO){

        List<Clase> claseList = new ArrayList<>();
        List<Long> claseIdList = new ArrayList<>();
        List<Usuario> profesorList = new ArrayList<>();

        Inscripcion inscripcion = inscripcionService.getInscripcionById(asignarProfesorDTO.getInscripcionId());


        inscripcion.getInstancias().forEach(
                item->item.getInstanciaSede().forEach(item2->{
                    claseList.addAll(item2.getClase());
                }));

        asignarProfesorDTO.getProfesores().forEach(id-> profesorList.add(usuarioService.getUserById(id)));

        claseList.forEach(clase->claseIdList.add(clase.getId()));



        List<ClaseProfesor> claseProfesorList = claseProfesorService.getListToUsuarioAndClase(claseList,profesorList);

        List<ClaseProfesor> claseProfesorDeleteList = claseProfesorService.getByClaseIdList(claseIdList);


        claseProfesorList.forEach(claseProfesorService::save);
        claseProfesorDeleteList.forEach(claseProfesorService::delete);


        return ResponseEntity.status(HttpStatus.OK).build();

    }




    @GetMapping("/{id}")
    public ResponseEntity<InscripcionDTO> getInscripcionById(final @PathVariable Long id){

        Inscripcion inscripcion;
        InscripcionDTO inscripcionDTO;

        try {

            inscripcion = inscripcionService.findInscripcionById(id);

            inscripcionDTO = inscripcionService.convertToDtoWhitTeacher(inscripcion);

        } catch (Exception e) {
            log.error(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDTO);
    }


    @PostMapping( Url.ASIGNAR_PROFESOR+Url.CLASES)
    public ResponseEntity<Void> setProfesorClases(final @RequestBody AsignarProfesorDTO asignarProfesorDTO){

        List<Long> claseIdList = new ArrayList<>();
        List<Usuario> profesorList = new ArrayList<>();

        InstanciaSede instanciaSede = instanciaSedeService.getByID(asignarProfesorDTO.getInstanciaId());

        instanciaSede.getClase().forEach(clase->claseIdList.add(clase.getId()));

        asignarProfesorDTO.getProfesores().forEach(id-> profesorList.add(usuarioService.getUserById(id)));

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getListToUsuarioAndClase(instanciaSede.getClase(),profesorList);

        List<ClaseProfesor> claseProfesorDeleteList = claseProfesorService.getByClaseIdList(claseIdList);

        claseProfesorList.forEach(claseProfesorService::save);
        claseProfesorDeleteList.forEach(claseProfesorService::delete);


        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping( Url.ASIGNAR_PROFESOR+Url.CLASE)
    public ResponseEntity<Void> setProfesorClase(final @RequestBody AsignarProfesorDTO asignarProfesorDTO){

        List<Usuario> profesorList = new ArrayList<>();
        List<Clase> claseList = new ArrayList<>();

        Clase clase = claseService.getClaseById(asignarProfesorDTO.getClaseId());
        claseList.add(clase);

        asignarProfesorDTO.getProfesores().forEach(id-> profesorList.add(usuarioService.getUserById(id)));

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getListToUsuarioAndClase(claseList,profesorList);

        List<ClaseProfesor> claseProfesorDeleteList = claseProfesorService.getByClaseId(asignarProfesorDTO.getClaseId());

        claseProfesorDeleteList.forEach(claseProfesorService::delete);

        claseProfesorList.forEach(claseProfesorService::save);

        return ResponseEntity.status(HttpStatus.OK).build();
    }






    @GetMapping(Url.INSCRIPCION+Url.LOGIN_MIBA+"/{inscripcionId}")
    public ResponseEntity<Integer> getLoginMiba(final @PathVariable Long inscripcionId){

        Integer loginMiba = inscripcionService.getLoginMibaByInscripcion(inscripcionId);

        return ResponseEntity.status(HttpStatus.OK).body(loginMiba);
    }


    @GetMapping(Url.INSCRIPCION+Url.NOTIFICACIONES+"/{inscripcionId}")
    public ResponseEntity<NotificacionDTO> getNotificacion(final @PathVariable Long inscripcionId){

        NotificacionDTO notificacionDTO = inscripcionService.getNotificacionByInscripcion(inscripcionId);

        return ResponseEntity.status(HttpStatus.OK).body(notificacionDTO);
    }


    @GetMapping(Url.INSCRIPCION+Url.ORGANISMOS)
    public ResponseEntity<Page<UsuarioOrganismoCursoResponseDTO>> getUsuarioOrganismoCursos(final @RequestBody UsuarioOrganismoCursoRequestDTO uordto,
                                                                                            @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<UsuarioOrganismoCursoResponseDTO> uocrdtoList =  inscripcionService.getUsuarioOrganismoCursoPage(uordto, pageable);

        Page<UsuarioOrganismoCursoResponseDTO> pageReturn = new PageImpl<>(uocrdtoList, pageable, uocrdtoList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }

    @GetMapping(Url.ORGANISMOS+"/{idOrganismo}")
    public ResponseEntity<List<InscripcionDataDTO>> getInscripcionsByOrganismo(final @PathVariable Long idOrganismo){

        List<Inscripcion> inscripcionList = inscripcionService.getInscripcionByOrganisoId(idOrganismo);

        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionService.mapEntityToDTO(inscripcionList);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTOList);
    }



    @GetMapping(Url.PROFESOR+"/{idUsuario}")
    public ResponseEntity<List<InscripcionDataDTO>> getInscripcionsByOrganismoUsuario(final @PathVariable Long idUsuario) {

        List<Inscripcion> inscripcionList = inscripcionService.getInscripcionByOrganisoIdUsuarioId(idUsuario);

        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionService.mapEntityToDTO(inscripcionList);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTOList);
    }



    @GetMapping(Url.SEDES+Url.PAGE+"/{sedeId}/{tipoId}")
    public ResponseEntity< Page<InscripcionDataDTO>> getBySedeAndTipo(final @PathVariable Long sedeId,
                                                                      final @PathVariable Long tipoId,
                                                                      @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        Set<InscripcionDataDTO> inscripcionDataDTOSet = inscripcionService.getBySedeAndTipo(sedeId, tipoId, pageable);
        long count = inscripcionService.getBySedeAndTipoCount(sedeId, tipoId);

        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionDataDTOSet.stream().collect(Collectors.toList());
        Page<InscripcionDataDTO> pageReturn = new PageImpl<>(inscripcionDataDTOList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);

    }



    @GetMapping(Url.PAGE+"/{idUsuario}/{idTipo}/{idRol}")
    public ResponseEntity<Page<InscripcionDataDTO>> getInscripcionsByProfesorAll(final @PathVariable Long idUsuario,
                                                                                 final @PathVariable Long idTipo,
                                                                                 final @PathVariable Long idRol,
                                                                                 @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable) {

        List<Inscripcion> inscripcionList = inscripcionService.getByUsuarioAndTipo1(idUsuario,idTipo);



        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionService.mapEntityToDTO(inscripcionList);

        Page<InscripcionDataDTO> pageReturn = new PageImpl<>(inscripcionDataDTOList, pageable, inscripcionDataDTOList.size());

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }



    @GetMapping(Url.PAGE+"/{idOrganismo}")
    public ResponseEntity<Page<InscripcionDataDTO>> getInscripcionsByOrganismo(final @PathVariable Long idOrganismo, @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable){

        List<Inscripcion> inscripcion = inscripcionService.getAllInscripcionByOrganisoId(idOrganismo, ConstanteEstados.ACTIVO, pageable);
        long count = inscripcionService.getAllInscripcionByOrganisoIdCount(idOrganismo, ConstanteEstados.ACTIVO);

        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionService.mapEntityToDTO(inscripcion);
        Page<InscripcionDataDTO> pageReturn = new PageImpl<>(inscripcionDataDTOList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }



    @GetMapping(Url.PAGE+Url.TIPOS+"/{idTipo}")
    public ResponseEntity<Page<InscripcionDataDTO>> getInscripcionsByTipo(final @PathVariable Long idTipo, @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable) {

        List<Inscripcion> inscripcion = inscripcionService.getInscripcionByTipo(idTipo,ConstanteEstados.ACTIVO, pageable);
        long count = inscripcionService.getInscripcionByTipoCount(idTipo,ConstanteEstados.ACTIVO);

        List<InscripcionDataDTO> inscripcionDataDTOList = inscripcionService.mapEntityToDTO(inscripcion);
        Page<InscripcionDataDTO> pageReturn = new PageImpl<>(inscripcionDataDTOList, pageable, count);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }



    @GetMapping(Url.ORGANISMOS_TIPO+Url.PAGE+"/{idOrganismo}/{idTipo}/{idUsuario}")
    public ResponseEntity<Page<InscripcionListDTO>> getInscripcionsByOrganismoAndTipo(
        final @PathVariable Long idOrganismo,
        final @PathVariable Long idTipo,
        final @PathVariable Long idUsuario,
        final @PageableDefault(page = 0, size = 10, sort ="id") Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter
    ) {

        List<InscripcionListDTO> inscripcion = inscripcionService.getByOrganisoAndTipoFilterUsuario(idOrganismo,idTipo,idUsuario,pageable, filter);
        long size = inscripcionService.getByOrganisoAndTipoFilterUsuarioSize(idOrganismo,idTipo,idUsuario, filter);

        Page<InscripcionListDTO> pageReturn = new PageImpl<>(inscripcion, pageable, size);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }



    @PostMapping( Url.INSTANCIAS+"/closeInstances")
    public ResponseEntity<String> closeInstances(){
        List<InstanciaSede> instanciaSedeList = instanciaSedeRepository.getAllAvailable();
        inscripcionService.closeInstancy(instanciaSedeList);
        return ResponseEntity.status(HttpStatus.OK).body("Cron ejecutado");
    }

    @GetMapping("filtro"+"/{categoriaId}/{organismoId}")
    public ResponseEntity< List<InscripcionFiltroDTO>> getByCategoriaAndOrganismo(
            final @PathVariable Long categoriaId,
            final @PathVariable Long organismoId){

        List<InscripcionFiltroDTO> inscripcionDataDTO = inscripcionService.getByCategoriaAndOrganismo(categoriaId,organismoId);

        return ResponseEntity.status(HttpStatus.OK).body(inscripcionDataDTO);

    }

}
