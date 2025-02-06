import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNotificationsPage } from './edit-notifications.page';

describe('EditNotificationsPage', () => {
  let component: EditNotificationsPage;
  let fixture: ComponentFixture<EditNotificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
