import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewExaminationsPage } from './new-examinations.page';

describe('NewExaminationsPage', () => {
  let component: NewExaminationsPage;
  let fixture: ComponentFixture<NewExaminationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExaminationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
