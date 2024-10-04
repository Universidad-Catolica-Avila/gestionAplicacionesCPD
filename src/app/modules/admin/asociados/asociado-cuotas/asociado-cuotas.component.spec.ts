import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociadoCuotasComponent } from './asociado-cuotas.component';

describe('AsociadoCuotasComponent', () => {
  let component: AsociadoCuotasComponent;
  let fixture: ComponentFixture<AsociadoCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociadoCuotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociadoCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
