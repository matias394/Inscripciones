import { TestBed, inject } from '@angular/core/testing';

import { PrevisualizandoFormularioService } from './previsualizando-formulario.service';

describe('PrevisualizandoFormularioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrevisualizandoFormularioService]
    });
  });

  it('should be created', inject([PrevisualizandoFormularioService], (service: PrevisualizandoFormularioService) => {
    expect(service).toBeTruthy();
  }));
});
