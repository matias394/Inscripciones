import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const DATA_USER = 'dataUser';
const INSCRIPTION = 'inscription';
const INSTANCY = 'instancy';
const INSTANCIA_SEDE = 'instancia_sede';
const FORM = 'form';
const USER_MANAGEMENT = 'user-management';
const FORM_ID = 'formId';
const INSTANCIA_NAME_SELECTOR = 'instanciaName';
const QR_INFO = 'qr_info';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserData(): any {
    const user = window.sessionStorage.getItem(DATA_USER);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public addDataUser(data: any, key: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }

  public saveInscription(data: any): void {
    window.localStorage.removeItem(INSCRIPTION);
    window.localStorage.setItem(INSCRIPTION, JSON.stringify(data));
  }

  public getInscription(): any {
    const data = window.localStorage.getItem(INSCRIPTION);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveInstancia(data: any): void {
    window.localStorage.removeItem(INSTANCY);
    window.localStorage.setItem(INSTANCY, JSON.stringify(data));
  }

  public getInstancia(): any {
    const data = window.localStorage.getItem(INSTANCY);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveInstanciaSede(data: any): void {
    window.localStorage.removeItem(INSTANCIA_SEDE);
    window.localStorage.setItem(INSTANCIA_SEDE, JSON.stringify(data));
  }

  public getInstanciaSede(): any {
    const data = window.localStorage.getItem(INSTANCIA_SEDE);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveForm(data: any): void {
    window.localStorage.removeItem(FORM);
    window.localStorage.setItem(FORM, JSON.stringify(data));
  }

  public getForm(): any {
    const data = window.localStorage.getItem(FORM);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveUserManagement(user: any): void {
    window.localStorage.removeItem(USER_MANAGEMENT);
    window.localStorage.setItem(USER_MANAGEMENT, JSON.stringify(user));
  }

  public getUserManagement(): any {
    const data = window.localStorage.getItem(USER_MANAGEMENT);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveFormId(formId: string): void {
    window.sessionStorage.removeItem(FORM_ID);
    window.sessionStorage.setItem(FORM_ID, formId);
  }

  public getFormId(): string | null {
    return window.sessionStorage.getItem(FORM_ID);
  }

  public saveInstanciaName(formId: string): void {
    window.sessionStorage.removeItem(INSTANCIA_NAME_SELECTOR);
    window.sessionStorage.setItem(INSTANCIA_NAME_SELECTOR, formId);
  }

  public getInstanciaName(): string | null {
    return window.sessionStorage.getItem(INSTANCIA_NAME_SELECTOR);
  }

  public saveQrInformation(qr: any): void {
    window.localStorage.removeItem(QR_INFO);
    window.localStorage.setItem(QR_INFO, JSON.stringify(qr));
  }

  public getQrInformation(): any {
    const data = window.localStorage.getItem(QR_INFO);
    if (data) {
      return JSON.parse(data);
    }
  }
}
