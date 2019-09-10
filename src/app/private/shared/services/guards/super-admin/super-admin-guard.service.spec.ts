import {TestBed, inject} from '@angular/core/testing';

import {SuperAdminGuardService} from './super-admin-guard.service';

describe('SuperAdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminGuardService]
    });
  });

  it('should ...', inject([SuperAdminGuardService], (guard: SuperAdminGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
