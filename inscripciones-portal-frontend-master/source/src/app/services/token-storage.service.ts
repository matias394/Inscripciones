import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token-city';
const REFRESH_TOKEN_KEY = 'refresh-token-city';
const USER_INFO_KEY = 'auth-userInfo';
const CODE_INSCRIPTION = 'code-inscription';
const TUITION_INSCRIPTION = 'tuition-inscription';
const TABLE_INFORMATION = 'table-information';
const NOTIFY_NUMBER = 'notify';
const TITLE_INSCRIPTION = 'title_inscription';
const RETURN_URL = 'return-url';
const MAX_INSC = 'max_inscription';
const JWT_TOKEN = 'jwt-token';
const ORGANISMO = 'auth-organismo';
const DISABLED = 'disabled';
const ISMIBA = 'isMiba';
const TOKENINFO = 'tokenInfo';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveJwtToken(token: string): void {
    window.localStorage.removeItem(JWT_TOKEN);
    window.localStorage.setItem(JWT_TOKEN, token);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getToken(): string | null {
    // return 'testToken';
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getJwtToken(): string {
    return window.localStorage.getItem(JWT_TOKEN) ?? '';
  }

  public deleteJwtToken(): void {
    window.localStorage.removeItem(JWT_TOKEN);
  }

  public refreshJwtToken(token: string): void {
    window.localStorage.setItem(JWT_TOKEN, token);
  }

  public refreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveUserInformation(user: any): void {
    window.localStorage.removeItem(USER_INFO_KEY);
    window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  }

  public getUserInformation(): any {
    const user = window.localStorage.getItem(USER_INFO_KEY);
    if (user) {
      return JSON.parse(user);
    }
  }

  public saveTableInformation(data: any): void {
    window.localStorage.removeItem(TABLE_INFORMATION);
    window.localStorage.setItem(TABLE_INFORMATION, JSON.stringify(data));
  }

  public getTableInformation(): any {
    const data = window.localStorage.getItem(TABLE_INFORMATION);
    if (data) {
      return JSON.parse(data);
    }
  }

  public saveCodeInscription(code: any): void {
    window.localStorage.removeItem(CODE_INSCRIPTION);
    window.localStorage.setItem(CODE_INSCRIPTION, code[0]);
    window.localStorage.removeItem(TUITION_INSCRIPTION);
    window.localStorage.setItem(TUITION_INSCRIPTION, code[1]);
  }

  public getCodeInscription() {
    return window.localStorage.getItem(CODE_INSCRIPTION);
  }

  public getTuitionInscription() {
    return window.localStorage.getItem(TUITION_INSCRIPTION);
  }

  public saveNotificationNumber(notify: string): void {
    window.localStorage.removeItem(NOTIFY_NUMBER);
    window.localStorage.setItem(NOTIFY_NUMBER, notify);
  }

  public getNotificationNumber() {
    return window.localStorage.getItem(NOTIFY_NUMBER);
  }

  public saveTitleInscription(title: string): void {
    window.localStorage.removeItem(TITLE_INSCRIPTION);
    window.localStorage.setItem(TITLE_INSCRIPTION, title);
  }

  public getTitleInscription() {
    return window.localStorage.getItem(TITLE_INSCRIPTION);
  }

  public saveReturnURL(url: string): void {
    window.localStorage.removeItem(RETURN_URL);
    window.localStorage.setItem(RETURN_URL, url);
  }

  public getReturnURL() {
    return window.localStorage.getItem(RETURN_URL);
  }

  public saveOrganismo(org: string): void {
    window.localStorage.removeItem(ORGANISMO);
    window.localStorage.setItem(ORGANISMO, org);
  }

  public getOrganismo() {
    return window.localStorage.getItem(ORGANISMO);
  }

  public killMIBA() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(USER_INFO_KEY);
  }

  public saveDisabledInstancy(disabled: string): void {
    window.localStorage.removeItem(DISABLED);
    window.localStorage.setItem(DISABLED, disabled);
  }

  public getDisabledInstancy() {
    return window.localStorage.getItem(DISABLED);
  }

  public saveIsMiba(miba: string): void {
    window.localStorage.removeItem(ISMIBA);
    window.localStorage.setItem(ISMIBA, miba);
  }

  public getIsMiba() {
    return window.localStorage.getItem(ISMIBA);
  }

  public saveTokenInfo(data: any): void {
    window.localStorage.removeItem(TOKENINFO);
    window.localStorage.setItem(TOKENINFO, JSON.stringify(data));
  }

  public getTokenInfo(): any {
    const data = window.localStorage.getItem(TOKENINFO);
    if (data) {
      return JSON.parse(data);
    }
  }
}
