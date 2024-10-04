import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemesaFormComponent } from './remesa-form.component';

describe('RemesaFormComponent', () => {
  let component: RemesaFormComponent;
  let fixture: ComponentFixture<RemesaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemesaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemesaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
