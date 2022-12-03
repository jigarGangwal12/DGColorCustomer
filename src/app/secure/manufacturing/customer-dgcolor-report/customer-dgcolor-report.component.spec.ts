import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDGColorReportComponent } from './customer-dgcolor-report.component';

describe('CustomerDGColorReportComponent', () => {
  let component: CustomerDGColorReportComponent;
  let fixture: ComponentFixture<CustomerDGColorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDGColorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDGColorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
