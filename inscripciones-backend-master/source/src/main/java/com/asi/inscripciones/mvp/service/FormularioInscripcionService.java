package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.FormularioInscripcionDTO;
import com.asi.inscripciones.mvp.entity.Formulario;
import com.asi.inscripciones.mvp.entity.FormularioInscripcion;
import com.asi.inscripciones.mvp.entity.Inscripcion;
import com.asi.inscripciones.mvp.mapper.FormularioInscripcionMapper;
import com.asi.inscripciones.mvp.repository.FormularioInscripcionRepository;
import com.asi.inscripciones.mvp.util.Accion;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormularioInscripcionService {
    
    @Autowired
    final private FormularioInscripcionRepository formularioInscripcionRepository;

    @Autowired
    private FormularioService formularioService;

    @Autowired
    InscripcionService inscripcionService;

    @Autowired
    private FormularioInscripcionMapper mapper;

    public FormularioInscripcion saveFormularioInscripcion(final FormularioInscripcion formularioInscripcion){

        FormularioInscripcion formularioInscripcionSave = formularioInscripcionRepository.save(formularioInscripcion);
        return formularioInscripcionSave;
    }


    public FormularioInscripcion getFormularioInscripcionById(final Long id){

        Optional<FormularioInscripcion> formularioInscripcion = formularioInscripcionRepository.findById(id);
        return formularioInscripcion.orElse(new FormularioInscripcion());
    }



    public List<FormularioInscripcion> getFormularioInscripcionByIdInscripcion(final Long id){

        List<FormularioInscripcion> list = formularioInscripcionRepository.findByIdInscripcionList(id);
        return list;
    }

    public FormularioInscripcion getFormularioInscripcionByIdInscripcionOne(final Long id){
        FormularioInscripcion form = formularioInscripcionRepository.findByIdInscripcion(id);
        return form;
    }


    public FormularioInscripcion load(final FormularioInscripcionDTO dto, final Accion accion){

        FormularioInscripcion entity = mapper.convertDtoToFormularioInscrpcion(dto);

        Formulario formulario = formularioService.getFormularioById(dto.formulario());

        entity.setFormulario(formulario);

        if(ObjectUtils.isNotEmpty(dto.inscripcion())){

            Inscripcion inscripcion = inscripcionService.getInscripcionById(dto.inscripcion());
            entity.setInscripcion(inscripcion);
        }

        return entity;
    }


    public void deleteByInscripcion(final Long idInscripcion){
        
        List<FormularioInscripcion> instanciaList = getFormularioInscripcionByIdInscripcion(idInscripcion);
        instanciaList.forEach(formularioInscripcionRepository::delete);
    }


    public void updateList(List<FormularioInscripcion> instancia){

        instancia.forEach(formularioInscripcionRepository::save);
    }


    public List<FormularioInscripcion> getFormularioInscripcionList(List<FormularioInscripcionDTO> formularioInscripcionDTO, Inscripcion inscripcion) {

        List<FormularioInscripcion> formularioInscripcionList = new ArrayList<>();

        for (FormularioInscripcionDTO item : formularioInscripcionDTO) {

            FormularioInscripcion temp = load(item, Accion.CREAR);
            temp.setInscripcion(inscripcion);
            temp.setDirigido(item.dirigido());
            temp.setEstado(item.estado());
            formularioInscripcionList.add(temp);
        }

        return formularioInscripcionList;
    }

}
