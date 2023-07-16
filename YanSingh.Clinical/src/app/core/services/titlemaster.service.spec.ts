import { TestBed } from '@angular/core/testing';

import { TitlemasterService } from './titlemaster.service';

describe('TitlemasterService', () => {
  let service: TitlemasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitlemasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
