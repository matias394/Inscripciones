package com.asi.inscripciones.mvp.service;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.asi.inscripciones.mvp.dto.FormularioDTO;
import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import com.asi.inscripciones.mvp.repository.FormularioMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import com.asi.inscripciones.mvp.mapper.FormularioMapper;

import com.asi.inscripciones.mvp.entity.Formulario;
import com.asi.inscripciones.mvp.repository.FormularioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormularioService {
    private final FormularioMongoRepository formularioMongoRepository;
    private final MongoTemplate mongoTemplate;
    
    public FormularioMongoDTO addForm(FormularioMongoDTO form) {
        var newForm = formularioMongoRepository.save(form);
        return newForm;
    }
    public List<FormularioMongoDTO> getForms() {
        List<FormularioMongoDTO> forms = formularioMongoRepository.findAll();
        System.out.println(forms);
        return forms;
    }
    public List<FormularioMongoDTO> getForm(String id) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.find(query,FormularioMongoDTO.class);
        //return formularioMongoRepository.findById(id);
    }
    public FormularioMongoDTO getFormByID(String id) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query,FormularioMongoDTO.class);
        //return formularioMongoRepository.findById(id);
    }
    public FormularioMongoDTO editForm(String id, FormularioMongoDTO form) {
        Query query=new Query()
                .addCriteria(Criteria.where("_id").is(id));

        Document doc = new Document(); // org.bson.Document
        mongoTemplate.getConverter().write(form, doc);
        Update update = Update.fromDocument(doc);

        mongoTemplate.updateFirst(query, update, FormularioMongoDTO.class );
        return form;
    }
    public String deleteForm(String id) {
        formularioMongoRepository.deleteById(id);
        return "Form deleted";
    }
    
    @Autowired
    final private FormularioRepository formularioRepository;

    public Formulario saveFormulario(final Formulario formulario){
        Formulario formularioSave = formularioRepository.save(formulario);
        return formularioSave;
    }

    public Formulario getFormularioById(final Long id){

        Optional<Formulario> formulario =formularioRepository.findById(id);

        return formulario.orElse(new Formulario());
    }
    public Formulario getFormularioByidRefMongo(final String id){

        Optional<Formulario> formulario =formularioRepository.findByidRefMongo(id);

        return formulario.orElse(new Formulario());
    }

    @Transactional
    public void updateFormulario(final Formulario formulario){

        formularioRepository.save(formulario);        
    }

    public Formulario deleteFormularioById(final Long id){
 
        Optional<Formulario> formulario = formularioRepository.findById(id);
        formulario.get().setEstado(0);

        return formulario.orElse(new Formulario());

    }

    public List<Formulario> getAllPage(final Integer estado, String filter, final Pageable pageable) {
        if (filter != null && !filter.trim().isEmpty()) {
            return formularioRepository.findByEstadoAndIdOrNombreLike(estado, "%" + filter + "%", pageable);
        } else {
            return formularioRepository.findAllPage(estado, pageable);
        }
    }

    public List<Formulario> getStateAll(final Integer estado){
        List<Formulario> formularioList = formularioRepository.getStateAll(estado);
        return formularioList;
    }

    @Autowired
    private FormularioMapper formularioMapper;

    public Formulario loadFormulario(final FormularioDTO formularioDTO){
    
        Formulario formulario = formularioMapper.convertDtoToFormulario(formularioDTO);

        return formulario;
    }

    public long countFormularioByEstado(Integer estado) {
        return formularioRepository.countByEstado(estado);
    }

    
    public long countFormulariosByEstadoAndNombre(Integer estado, String filter) {
        if (filter != null && !filter.trim().isEmpty()) {
            return formularioRepository.countByEstadoAndIdOrNombreLike(estado, "%" + filter + "%");
        } else {
            return formularioRepository.countByEstado(estado);
        }
    }
}
