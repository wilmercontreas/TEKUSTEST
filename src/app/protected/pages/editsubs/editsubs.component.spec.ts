import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubsComponent } from './editsubs.component';

describe('EditsubsComponent', () => {
  let component: EditsubsComponent;
  let fixture: ComponentFixture<EditsubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsubsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
