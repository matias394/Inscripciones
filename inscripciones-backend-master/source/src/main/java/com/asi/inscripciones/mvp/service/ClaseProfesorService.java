package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.repository.ClaseProfesorRepository;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClaseProfesorService {

    @Autowired
    final private ClaseProfesorRepository claseProfesorRepository;


    BiPredicate<ClaseProfesor,Long> inscripcionTipoPredicate = (item,val)-> item.getClase().getInstanciaSede().getInstancia().getInscripcion().getTipo().getId().equals(val);
    Function<ClaseProfesor, Inscripcion> inscripcionesMaoFunction = item->item.getClase().getInstanciaSede().getInstancia().getInscripcion();



    public ClaseProfesor save(ClaseProfesor claseProfesor){
        ClaseProfesor response  = claseProfesorRepository.save(claseProfesor);
        return response;
    }



    public void delete(ClaseProfesor claseProfesor){
        claseProfesorRepository.delete(claseProfesor);
    }



    public List<ClaseProfesor> getByClaseId(final Long claseSedeId){
        List<ClaseProfesor> claseProfesor = claseProfesorRepository.findByClaseId(claseSedeId);
        return claseProfesor;
    }



    public  List<ClaseProfesor> getByClaseIdList(final List<Long> claseIdList){

        List<ClaseProfesor> claseProfesor = new ArrayList<>();
        claseIdList.forEach(id->{
            claseProfesor.addAll(claseProfesorRepository.findByClaseId(id));
        });

        return claseProfesor;
    }


    public  List<ClaseProfesor> getInstanciasByUsuarioIdList(final Long usuarioId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioId(usuarioId);
        return claseProfesorList;
    }


    public List<ClaseProfesor> getByProfesorAndSede(final Long profesorId, final Long sedeId){

        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioAndSedeObject(profesorId, sedeId);

        return claseProfesorList;
    }


    public List<ClaseProfesor> getByInscripcion(final Long inscripcionId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByInscripcion(inscripcionId);
        return claseProfesorList;
    }

    public List<ClaseProfesor> getByInstancia(final Long inscripcionId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByInstancia(inscripcionId);
        return claseProfesorList;
    }


    public List<ClaseProfesor> getByProfesorAndSedeAndInscripcion(final Long profesorId, final Long sedeId, final Long inscripcionId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByProfesorAndSedeAndInscripcion(profesorId,sedeId,inscripcionId);
        return claseProfesorList;
    }


    public List<ClaseProfesor> getByProfesorAndSedeAndInscripcionAndInstancia(final Long profesorId, final Long sedeId, final Long inscripcionId, final Long instanciaId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByProfesorAndSedeAndInscripcionAndInstancia(profesorId,sedeId,inscripcionId,instanciaId);
        return claseProfesorList;
    }


    public List<ClaseProfesor> getByProfesorAndSedeAndInstancia(final Long profesorId, final Long sedeId, final Long instanciaId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByProfesorAndSedeAndInstancia(profesorId,sedeId,instanciaId);
        return claseProfesorList;
    }


    public List<ClaseProfesor> getByProfesorAndSedeAndInscripcionAndInstanciaAndInstanciaSede(final Long profesorId, final Long sedeId, final Long inscripcionId, final Long instanciaId, final Long instanciaSedeId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByProfesorAndSedeAndInscripcionAndInstancia(profesorId,sedeId,inscripcionId,instanciaId,instanciaSedeId);
        return claseProfesorList;
    }



    public Set<Inscripcion> getInscrpcionByUsuarioId (final Long usuarioId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioId(usuarioId);
        Set<Inscripcion> inscripcionSet = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede().getInstancia().getInscripcion()).collect(Collectors.toSet());
        return inscripcionSet;
    }



    public List<Instancia> getInstanciaByUsuarioIdAndInscripcion (final Long usuarioId, final Long inscripcionId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioIdAndInscripcionId(usuarioId,inscripcionId);
        Set<Instancia> instanciaSet = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede().getInstancia()).collect(Collectors.toSet());
        return instanciaSet.stream().toList();
    }



    public List<Instancia> getInstanciaByProfesor (final Long profesorId, final Long instanciaId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioIdAndInstanciaId(profesorId,instanciaId);
        Set<Instancia> instanciaSet = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede().getInstancia()).collect(Collectors.toSet());
        return instanciaSet.stream().toList();
    }



    public List<InstanciaSede> getInstanciaSedeByUsuarioAndInscripcion(final Long usuarioId, final Long inscripcionId, final Long instanciaId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioIdAndInscripcionIdAndInstanciaId(usuarioId,inscripcionId,instanciaId);
        Set<InstanciaSede> instanciaSedeSet = claseProfesorList.stream().map(item->item.getClase().getInstanciaSede()).collect(Collectors.toSet());
        return instanciaSedeSet.stream().toList();
    }



    public List<Clase> getByUsuarioAndInscripcionAndInstanciaAndInstanciaSede(final Long usuarioId,
                                                                                       final Long inscripcionId,
                                                                                       final Long instanciaId,
                                                                                       final Long instanciaSedeId){
        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioAndInscripcionAndInstanciaAndInstanciaSede(usuarioId,inscripcionId,instanciaId,instanciaSedeId);
        Set<Clase> claseSet = claseProfesorList.stream().map(item->item.getClase()).collect(Collectors.toSet());
        return claseSet.stream().toList();
    }



    public  Set<Inscripcion> getInstanciasByUsuarioIdAndTipoIdProfesor (final Long usuarioId, final Long tipoId){

        List<ClaseProfesor> claseProfesorList = claseProfesorRepository.findByUsuarioId(usuarioId);

        Set<Inscripcion> inscripcionSet = claseProfesorList.stream()
                .filter(item->inscripcionTipoPredicate.test(item,tipoId))
                .map(inscripcionesMaoFunction).collect(Collectors.toSet());

        return inscripcionSet;
    }



    public List<ClaseProfesor> getListToUsuarioAndClase(final List<Clase> claseSedeList, List<Usuario> profesorList){

        List<ClaseProfesor> responseList = new ArrayList<>();

        for(Usuario profesor : profesorList){

            for(Clase clase : claseSedeList){

                ClaseProfesor claseProfesor = new ClaseProfesor();
                claseProfesor.setUsuario(profesor);
                claseProfesor.setClase(clase);
                claseProfesor.setEstado(ConstanteEstados.ACTIVO);

                responseList.add(claseProfesor);
            }
        }

        return responseList;
    }

}
