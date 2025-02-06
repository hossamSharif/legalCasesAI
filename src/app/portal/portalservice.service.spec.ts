import { TestBed } from '@angular/core/testing';

import { PortalserviceService } from './portalservice.service';

describe('PortalserviceService', () => {
  let service: PortalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
