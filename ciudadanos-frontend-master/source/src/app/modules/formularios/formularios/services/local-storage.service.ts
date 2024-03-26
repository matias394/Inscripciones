//import { TipoTramiteFormulario } from './../../tramites-frontend/formularios/model/tipo-tramite-formulario';
import { Injectable } from '@angular/core';
import { PerfilMIBA } from '../modelos/perfil-miba';
//import { ComprobanteConSubsanacion } from 'src/app/tramites-frontend/componentes/comprobante-tramite/modelo/comprobante-con-subsanacion';

@Injectable()
export class LocalAndSesionStorageService {

  TOKEN_KEY = 'id_token';
  DIFF_HORA_SERVIDOR_KEY = 'dif_hora_servidor';
  REDIRECT_URI = 'redirect_uri';
  PROFILE_MIBA = 'profile_miba';
  TOKEN_MIBA_KEY = 'id_miba_token';
  CAMPOS_REQUERIDOS_MIBA = 'campos_requeridos_miba';
  QTY_APP_INSTANCES = 'qty_app_instances';
  MIBA_CODE = 'miba_code';
  COMPROBANTE_KEY = 'tramitesba_comprobantes_local_storage';
  CURRENT_TIPO_TRAMITE = 'current_tipo_tramite';
  TRAMITE = 'tramite';
  DATO_ERROR = 'dato_error';

  constructor() {}


  public getElement(key: string): string {
    return localStorage.getItem(key);
  }

  public setElement(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setObject(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): object {
    try {
      const jsonString = localStorage.getItem(key);
      return JSON.parse(jsonString);
    } catch (e) {
      return null;
    }
  }

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public setToken(token: string): void {
    return sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getTokenMiba(): string {
    return sessionStorage.getItem(this.TOKEN_MIBA_KEY);
  }

  public setTokenMiba(token: string): void {
    return sessionStorage.setItem(this.TOKEN_MIBA_KEY, token);
  }

  public clearToken(): string {
    const oldToken: string = this.getToken();
    sessionStorage.removeItem(this.TOKEN_KEY);
    return oldToken;
  }

  public clearTokenMiba(): string {
    const oldToken: string = this.getTokenMiba();
    sessionStorage.removeItem(this.TOKEN_MIBA_KEY);
    return oldToken;
  }

  public getDiffHoraServidor(): string {
    return localStorage.getItem(this.DIFF_HORA_SERVIDOR_KEY);
  }

  public setDiffHoraServidor(diffHoraServidor: string): void {
    return localStorage.setItem(this.DIFF_HORA_SERVIDOR_KEY, diffHoraServidor);
  }


  public clearElement(key: string): string {
    const oldValue: string = this.getElement(key);
    localStorage.removeItem(key);
    return oldValue;
  }

  public obtenerUnToken(): string {
    return this.getToken()
      ? this.getToken()
      : this.getTokenMiba();
  }

  public clearLocalStorage(avoids?: string[]): void {
    const obj = {};
    if (avoids) {
      for (const avoid of avoids) {
        obj[avoid] = localStorage.getItem(avoid);
      }
    }
    localStorage.clear();
    if (avoids) {
      for (const avoid of avoids) {
        localStorage.setItem(avoid, obj[avoid]);
      }
    }
  }

  public clearStorages(avoids?: string[]): void {
    this.clearLocalStorage(avoids);
    this.clearSessionStorage();
  }

  public clearSessionStorage(): void {
    sessionStorage.clear();
  }

  public getQtyAppIntances(): number {
    return localStorage.getItem(this.QTY_APP_INSTANCES) ? parseInt(localStorage.getItem(this.QTY_APP_INSTANCES), 10) : 0;
  }

  public setQtyAppIntances(qtyUpdated: number): void {
    return localStorage.setItem(this.QTY_APP_INSTANCES, qtyUpdated.toString());
  }

  getProfileMIBA(): PerfilMIBA {
    const jsonString = this.getElement(this.PROFILE_MIBA);
    return JSON.parse(jsonString);
  }

/*  saveComprobante(comprobante: ComprobanteConSubsanacion) {
    this.setElement(this.COMPROBANTE_KEY, JSON.stringify(comprobante));
  }

  getComprobante(): ComprobanteConSubsanacion {
    return JSON.parse(this.getElement(this.COMPROBANTE_KEY));
  }*/

  removeComprobante() {
    localStorage.removeItem(this.COMPROBANTE_KEY);
  }

  getUrlTipoTramite() :string {
    return this.getElement(this.REDIRECT_URI).split('/').pop();
  }

/*  setCurrentTipoTramite(tipoTramite: TipoTramiteFormulario){
    localStorage.setItem(this.CURRENT_TIPO_TRAMITE, JSON.stringify(tipoTramite));
  }

  getCurrentTipoTramite(): TipoTramiteFormulario{
    return localStorage.getItem(this.CURRENT_TIPO_TRAMITE) ? JSON.parse(localStorage.getItem(this.CURRENT_TIPO_TRAMITE)) : null;
  }

  removeTramite() {
    localStorage.removeItem(this.TRAMITE);
  }*/
}
