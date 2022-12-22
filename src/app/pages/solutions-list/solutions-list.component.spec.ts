import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsListComponent } from './solutions-list.component';

describe('SolutionsListComponent', () => {
  let component: SolutionsListComponent;
  let fixture: ComponentFixture<SolutionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
