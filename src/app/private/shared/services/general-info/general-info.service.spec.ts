import {TestBed, inject} from '@angular/core/testing';
import {GeneralInfoService} from './general-info.service';

describe('GeneralInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralInfoService]
    });
  });

  it('should ...', inject([GeneralInfoService], (service: GeneralInfoService) => {
    expect(service).toBeTruthy();
  }));
});
