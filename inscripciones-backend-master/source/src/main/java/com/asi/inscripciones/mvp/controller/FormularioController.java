package com.asi.inscripciones.mvp.controller;


import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.repository.FormularioMongoRepository;
import com.asi.inscripciones.mvp.repository.CitizenResponseRepository;
import com.asi.inscripciones.mvp.service.*;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.asi.inscripciones.mvp.dto.FormularioDTO;
import com.asi.inscripciones.mvp.mapper.FormularioMapper;
import com.asi.inscripciones.mvp.mapper.FormularioInscripcionMapper;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import com.asi.inscripciones.mvp.util.Url;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Mono;
import lombok.extern.log4j.Log4j2;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;

@Log4j2
@RestController
@RequestMapping(Url.API+Url.FORMULARIO)
public class FormularioController {

    @Autowired
    FormularioMongoRepository FormularioMongoRepository;
    @Autowired
    CitizenResponseRepository citizenResponseRepository;
    @Autowired
    CitizenResponseService citizenResponseService;
    @Autowired
    FormularioService formularioService;
    @Autowired
    FormularioInscripcionService formularioInscripcionService;
    @Autowired
    FormularioInscripcionMapper formularioInscripcionMapper;
    @Autowired
    private FormularioMapper formularioMapper;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private OrganismoService organismoService;
    @Autowired
    InstanciaService instanciaService;
    @Autowired
    private ClaseAlumnoService claseAlumnoService;
    @Autowired
    private ClaseService claseService;
    @Autowired
    private ContadorCupoService contadorCupoService;
    @Autowired
    private InstanciaSedeService instanciaSedeService;
    @Autowired
    private RedisService redisService;

    @PostMapping(value = "save")
    public ResponseEntity<FormularioMongoDTO> save(@RequestBody FormularioMongoDTO formObject) {
        FormularioMongoDTO mongoForm = formularioService.addForm(formObject);
        // System.out.println(formObject);

        FormularioDTO form = FormularioDTO.builder()
                .nombre(formObject.nombre)
                .descripcion(formObject.descripcion)
                .estado(ConstanteEstados.ACTIVO)
                .idRefMongo(mongoForm.id)
                .build();
        // System.out.println(form);

        Formulario newForm = formularioService.loadFormulario(form);
        // System.out.println(newForm);

        Formulario savedForm = formularioService.saveFormulario(newForm);
        System.out.println(savedForm);

        return ResponseEntity.status(HttpStatus.OK).body(mongoForm);
    }

    @PostMapping(value = "saveCitizenResponse")
    public ResponseEntity<CitizenResponse> saveCitizenResponse(@RequestBody CitizenResponse citizenResponse){

        CitizenResponse response = citizenResponseService.save(citizenResponse);

        ContadorCupo contadorCupo = new ContadorCupo();
        contadorCupo.setInscripcionId(citizenResponse.inscripcionId);
        contadorCupo.setFormularioId(citizenResponse.formularioId);
        contadorCupo.setInstanciaId(citizenResponse.instanciaId);
        contadorCupo.setSynchronizedToOracle(false);

        Mono<ContadorCupo> contador = contadorCupoService.upsertAndIncrementCounter(contadorCupo);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(value = "/edit/{id}")
    public ResponseEntity<Object> edit(@PathVariable String id, @RequestBody FormularioMongoDTO formObject) {
        FormularioMongoDTO mongoForm = formularioService.editForm(id, formObject);
        mongoForm.id = id;
        Formulario form = formularioService.getFormularioByidRefMongo(id);

        form.setNombre(mongoForm.nombre);
        formularioService.updateFormulario(form);

        //Actualizando REDIS
        redisService.saveFormularioEnRedis(mongoForm);
        return ResponseEntity.status(HttpStatus.OK).body(mongoForm);
    }

    @GetMapping(value = "listar")
    public ResponseEntity<Object> showAll(Model model) {
        List<FormularioMongoDTO> form = formularioService.getForms();
        return ResponseEntity.status(HttpStatus.OK).body(form);
    }

    @GetMapping(value = "/show/{id}")
    public ResponseEntity<Object> show(@PathVariable String id, Model model) {
        List<FormularioMongoDTO> form = formularioService.getForm(id);
        return ResponseEntity.status(HttpStatus.OK).body(form);
    }

    @GetMapping
    public ResponseEntity<Page<FormularioDTO>> formularios(
        @PageableDefault(page = 0, size = 10, sort ="id") final Pageable pageable,
        @RequestParam(value = "filter", required = false) String filter) {

        List<Formulario> formulario = formularioService.getAllPage(ConstanteEstados.ACTIVO, filter, pageable);
        List<FormularioDTO> formularioDTOList = formularioMapper.map(formulario);

        long totalCount = formularioService.countFormulariosByEstadoAndNombre(ConstanteEstados.ACTIVO, filter);
        Page<FormularioDTO> pageReturn = new PageImpl<>(formularioDTOList, pageable, totalCount);

        return ResponseEntity.status(HttpStatus.OK).body(pageReturn);
    }

    @GetMapping(Url.ALL)
    public ResponseEntity<List<FormularioDTO>> formularioTList(){

        List<Formulario> formularioList = formularioService.getStateAll(ConstanteEstados.ACTIVO);

        List<FormularioDTO> tipoDTOList =  formularioMapper.map(formularioList);

        return ResponseEntity.status(HttpStatus.OK).body(tipoDTOList);
    }

    @GetMapping(value = "syncMongoData")
    @Transactional
    public void syncData(@RequestParam(value = "inscripcionId", required = false) Long inscripcionId, 
                        @RequestParam(value = "loteSize", required = false) Integer loteSize) {
        log.info("Llega al metodo procesarDatosPorLotes / syncMongo");
        if(loteSize != null){
            int pagina = 0;
            Page<CitizenResponse> resultado;
            do {
                log.info("pagina: " + pagina);
                PageRequest pageRequest = PageRequest.of(pagina, loteSize, Sort.by("id"));
                if (inscripcionId != null) {
                    resultado = citizenResponseService.getUnsynchronizedResponsesByPageWithInscripcionId(inscripcionId, pageRequest);
                }else {
                    resultado = citizenResponseService.getUnsynchronizedResponses(pageRequest);
                }
                /* Sincronizar Datos */
                this.syncUsers(resultado.getContent());
                pagina++;
            } while (resultado.hasNext());
            log.info("Sale del metodo procesarDatosPorLotes / SyncMongo");
        }else if(inscripcionId !=null){
            List<CitizenResponse> response = citizenResponseService.getUnsynchronizedResponsesByInscripcionId(inscripcionId);
            this.syncUsers(response);
        }else{
            List<CitizenResponse> response = citizenResponseService.getUnsynchronizedResponsesByNothing();
            this.syncUsers(response);
        }
    }

   //@Scheduled(cron = "0 */30 * * * *") 
    /* public void scheduledSyncData() {
        syncData(null);
    }*/

    @GetMapping(value = "/getResultsByCuilAndIdInstancia/{cuil}/{IdInstancia}")
    public ResponseEntity<CitizenResponse> getResultsByCuilAndIdInstancia(@PathVariable("cuil") String cuil, @PathVariable("IdInstancia") Long IdInstancia){
        CitizenResponse response =  citizenResponseService.getByCuilAndIdInstancia(cuil, IdInstancia);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value ="/getResultsByCuilAndIdInscripcion/{cuil}/{idInscripcion}")
    public ResponseEntity<List<CitizenResponse>> getResultsByCuilAndIdInscripcion(@PathVariable("cuil") String cuil, @PathVariable("idInscripcion") Long idInscripcion){
        List<CitizenResponse> response =  citizenResponseService.getByCuilAndIdInscripcion(cuil, idInscripcion);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/getFormByIdInscripcion/{id}")
    public ResponseEntity <FormularioMongoDTO> getFormByIdInscripcion(@PathVariable("id") Long id){
        FormularioInscripcion formInscripcion = formularioInscripcionService.getFormularioInscripcionByIdInscripcionOne(id);

        if (formInscripcion.getId() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        FormularioMongoDTO response = formularioService.getFormByID(formInscripcion.formulario.getIdRefMongo());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/getCounterByinstanciaId/{IdInstancia}")
    public ResponseEntity<Integer> getCounterByinstanciaId(@PathVariable("IdInstancia") Long IdInstancia){
        Mono<ContadorCupo> response = contadorCupoService.findByIdInstancia(IdInstancia);
        Integer counter = response.blockOptional().orElse(new ContadorCupo()).getCounter();
        // System.out.println(counter);
        return ResponseEntity.status(HttpStatus.OK).body(counter == null ? 0 : counter);
    }

    @Transactional
    @PostMapping(value = "cancelCitizenInscription")
    public ResponseEntity<Integer> cancelCitizenInscription(@RequestParam("mongoID") String mongoID){
       CitizenResponse cupo = citizenResponseService.softDeleteByMongoID(mongoID);

        if (cupo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(0);
        }

        // Restar cantidadCupos al contador de cupos (MONGO)
        contadorCupoService.reduceCounter(cupo.getInstanciaSedeId(), 1);

        try {
            Usuario usuario = usuarioService.findUsuarioByCuil(cupo.getCuil());

            // Soft Delete a registros de ClaseAlumno (Oracle)
            claseService.softDeleteClaseAlumnoByUsuarioId(usuario.getId(), cupo.getInstanciaSedeId());
        } catch (Exception e) {
            // TODO: handle exception
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(1);
    }

    @GetMapping("/getResultsByCuilAndIdInstanciaSedeId/{cuil}/{instanciaSedeId}")
    public ResponseEntity<CitizenResponse> getResultsByCuilAndIdInstanciaSedeId(@PathVariable("cuil") String cuil, @PathVariable("instanciaSedeId") Long instanciaSedeId){
        CitizenResponse response =  citizenResponseService.getByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/getCounterByinstanciaSedeId/{instanciaSedeId}")
    public ResponseEntity<Integer> getCounterByinstanciaSedeId(@PathVariable("instanciaSedeId") Long instanciaSedeId){
        Mono<ContadorCupo> response = contadorCupoService.findByInstanciaSedeId(instanciaSedeId);
        Integer counter = response.blockOptional().orElse(new ContadorCupo()).getCounter();
        // System.out.println(counter);
        return ResponseEntity.status(HttpStatus.OK).body(counter == null ? 0 : counter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormularioDTO> getFormulario(@PathVariable Long id){

        Formulario formulario =  formularioService.getFormularioById(id);

        FormularioDTO formularioDTO =  formularioMapper.convertFormularioToDto(formulario);

        return ResponseEntity.status(HttpStatus.OK).body(formularioDTO);
    }

    public void syncUsers(List<CitizenResponse> responses){

        Rol rol = roleService.getRolById(0L);

        Organismo organismo = organismoService.findById(0L);

        for (CitizenResponse response : responses) {
            
            String nombre = response.nombre;
            String apellido = response.apellido;
            String email = response.email;
            String cuil = response.cuil;
            
            // Consultar si existe el cuil en la tabla de usuarios.
            List<Usuario> usuarios = usuarioService.getUserByCuilAndEstado(cuil);

            Usuario usuario = null;
            if (usuarios.size() > 0) {
                usuario = usuarios.get(0);
            }

            if (usuario == null) {

                try {
                    usuario = new Usuario();
                    usuario.setNombre(nombre);
                    usuario.setApellido(apellido);
                    usuario.setEmail(email);
                    usuario.setCuil(cuil);
                    usuario.setRol(rol);
                    usuario.setEstado(1);
                    usuario.setOrganismo(organismo);
                    usuarioService.saveUser(usuario);
                } catch (Exception e) {
                    System.out.println("Error creando usuario");
                    log.error(e);

                    StringWriter sw = new StringWriter();
                    PrintWriter pw = new PrintWriter(sw);
                    e.printStackTrace(pw);
                    String exceptionStackTrace = sw.toString();
                    response.synchronizedToOracle = true;
                    response.estado = false;
                    response.synchronizedError = "Error Creando usuario: " + exceptionStackTrace;
                    citizenResponseService.edit(response.id, response);

                    ContadorCupo cupo = citizenResponseService.getContadorCupoByInstanciaId(response.instanciaId);

                    int newCounterValue = cupo.getCounter() - 1;
                    cupo.counter = newCounterValue >= 0 ? newCounterValue : 0;

                    citizenResponseService.editContadorCupo(cupo.getId(), cupo);

                    // ACA RESTAR CUPO AL CONTADOR
                    continue;
                }
            }
            
            // traerse todas las clases de una instancia:
            // Luego iterarlas y por cada clase crear un registro en clase_alumno
            // tomando en cuenta el user_id y la clase_id.

            try {
                
                InstanciaSede instanciaSede = instanciaSedeService.getByID(response.instanciaSedeId);

                for (Clase clase : instanciaSede.getClase()) {
                    ClaseAlumno registroPrevio = claseAlumnoService.getByClaseIdUsuarioId(clase.getId(), usuario.getId());

                    if (registroPrevio == null) {
                        ClaseAlumno claseAlumno = new ClaseAlumno();
                        claseAlumno.setUsuario(usuario);
                        claseAlumno.setClase(clase);
                        claseAlumno.setEstado(1);
                        claseAlumno.setAsistencia(0);
                        claseAlumnoService.save(claseAlumno);
                    }
                }
            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("Error creando clase alumno");

                // Get the exception stack trace as a string
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                String exceptionStackTrace = sw.toString();

                // Storing the error message
                response.synchronizedToOracle = true;
                response.estado = false;
                response.synchronizedError = "Error creando clase alumno: " + exceptionStackTrace;
                citizenResponseService.edit(response.id, response);
                log.error(e);
                continue;
            }
            // Marcar como sincronizada.
            response.synchronizedToOracle = true;
            citizenResponseService.edit(response.id, response);
        }
    }
}
