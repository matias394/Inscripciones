package com.asi.inscripciones.mvp.service.kafka;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.CitizenResponse;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.service.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.io.StringWriter;

@Log4j2
@Service
public class RegistroInscriptosKafkaConsumer {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private OrganismoService organismoService;
    @Autowired
    private CitizenResponseService citizenResponseService;
    @Autowired
    private InstanciaSedeService instanciaSedeService;
    @Autowired
    private ClaseAlumnoService claseAlumnoService;

    @KafkaListener(topics = "${kafka.topic.nombre.t4}", groupId = "${spring.kafka.consumer.group-id}")
    public void consume(CitizenResponse data){
        System.out.println(String.format("Json - CitizenResponse recibido/leido -> %s", data.toString()));
        sincronizarData(data);
    }

    private void sincronizarData(CitizenResponse data) {
        Rol rol = roleService.getRolById(0L);
        Organismo organismo = organismoService.findById(0L);

        // Consultar si existe el cuil en la tabla de usuarios.
        Usuario usuario = usuarioService.getUserByCuilActivo(data.getCuil());
        if (usuario == null) {

            try {
                usuario = new Usuario();
                usuario.setNombre(data.getNombre());
                usuario.setApellido(data.getApellido());
                usuario.setEmail(data.getEmail());
                usuario.setCuil(data.getCuil());
                usuario.setRol(rol);
                usuario.setEstado(1);
                usuario.setOrganismo(organismo);
                log.info(usuario);

                usuarioService.saveUser(usuario);
            } catch (Exception e) {
                // TODO: handle exception
                log.error("Error creando usuario");
                log.error(e);

                // Get the exception stack trace as a string
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                String exceptionStackTrace = sw.toString();

                // Storing the error message
                actualizarRegistroEnMongo(data,false, "Error Creando usuario: " + exceptionStackTrace);

                ContadorCupo cupo = citizenResponseService.getContadorCupoByInstanciaId(data.getInstanciaId());
                int newCounterValue = cupo.getCounter() - 1;
                cupo.counter = newCounterValue >= 0 ? newCounterValue : 0;
                citizenResponseService.editContadorCupo(cupo.getId(), cupo);

            }

        }

        // traerse todas las clases de una instancia:
        // Luego iterarlas y por cada clase crear un registro en clase_alumno
        // tomando en cuenta el user_id y la clase_id.
        try {

            InstanciaSede instanciaSede = instanciaSedeService.getByID(data.getInstanciaSedeId());

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
            log.error("Error creando clase alumno");
            log.error(e);

            // Get the exception stack trace as a string
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String exceptionStackTrace = sw.toString();

            // Storing the error message
            actualizarRegistroEnMongo(data,false,"Error creando clase alumno: " + exceptionStackTrace);
            log.error(e);

        }

        // Marcar como sincronizada.
        actualizarRegistroEnMongo(data,true, null);
        log.info(data);
    }

    private void actualizarRegistroEnMongo(CitizenResponse data, Boolean estado, String mensajeExceptionStackTrace) {
        data.synchronizedToOracle = true;
        if (estado != null) data.estado = estado;
        if (mensajeExceptionStackTrace != null) data.synchronizedError = mensajeExceptionStackTrace;
        citizenResponseService.edit(data.id, data);
    }
}
