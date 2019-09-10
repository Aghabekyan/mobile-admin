import {TestBed, inject} from '@angular/core/testing';
import {PrivateResolverService} from './private-resolver.service';

describe('SuperAdminResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateResolverService]
    });
  });

  it('should ...', inject([PrivateResolverService], (service: PrivateResolverService) => {
    expect(service).toBeTruthy();
  }));
});
