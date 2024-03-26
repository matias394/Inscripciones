package com.asi.inscripciones.mvp.repository;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.FormularioMongoDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormularioMongoRepository extends MongoRepository<FormularioMongoDTO, String> {
    
}