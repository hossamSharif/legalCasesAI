import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExaminationsPage } from './edit-examinations.page';

describe('EditExaminationsPage', () => {
  let component: EditExaminationsPage;
  let fixture: ComponentFixture<EditExaminationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExaminationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
