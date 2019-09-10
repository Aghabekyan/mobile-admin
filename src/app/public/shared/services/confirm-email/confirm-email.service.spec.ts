import {TestBed, inject} from '@angular/core/testing';
import {ConfirmEmailService} from './confirm-email.service';

describe('ConfirmEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmEmailService]
    });
  });

  it('should ...', inject([ConfirmEmailService], (service: ConfirmEmailService) => {
    expect(service).toBeTruthy();
  }));
});
