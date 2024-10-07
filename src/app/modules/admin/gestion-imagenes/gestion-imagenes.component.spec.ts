import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionImagenesComponent } from './gestion-imagenes.component';

describe('GestionImagenesComponent', () => {
  let component: GestionImagenesComponent;
  let fixture: ComponentFixture<GestionImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
