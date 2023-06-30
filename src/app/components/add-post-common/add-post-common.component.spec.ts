import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostCommonComponent } from './add-post-common.component';

describe('AddPostCommonComponent', () => {
  let component: AddPostCommonComponent;
  let fixture: ComponentFixture<AddPostCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
