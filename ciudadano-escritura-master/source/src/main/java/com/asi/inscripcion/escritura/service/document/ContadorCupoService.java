package com.asi.inscripcion.escritura.service.document;

import com.asi.inscripcion.document.ContadorCupo;
import com.asi.inscripcion.escritura.repository.ContadorCupoRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ContadorCupoService {

    @Inject
    ContadorCupoRepository contadorCupoRepository;

    
    public Uni<ContadorCupo> save(ContadorCupo contadorCupo){
        return contadorCupoRepository.save(contadorCupo);
    }

    public Uni<ContadorCupo> findByInstanciaSedeId(Long instanciaSedeId) {
        return contadorCupoRepository.findByInstanciaSedeId(instanciaSedeId);
    }

    public Uni<ContadorCupo> update(ContadorCupo updatedContadorCupo) {
        return contadorCupoRepository.update(updatedContadorCupo);
    }

    public Uni<Long> getCounterByinstanciaSedeId(Long instanciaSedeId) {
        return contadorCupoRepository.getCounterByinstanciaSedeId(instanciaSedeId);
    }

}
