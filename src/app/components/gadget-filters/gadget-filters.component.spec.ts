import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetFiltersComponent } from './gadget-filters.component';

describe('GadgetFiltersComponent', () => {
  let component: GadgetFiltersComponent;
  let fixture: ComponentFixture<GadgetFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
