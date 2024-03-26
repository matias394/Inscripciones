import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

const myToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJpZF9yb2wiOjEsInRpbWVWYWxpZGF0aW9uIjozMCwidXN1YXJpbyI6MCwibm9tYnJlIjoiYWRtaW4gYWRtaW4iLCJyb2wiOiJhZG1pbiIsInVzZXJuYW1lIjoiMTIzNDU2Nzg5IiwianRpIjoiaW5zY3JpcGNpb25lcyIsInN1YiI6IjEyMzQ1Njc4OSIsImlhdCI6MTY5NDU0NjQzNCwiZXhwIjoxNjk0NTQ4MjM0fQ.QV2oKjI37XqIhh4MSee6Xi8oQzcHHsZZSVjWcFy423KOjxc_PjSCEoJ7tO11NRXn4nYIx6xDGPxTaK8_yQCewQ';

const httpClientMock = {
  saveToken: jest.fn(),
  getToken: jest.fn(),
};

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TokenStorageService, useValue: httpClientMock }],
    });
    service = TestBed.inject(TokenStorageService);
    httpClientMock.getToken.mockReturnValue(myToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Save new token', () => {
    service.saveToken(myToken);
    expect(httpClientMock.saveToken).toHaveBeenCalled();
  });

  test('Get token', () => {
    service.getToken();
    expect(httpClientMock.getToken).toHaveReturnedWith(myToken);
  });
});
