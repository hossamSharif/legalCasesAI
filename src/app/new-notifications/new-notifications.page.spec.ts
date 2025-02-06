import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNotificationsPage } from './new-notifications.page';

describe('NewNotificationsPage', () => {
  let component: NewNotificationsPage;
  let fixture: ComponentFixture<NewNotificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
