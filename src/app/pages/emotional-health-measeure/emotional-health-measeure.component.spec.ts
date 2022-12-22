import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionalHealthMeasureComponent } from './emotional-health-measeure.component';

describe('EmotionalHealthMeasureComponent', () => {
  let component: EmotionalHealthMeasureComponent;
  let fixture: ComponentFixture<EmotionalHealthMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionalHealthMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionalHealthMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
