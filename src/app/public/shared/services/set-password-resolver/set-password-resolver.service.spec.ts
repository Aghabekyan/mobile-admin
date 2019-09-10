import {TestBed, inject} from '@angular/core/testing';
import {SetPasswordResolver} from './set-password-resolver.service';

describe('SetPasswordResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetPasswordResolver]
    });
  });

  it('should ...', inject([SetPasswordResolver], (service: SetPasswordResolver) => {
    expect(service).toBeTruthy();
  }));
});
