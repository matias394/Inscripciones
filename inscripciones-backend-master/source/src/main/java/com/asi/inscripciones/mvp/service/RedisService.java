package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.ClaseDTO;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import com.asi.inscripciones.mvp.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.FormularioRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.InscripcionRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.InstanciaSedeRedisDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.mapper.redis.FormularioInscripcionRedisMapper;
import com.asi.inscripciones.mvp.mapper.redis.FormularioRedisMapper;
import com.asi.inscripciones.mvp.mapper.redis.InscripcionRedisMapper;
import com.asi.inscripciones.mvp.mapper.redis.InstanciaSedeMapper;
import com.asi.inscripciones.mvp.repository.ClaseRepository;
import com.asi.inscripciones.mvp.repository.redis.FormularioInscripcionRedisRepository;
import com.asi.inscripciones.mvp.repository.redis.FormularioRedisRepository;
import com.asi.inscripciones.mvp.repository.redis.InscripcionRedisRepository;
import com.asi.inscripciones.mvp.repository.redis.InstanciaSedeRedisRepository;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class RedisService {

    @Autowired
    private InstanciaService instanciaService;

    @Autowired
    private InstanciaSedeRedisRepository instanciaSedeRedisRepository;

    @Autowired
    private InscripcionRedisRepository inscripcionRedisRepository;

    @Autowired
    private FormularioInscripcionRedisRepository formularioInscripcionRedisRepository;

    @Autowired
    private FormularioRedisRepository formularioRedisRepository;

    @Autowired
    private InstanciaSedeMapper instanciaSedeMapper;

    @Autowired
    private InscripcionRedisMapper inscripcionRedisMapper;

    @Autowired
    private FormularioInscripcionRedisMapper formularioInscripcionRedisMapper;

    @Autowired
    private FormularioRedisMapper formularioRedisMapper;

    @Autowired
    private InstanciaSedeService instanciaSedeService;

    @Autowired
    private ClaseRepository claseRepository;

    @Autowired
    private ClaseService claseService;

    @Autowired
    private FormularioService formularioService;

    public void saveInstanciaSede(final List<Instancia> instancias) {
        instancias.forEach(instancia -> saveInstanciaSedeRedis(instancia.getInstanciaSede()));
    }

    private void saveInstanciaSedeRedis(final List<InstanciaSede> instanciaSedeList){
        instanciaSedeList.forEach(instanciaSede -> {
            if (instanciaSede.getEstado().equals(ConstanteEstados.ACTIVO)){
                InstanciaSedeRedisDTO instanciaSedeRedisDTO = instanciaSedeMapper.convertToInstanciaSedeRedis(instanciaSede);
                LocalDate lastDay = instanciaService.ultimaFecha(instanciaSede.getClase());
                instanciaSedeRedisDTO.setFechaFin(lastDay);
                setHorarios(instanciaSede.getClase(), instanciaSedeRedisDTO);
                instanciaSedeRedisRepository.save(instanciaSedeRedisDTO);
            }else{
                log.info("instanciaSede.getId() a eliminar: " + instanciaSede.getId() );
                instanciaSedeRedisRepository.deleteById(instanciaSede.getId());
            }

        });
    }

    private void setHorarios(List<Clase> clases, InstanciaSedeRedisDTO instanciaSedeRedisDTO){
        List<ClaseDTO> claseDTOList = new ArrayList<>();
        for (Clase clase : clases) {
            ClaseDTO claseDTO = claseService.convertToClaseDTO(clase);
            claseDTOList.add(claseDTO);
        }
        instanciaSedeRedisDTO.setHorarios(instanciaSedeService.multiScheduleFechaDias(claseDTOList));
    }

    public void saveInscripcion(final Inscripcion inscripcion) {
        InscripcionRedisDTO inscripcionRedisDTO = inscripcionRedisMapper.convertToInscripcionRedis(inscripcion);
        inscripcionRedisDTO.setTokenFromUrl();
        inscripcionRedisRepository.save(inscripcionRedisDTO);
    }
    @Transactional
    public void saveFormularios(final List<FormularioInscripcion> listaFormularioInscripcion) {
        listaFormularioInscripcion.forEach(formularioInscripcion -> {
            FormularioInscripcionRedisDTO formularioInscripcionRedisDTO = formularioInscripcionRedisMapper.convertToFormularioInscripcionRedis(formularioInscripcion);
            formularioInscripcionRedisRepository.save(formularioInscripcionRedisDTO);
            saveFormularioEnRedis(formularioService.getFormByID(formularioInscripcionRedisDTO.getIdRefMongo()));
        });
    }

    public void saveFormularioEnRedis(FormularioMongoDTO formularioMongo) {
        FormularioRedisDTO formularioRedisDTO = formularioRedisMapper.convertToFormularioRedis(formularioMongo);
        formularioRedisRepository.save(formularioRedisDTO);
    }

    public List<InstanciaSedeRedisDTO> getAllInstanciaSede() {
        List<InstanciaSedeRedisDTO> lista = new ArrayList<>();
        instanciaSedeRedisRepository.findAll().iterator().forEachRemaining(lista::add);
        return lista;
    }

    public InstanciaSedeRedisDTO getInstanciaSedeById(final Long id) {
        return instanciaSedeRedisRepository.findById(id).orElse(null);
    }

    public List<InscripcionRedisDTO> getAllInscripciones() {
        List<InscripcionRedisDTO> lista = new ArrayList<>();
        inscripcionRedisRepository.findAll().iterator().forEachRemaining(lista::add);
        return lista;
    }

    public InscripcionRedisDTO getInscripcionById(final Long id) {
        return inscripcionRedisRepository.findById(id).orElse(null);
    }

    public List<FormularioInscripcionRedisDTO> getAllFormulariosInscripciones() {
        List<FormularioInscripcionRedisDTO> lista = new ArrayList<>();
        formularioInscripcionRedisRepository.findAll().iterator().forEachRemaining(lista::add);
        return lista;
    }

    public FormularioInscripcionRedisDTO getFormularioInscripcionById(final Integer id) {
        return formularioInscripcionRedisRepository.findById(id).orElse(null);
    }

    public FormularioInscripcionRedisDTO getFormularioInscripcionByIdRefMongo(final String idRefMongo) {
        return formularioInscripcionRedisRepository.findByIdRefMongo(idRefMongo).orElse(null);
    }
}
