import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubsComponent } from './addsubs.component';

describe('AddsubsComponent', () => {
  let component: AddsubsComponent;
  let fixture: ComponentFixture<AddsubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
