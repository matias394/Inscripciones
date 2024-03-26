import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import config from '../../assets/config/config.json';

const configMock = {
  baseHref: './inscripciones/',
  baseUrl:
    'https://inscripciones-backoffice-back-dev.gcba.gob.ar/inscripciones-service/api/',
  botiIntent: 'https://go.botmaker.com/api/v1.0/intent/v2',
  botiMultiple: 'https://go.botmaker.com/api/v1.0/intent/v2Multiple',
  botiToken:
    'eyJhbGciOiJIUzUxMiJ9.eyJidXNpbmVzc0lkIjoiUExCV1g1WFlHUTJCM0dQN0lOOFEiLCJuYW1lIjoiTWF0w61hcyBGYXJpw7FhIiwiYXBpIjp0cnVlLCJpZCI6Inc3TUdYNmhJNlBkb0tFd0Z6VWRzdHM2QTRvODIiLCJleHAiOjE4MjY5NzgwODMsImp0aSI6Inc3TUdYNmhJNlBkb0tFd0Z6VWRzdHM2QTRvODIifQ.3SG7dqZj7Sc6dLmHivJsELo0ETeGITl4pNig091boL80VZdzxyXV6k_s9NwzsOcT95Oj3FKQmlAhunVBqMHckw',
  boti_key: 'sac08push03',
  entorno: 'Staging',
  production: false,
  recaptchaKey: '6Ldow6skAAAAAGI8BhCuRrdoE7-ZiBOilH3LQm7c',
};

const mockObservable = {
  toPromise: () => Promise.resolve(configMock),
};

const httpClientMock = {
  get: jest.fn(),
};

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppConfigService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    service = TestBed.inject(AppConfigService);
    httpClientMock.get.mockImplementation(() => mockObservable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('File Config Load', (done) => {
    service.loadConfig();
    expect(httpClientMock.get).toHaveBeenCalled();
    done();
  });
});
