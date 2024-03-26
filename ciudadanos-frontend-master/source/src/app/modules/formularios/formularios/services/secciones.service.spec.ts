import { TestBed, inject } from '@angular/core/testing';

import { SeccionesService } from './secciones.service';

describe('SeccionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeccionesService]
    });
  });

  it('should be created', inject([SeccionesService], (service: SeccionesService) => {
    expect(service).toBeTruthy();
  }));
});
