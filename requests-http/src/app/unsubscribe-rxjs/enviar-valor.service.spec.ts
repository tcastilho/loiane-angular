import { TestBed } from '@angular/core/testing';

import { EnviarValorService } from './enviar-valor.service';

describe('EnviarValorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarValorService = TestBed.get(EnviarValorService);
    expect(service).toBeTruthy();
  });
});
