package com.asi.inscripcion.serviciosexternos.repository;

import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;

import java.util.Optional;

import org.bson.types.ObjectId;

import com.asi.inscripcion.document.CitizenResponse;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityNotFoundException;

@ApplicationScoped
public class CitizenResponseRepository implements ReactivePanacheMongoRepository<CitizenResponse> {

        public Uni<CitizenResponse> save(CitizenResponse response){
                return persist(response);
        }
        
        public Uni<CitizenResponse> findById(String id) {
                ObjectId objectId = new ObjectId(id);
                return find("_id", objectId).firstResult();
        }

        public Uni<CitizenResponse> findByIdAndDeleted(String id, boolean deleted) {
                ObjectId objectId = new ObjectId(id);
                return find("_id = ?1 and deleted = ?2", objectId, deleted).firstResult();
        }
}
