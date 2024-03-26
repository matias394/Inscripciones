import { TestBed, inject } from '@angular/core/testing';

import { InstanciadorComponentesService } from './instanciador-componentes.service';

describe('InstanciadorComponentesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstanciadorComponentesService]
    });
  });

  it('should be created', inject([InstanciadorComponentesService], (service: InstanciadorComponentesService) => {
    expect(service).toBeTruthy();
  }));
});
