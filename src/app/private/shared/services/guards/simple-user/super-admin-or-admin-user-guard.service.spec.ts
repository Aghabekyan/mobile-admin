import {TestBed, inject} from '@angular/core/testing';

import {SuperAdminOrAdminUserGuardService} from './super-admin-or-admin-user-guard.service';

describe('SuperAdminOrAdminUserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminOrAdminUserGuardService]
    });
  });

  it('should ...', inject([SuperAdminOrAdminUserGuardService], (guard: SuperAdminOrAdminUserGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
