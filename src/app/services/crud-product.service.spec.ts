import { TestBed } from '@angular/core/testing';

import { CrudProductService } from './crud-database';

describe('CrudProductService', () => {
  let service: CrudProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
