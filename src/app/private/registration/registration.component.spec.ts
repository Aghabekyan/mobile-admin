import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PublicRegistrationComponent} from './registration.component';

describe('CustomerRegistrationComponent', () => {
  let component: PublicRegistrationComponent;
  let fixture: ComponentFixture<PublicRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
