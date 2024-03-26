import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ErrorHTTPService } from '../../../components/error-http/error-http.service';
import { LoginService } from '../../../shared/services/login.service';
import { RecaptchaService } from '../../../shared/services/recaptcha.service';
import { SharedService } from '../../../shared/services/shared.service';
import { WindowDimensionService } from '../../../shared/services/windowDimensionService.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

import { LoginComponent } from './login.component';

const httpClientMock = {
  get: jest.fn(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  // Ayuda a detectar cambios en el ciclo de vida del component
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        AuthService,
        TokenStorageService,
        ErrorHTTPService,
        Router,
        SharedService,
        RecaptchaService,
        ReCaptchaV3Service,
        LoginService,
        WindowDimensionService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create login', () => {
    expect(component).toBeTruthy();
  });
});
