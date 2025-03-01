import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintModalPage } from './print-modal.page';

describe('PrintModalPage', () => {
  let component: PrintModalPage;
  let fixture: ComponentFixture<PrintModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
