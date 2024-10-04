import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboFormComponent } from './recibo-form.component';

describe('ReciboFormComponent', () => {
  let component: ReciboFormComponent;
  let fixture: ComponentFixture<ReciboFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
