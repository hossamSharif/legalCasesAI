import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTestPage } from './date-test.page';

describe('DateTestPage', () => {
  let component: DateTestPage;
  let fixture: ComponentFixture<DateTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
