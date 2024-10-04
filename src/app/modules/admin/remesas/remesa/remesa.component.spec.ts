import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociadoComponent } from './asociado.component';

describe('AsociadoComponent', () => {
  let component: AsociadoComponent;
  let fixture: ComponentFixture<AsociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
