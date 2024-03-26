package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.ListaDTO;
import com.asi.inscripciones.mvp.dto.SedeDTO;
import com.asi.inscripciones.mvp.entity.*;
import com.asi.inscripciones.mvp.mapper.SedeMapper;
import com.asi.inscripciones.mvp.repository.ClaseProfesorRepository;
import com.asi.inscripciones.mvp.repository.ClaseRepository;
import com.asi.inscripciones.mvp.repository.SedeRepository;
import com.asi.inscripciones.mvp.util.Accion;
import com.asi.inscripciones.mvp.util.ConstanteEstados;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SedeService {

    @Autowired
    final private SedeRepository sedeRepository;

    @Autowired
    final private SedeMapper sedeMapper;

    @Autowired
    private ClaseProfesorService claseProfesorService;

    @Autowired
    private InstanciaService instanciaService;


    public Sede getByname(String nombre){
        
        Optional<Sede> sede = sedeRepository.findByName(nombre);
        return sede.orElse(new Sede());
    }


    public Sede getSedeById(Long id){
        Optional<Sede> sede = sedeRepository.findById(id);
        return sede.orElse(new Sede());
    }

    public List<Sede> listAll(){

        List<Sede> sedeListAll = sedeRepository.findAll();
        return sedeListAll;
    }

    public List<Sede> getStateAll(final Integer estado){
        List<Sede> sedeListAll = sedeRepository.getStateAll(estado);
        return sedeListAll;
    }

    public Sede saveSede(Sede sede){
      Sede sedeObject = new Sede();
        if(!validateSedeName(sede)){
            sedeObject = sedeRepository.save(sede);
        }else{
            sedeObject = null;
        }
        return sedeObject;
    }
    
    @Transactional
    public Sede updateSede(Sede sede){
      Sede sedeObject = new Sede();
        if(!validateSedeName(sede)){
            sedeObject = sedeRepository.save(sede);
        }else{
            sedeObject = null;
        }
        return sedeObject;
    }

    public Boolean deleteSedeById(final Long id) {
        Boolean isDelete;
        Sede sede = sedeRepository.findById(id).get();
        sede.setEstado(ConstanteEstados.INACTIVO);
        sedeRepository.save(sede);
        isDelete = true;

        return isDelete;
    }  

    public List<Sede> getAllPage(final Integer estado, String filter, final Pageable pageable){

        if (filter != null && !filter.trim().isEmpty()) {
            return sedeRepository.findByEstadoAndIdOrNombreOrDireccionOrPisoOrEmailLike(estado, "%" + filter + "%", pageable);
        } else {
            return sedeRepository.findAllPage(estado, pageable);
        }
    }

    public List<Sede> getInstanciasByUsuarioId(final Long usuarioId){

        Set<Inscripcion>  inscripcionSet = claseProfesorService.getInscrpcionByUsuarioId(usuarioId);
        Set<Sede> sedeSet = new HashSet<>();

        for(Inscripcion item : inscripcionSet) {

            List<Instancia> instanciaList = instanciaService.getInstanciaByIdInscripcion(item.getId()); // TODO

            for(Instancia instancia : instanciaList) {

                for(InstanciaSede instanciaSede : instancia.getInstanciaSede()){
                    sedeSet.add(instanciaSede.getSede());
                }

            }

            item.setInstancias(instanciaList);
        }

        return sedeSet.stream().toList();
    }

    //TODO revisar este metodo, no esta funcionado como deberia, trae dupicados, a persar de haber usado dinstinc
    //TODO esta solucion es parcial
    @Transactional
    public List<Sede> getSedesByUsuarioId(Long usuarioId, String filter, Pageable pageable) {
        List<Long> sedeListLong = new ArrayList<>();
        if (filter != null && !filter.trim().isEmpty()) {
            sedeListLong = sedeRepository.findLongListForSedeWithFilter(usuarioId, "%" + filter + "%");
        } else {
            sedeListLong = sedeRepository.findLongListForSede(usuarioId, pageable); 
        }
        List<Sede> sedeList = sedeRepository.findByIdList(sedeListLong);

        return sedeList;
    }

    public long getSedesByUsuarioIdCount(Long usuarioId, String filter) {
        List<Long> idList;
        if (filter != null && !filter.trim().isEmpty()) {
            idList = sedeRepository.findLongListForSedeWithFilter(usuarioId, "%" + filter + "%");
        } else {
            idList = sedeRepository.findLongListForSedeCount(usuarioId); 
        }
        List<Long> idNoDuplicados = new HashSet<>(idList).stream().toList();
        return idNoDuplicados.size();
    }



    public List<Sede> getByOrganisoAndTipoAndUsuario(Long organismoId, Long tipoId, Long usuarioId, String filter, Pageable pageable) {
        List<Long> idList;
        if (filter != null && !filter.trim().isEmpty()) {
            idList = sedeRepository.getByOrganisoAndTipoAndUsuarioAndNombreLike(organismoId, tipoId, usuarioId, "%" + filter + "%");
        } else {
            idList = sedeRepository.getByOrganisoAndTipoAndUsuario(organismoId, tipoId, usuarioId);
        }
    
        List<Long> idNoDuplicados = new LinkedHashSet<>(idList).stream().toList();
        List<Sede> sedeList = sedeRepository.findById(idNoDuplicados, pageable);
        return new LinkedHashSet<>(sedeList).stream().toList();
    }
    
    public long getByOrganisoAndTipoAndUsuarioCount(Long organismoId, Long tipoId, Long usuarioId, String filter) {
        List<Long> idList;
        if (filter != null && !filter.trim().isEmpty()) {
            idList = sedeRepository.getByOrganisoAndTipoAndUsuarioAndNombreLike(organismoId, tipoId, usuarioId, "%" + filter + "%");
        } else {
            idList = sedeRepository.getByOrganisoAndTipoAndUsuario(organismoId, tipoId, usuarioId);
        }
    
        List<Long> idNoDuplicados = new HashSet<>(idList).stream().toList();
        return idNoDuplicados.size();
    }

    public ListaDTO convertToDTO(Sede sede){

        ListaDTO listaDTO = ListaDTO.builder()
                .nombreApellido(sede.getNombre())
                .id(sede.getId())
                .build();

        return listaDTO;
    }


    public Sede loadSede(final SedeDTO sedeDTO, final Accion accion){
        Date today = new Date();
        LocalDate todayLocal = today.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Sede sede = sedeMapper.convertDtoToSede(sedeDTO);
        if(accion.equals(Accion.MODIFICAR)){
            Sede response = this.getSedeById(sedeDTO.getId());
            sede.setCreado(response.getCreado());
            sede.setCreadoPor(response.getCreadoPor());
            sede.setModificado(todayLocal);
            sede.setModificadoPor("Admin");
            sede.setEstado(1);
        } else if(accion.equals(Accion.CREAR)){
            sede.setCreado(todayLocal);
            sede.setCreadoPor("Admin");
            sede.setModificado(todayLocal);
            sede.setModificadoPor("Admin");
            sede.setEstado(1);
        }

        return sede;
    }

    public Boolean validateSedeName(final Sede sedeDTO){
        Boolean repeated = false;
        List<Sede> sedeList = new ArrayList<>();
        sedeList = listAll();
            for(Sede sede : sedeList){
                if(sede.getNombre().trim().equals(sedeDTO.getNombre().trim()) && !sede.getId().equals(sedeDTO.getId())){
                    repeated = true;
                    break;
                }
            }
        return repeated;
    }


    public List<Sede> getSedesByTipoAndUsuario(final Long tipoId, final Long usuarioId){

        List<ClaseProfesor> claseProfesorList = claseProfesorService.getInstanciasByUsuarioIdList(usuarioId);

        List<Clase> claseList = claseProfesorList.stream().map(ClaseProfesor::getClase).toList();

        List<InstanciaSede> instanciaSedes = claseList.stream().map(Clase::getInstanciaSede).collect(Collectors.toSet()).stream().toList();

        List<Sede> sedeReturn = instanciaSedes.stream()
                .filter(item->item.getInstancia().getInscripcion().getTipo().equals(tipoId))
                .map(InstanciaSede::getSede)
                .toList();

        return sedeReturn;
    }


    public List<Sede> getByOrganismoAndTipo(final Long organismoId, final Long tipoId, Pageable pageable){

        List<Sede> claseSedeList = sedeRepository.findByOrganismoidTipoid(organismoId, tipoId,pageable);

        return claseSedeList;
    }
    public long getByOrganismoAndTipoCount(final Long organismoId, final Long tipoId){

        long count = sedeRepository.findByOrganismoidTipoidCount(organismoId, tipoId);

        return count;
    }





    public List<Sede> eliminarDuplicadosPorId(List<Sede> listaDeSedes) {
        Set<Long> idsUnicos = new HashSet<>();
        List<Sede> listaSinDuplicados = new ArrayList<>();

        for (Sede sede : listaDeSedes) {
            if (!idsUnicos.contains(sede.getId())) {
                listaSinDuplicados.add(sede);
                idsUnicos.add(sede.getId());
            }
        }

        return listaSinDuplicados;
    }

    public long countSedeByEstado(Integer estado) {
        return sedeRepository.countByEstado(estado);
    }

    public long countSedesByEstadoAndNombre(Integer estado, String nombreFilter) {
        if (nombreFilter != null && !nombreFilter.trim().isEmpty()) {
            return sedeRepository.countByEstadoAndNombreLike(estado, "%" + nombreFilter + "%");
        } else {
            return sedeRepository.countByEstado(estado);
        }
    }

    public long countAllSedes(final Integer estado, final String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return sedeRepository.countByEstadoAndIdOrNombreOrDireccionOrPisoOrEmailLike(estado, "%" + filter + "%");
        } else {
            return sedeRepository.countByEstado(estado);
        }
    }

    public List<Sede> getSedeByInstanciaId(final Long instanciaId){

            return sedeRepository.findAllSedesByInstanciaId(instanciaId);

    }


}
