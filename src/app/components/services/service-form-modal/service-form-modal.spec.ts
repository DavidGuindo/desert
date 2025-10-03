import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormModal } from './service-form-modal';

describe('ServiceFormModal', () => {
  let component: ServiceFormModal;
  let fixture: ComponentFixture<ServiceFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
