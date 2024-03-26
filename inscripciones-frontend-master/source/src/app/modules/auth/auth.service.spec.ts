import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorHTTPService } from '../../components/error-http/error-http.service';
import { AppConfigService } from '../../providers/app-config.service';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

describe('AuthService', () => {
  let service: AuthService;

  function initConfig(appConfig: AppConfigService) {
    return () => appConfig.loadConfig();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AppConfigService,
        TokenStorageService,
        ErrorHTTPService,
        Router,
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppConfigService],
          multi: true,
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
