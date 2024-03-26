package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.dto.FormulariosMongo.ContadorCupo;
import com.asi.inscripciones.mvp.repository.ContadorCupoRepository;

import reactor.core.publisher.Mono;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContadorCupoService {
    @Autowired
    final private ContadorCupoRepository contadorCupoRepository;

    public Mono<ContadorCupo> findByIdInstancia(Long id){
        Mono<ContadorCupo> response = contadorCupoRepository.findByInstanciaId (id);
        return response;
    }

    public Mono<ContadorCupo> upsertAndIncrementCounter(ContadorCupo contadorCupo) {
        return contadorCupoRepository.findByInstanciaId(contadorCupo.getInstanciaId())
                .flatMap(cc -> {
                    // System.out.println("actualizando nuevo contador");
                    cc.setCounter(cc.getCounter() + 1);
                    return contadorCupoRepository.save(cc);
                })
                .switchIfEmpty(Mono.defer(() -> {
                    // System.out.println("creando nuevo contador");
                    contadorCupo.setCounter(1);
                    return contadorCupoRepository.save(contadorCupo);
                }));
    }

    public Mono<ContadorCupo> reduceCounter (Long InstanciaSedeId, Integer cantidadCupos) {
        Mono<ContadorCupo> response = contadorCupoRepository.findByInstanciaSedeId(InstanciaSedeId);
        ContadorCupo cc = response.block();
        int newCounterValue = cc.getCounter() - cantidadCupos;
        cc.setCounter(newCounterValue >= 0 ? newCounterValue : 0);

        // System.out.println(cc);
        return contadorCupoRepository.save(cc);
    }

    public Mono<ContadorCupo> findByInstanciaSedeId(Long id){
        Mono<ContadorCupo> response = contadorCupoRepository.findByInstanciaSedeId(id);
        return response;
    }
}
