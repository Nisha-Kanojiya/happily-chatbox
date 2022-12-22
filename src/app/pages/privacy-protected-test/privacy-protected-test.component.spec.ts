import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyProtectedTestComponent } from './privacy-protected-test.component';

describe('PrivacyProtectedTestComponent', () => {
  let component: PrivacyProtectedTestComponent;
  let fixture: ComponentFixture<PrivacyProtectedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyProtectedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyProtectedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
