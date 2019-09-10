import { TestBed, inject } from '@angular/core/testing';
import { SetPasswordService } from './set-password.service';

describe('ConfirmEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetPasswordService]
    });
  });

  it('should ...', inject([SetPasswordService], (service: SetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
