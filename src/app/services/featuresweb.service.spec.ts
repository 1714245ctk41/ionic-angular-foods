import { TestBed } from '@angular/core/testing';

import { FeatureswebService } from './featuresweb.service';

describe('FeatureswebService', () => {
  let service: FeatureswebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureswebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
