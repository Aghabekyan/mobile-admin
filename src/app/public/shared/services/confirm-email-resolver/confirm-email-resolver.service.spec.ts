import {TestBed, inject} from '@angular/core/testing';
import {ConfirmEmailResolverService} from './confirm-email-resolver.service';

describe('ConfirmEmailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmEmailResolverService]
    });
  });

  it('should ...', inject([ConfirmEmailResolverService], (service: ConfirmEmailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
