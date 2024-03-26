package com.asi.inscripcion.escritura.service.document;


import com.asi.inscripcion.document.CitizenResponse;
import com.asi.inscripcion.escritura.repository.CitizenResponseRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;


@ApplicationScoped
public class CitizenResponseService {


    @Inject
    CitizenResponseRepository citizenResponseRepository;


    public Uni<CitizenResponse> save(CitizenResponse response){
        System.out.println("En el save con el response: " + response);
        return citizenResponseRepository.save(response);
    }

    public Uni<CitizenResponse> findById(String id){
        return citizenResponseRepository.findById(id);
    }

    public Uni<CitizenResponse> findByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId) {
        return citizenResponseRepository.findByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
    }

    public Uni<Long> countByCuilAndInstanciaSedeId(String cuil, Long instanciaSedeId) {
        return citizenResponseRepository.countByCuilAndInstanciaSedeId(cuil, instanciaSedeId);
    }

    public Uni<Long> countByCuilAndInscripcionId(String cuil, Long inscripcionId) {
        return citizenResponseRepository.countByCuilAndInscripcionId(cuil, inscripcionId);
    }

}
