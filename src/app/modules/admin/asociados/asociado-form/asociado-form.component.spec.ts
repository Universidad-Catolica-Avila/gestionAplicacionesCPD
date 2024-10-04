import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociadoFormComponent } from './asociado-form.component';

describe('AsociadoFormComponent', () => {
  let component: AsociadoFormComponent;
  let fixture: ComponentFixture<AsociadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociadoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
