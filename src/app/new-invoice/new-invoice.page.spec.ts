import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewInvoicePage } from './new-invoice.page';

describe('NewInvoicePage', () => {
  let component: NewInvoicePage;
  let fixture: ComponentFixture<NewInvoicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
