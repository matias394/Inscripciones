import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalAndSesionStorageService } from './local-storage.service';
import {MAPEADOR_CAMPOS_MIBA} from "./mapeador_campos_miba";




@Injectable({
  providedIn: 'root'
})
export class CamposRequeridosMibaService {

  cambioEnCamposRequeridosMiba$ = new Subject<string[]>();

  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService
  ) { }

  getCamposFaltantes(camposRequeridos: string[]): string[] {
    if (!camposRequeridos) {
      camposRequeridos = this.getCamposRequeridosMiba();
    }
    const camposFaltantes = [];
    if (camposRequeridos && camposRequeridos.length) {
      const profileMiba: object =
        JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.PROFILE_MIBA)) || {};

      for (const campoKey of camposRequeridos) {
        if (!profileMiba[campoKey]) {
          camposFaltantes.push(campoKey);
        }
      }
    }
    return camposFaltantes;
  }

  mapearCamposFaltantes(camposRequeridos: string[], fromLocalStorage?: boolean): string[] {
    const camposFaltantes = fromLocalStorage ? this.getCamposFaltantes(camposRequeridos) : camposRequeridos;

    const camposMapeados = [];
    for (const mibaKey of camposFaltantes) {
      camposMapeados.push(MAPEADOR_CAMPOS_MIBA[mibaKey]);
    }

    return camposMapeados;
  }

  getCamposRequeridosMiba(): string[] {
    return JSON.parse(this.localAndSesionStorageService.getElement(this.localAndSesionStorageService.CAMPOS_REQUERIDOS_MIBA)) || [];
  }

  removeCamposRequeridosMiba() {
    this.localAndSesionStorageService.clearElement(this.localAndSesionStorageService.CAMPOS_REQUERIDOS_MIBA);
  }

  addCampoRequeridoMiba(mibaKey: string) {
    const camposRequeridosMiba = this.getCamposRequeridosMiba();

    if (camposRequeridosMiba.indexOf(mibaKey) === -1) {
      camposRequeridosMiba.push(mibaKey);
      this.localAndSesionStorageService.setElement(this.localAndSesionStorageService.CAMPOS_REQUERIDOS_MIBA, JSON.stringify(camposRequeridosMiba));
      this.cambioEnCamposRequeridosMiba$.next(camposRequeridosMiba);
    }
  }
}
