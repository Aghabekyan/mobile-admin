import {TestBed, inject} from '@angular/core/testing';
import {ForgotPasswordService} from './forgot-password.service';

describe('ConfirmEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotPasswordService]
    });
  });

  it('should ...', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
