import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationsPage } from './examinations.page';

describe('ExaminationsPage', () => {
  let component: ExaminationsPage;
  let fixture: ComponentFixture<ExaminationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
