package com.asi.inscripciones.mvp.controller;

import com.asi.inscripciones.mvp.dto.redis.FormularioInscripcionRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.InscripcionRedisDTO;
import com.asi.inscripciones.mvp.dto.redis.InstanciaSedeRedisDTO;
import com.asi.inscripciones.mvp.service.RedisService;
import com.asi.inscripciones.mvp.util.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping(Url.API+"/redisService")
public class RedisController {
    @Autowired
    RedisService redisService;

    @GetMapping("/instanciaSede")
    public ResponseEntity<List<InstanciaSedeRedisDTO>>  getAllInstanciaSede() {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getAllInstanciaSede());
    }
    @GetMapping("instanciaSede/{id}")
    public ResponseEntity<InstanciaSedeRedisDTO>  getInstanciaSedeById(@PathParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getInstanciaSedeById(id));
    }

    @GetMapping("/inscripcion")
    public ResponseEntity<List<InscripcionRedisDTO>>  getAllInscripciones() {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getAllInscripciones());
    }
    @GetMapping("inscripcion/{id}")
    public ResponseEntity<InscripcionRedisDTO>  getInscripcionById(@PathParam("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getInscripcionById(id));
    }

    @GetMapping("/formularioInscripcion")
    public ResponseEntity<List<FormularioInscripcionRedisDTO>>  getAllFormulariosInscripciones() {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getAllFormulariosInscripciones());
    }
    @GetMapping("formularioInscripcion/{id}")
    public ResponseEntity<FormularioInscripcionRedisDTO>  getFormularioInscripcionById(@PathParam("id") Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getFormularioInscripcionById(id));
    }

    @GetMapping("formularioInscripcion/getByIdRefMongo/{idRefMongo}")
    public ResponseEntity<FormularioInscripcionRedisDTO>  getFormularioInscripcionByIdRefMongo(@PathParam("idRefMongo") String idRefMongo) {
        return ResponseEntity.status(HttpStatus.OK).body(redisService.getFormularioInscripcionByIdRefMongo(idRefMongo));
    }
}
