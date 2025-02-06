import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {  AuthGaurdService } from  './auth/auth-gaurd.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'date',
    pathMatch: 'full'
  },
  {
    path: 'folder/dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule) 
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'folder/login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }, 
  {
    path: 'folder/cases',
    loadChildren: () => import('./cases/cases.module').then( m => m.CasesPageModule)
  },
  {
    path: 'folder/new-case',
    loadChildren: () => import('./new-case/new-case.module').then( m => m.NewCasePageModule)
  },
  {
    path: 'date',
    loadChildren: () => import('./date-test/date-test.module').then( m => m.DateTestPageModule)
  },
  {
    path: 'folder/lawyers',
    loadChildren: () => import('./lawyers/lawyers.module').then( m => m.LawyersPageModule)
  },
  {
    path: 'folder/new-lawyer',
    loadChildren: () => import('./new-lawyer/new-lawyer.module').then( m => m.NewLawyerPageModule)
  },
  {
    path: 'folder/tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'folder/new-task',
    loadChildren: () => import('./new-task/new-task.module').then( m => m.NewTaskPageModule)
  },
  {
    path: 'folder/celander',
    loadChildren: () => import('./celander/celander.module').then( m => m.CelanderPageModule)
  },
  {
    path: 'folder/customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'folder/new-customer',
    loadChildren: () => import('./new-customer/new-customer.module').then( m => m.NewCustomerPageModule)
  }, 
  {
    path: 'folder/contracts',
    loadChildren: () => import('./contracts/contracts.module').then( m => m.ContractsPageModule)
  },
  {
    path: 'folder/consultations',
    loadChildren: () => import('./consultations/consultations.module').then( m => m.ConsultationsPageModule)
  },
  {
    path: 'new-consultation',
    loadChildren: () => import('./new-consultation/new-consultation.module').then( m => m.NewConsultationPageModule)
  },
  {
    path: 'new-session',
    loadChildren: () => import('./new-session/new-session.module').then( m => m.NewSessionPageModule)
  },
  {
    path: 'folder/sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule)
  },
  {
    path: 'folder/edit-customer',
    loadChildren: () => import('./edit-customer/edit-customer.module').then( m => m.EditCustomerPageModule)
  },
  {
    path: 'folder/users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'edit-case',
    loadChildren: () => import('./edit-case/edit-case.module').then( m => m.EditCasePageModule)
  },
  {
    path: 'edit-session',
    loadChildren: () => import('./edit-session/edit-session.module').then( m => m.EditSessionPageModule)
  },
  {
    path: 'files',
    loadChildren: () => import('./files/files.module').then( m => m.FilesPageModule)
  },
  {
    path: 'edit-consultation',
    loadChildren: () => import('./edit-consultation/edit-consultation.module').then( m => m.EditConsultationPageModule)
  },
  {
    path: 'new-casefile',
    loadChildren: () => import('./new-casefile/new-casefile.module').then( m => m.NewCasefilePageModule)
  },
  {
    path: 'edit-casefile',
    loadChildren: () => import('./edit-casefile/edit-casefile.module').then( m => m.EditCasefilePageModule)
  },
  {
    path: 'new-contract',
    loadChildren: () => import('./new-contract/new-contract.module').then( m => m.NewContractPageModule)
  },
  {
    path: 'new-contract-file',
    loadChildren: () => import('./new-contract-file/new-contract-file.module').then( m => m.NewContractFilePageModule)
  },
  {
    path: 'contract-files',
    loadChildren: () => import('./contract-files/contract-files.module').then( m => m.ContractFilesPageModule)
  },
  {
    path: 'contract-services',
    loadChildren: () => import('./contract-services/contract-services.module').then( m => m.ContractServicesPageModule)
  },
  {
    path: 'new-contract-service',
    loadChildren: () => import('./new-contract-service/new-contract-service.module').then( m => m.NewContractServicePageModule)
  },
  {
    path: 'new-court',
    loadChildren: () => import('./new-court/new-court.module').then( m => m.NewCourtPageModule)
  },
  {
    path: 'courts',
    loadChildren: () => import('./courts/courts.module').then( m => m.CourtsPageModule)
  },
  {
    path: 'case-status',
    loadChildren: () => import('./case-status/case-status.module').then( m => m.CaseStatusPageModule)
  },
  {
    path: 'new-case-status',
    loadChildren: () => import('./new-case-status/new-case-status.module').then( m => m.NewCaseStatusPageModule)
  },
  {
    path: 'edit-task',
    loadChildren: () => import('./edit-task/edit-task.module').then( m => m.EditTaskPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'company-admin',
    loadChildren: () => import('./company-admin/company-admin.module').then( m => m.CompanyAdminPageModule)
  },
  {
    path: 'folder/forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'virefy-rest',
    loadChildren: () => import('./virefy-rest/virefy-rest.module').then( m => m.VirefyRestPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'date-test',
    loadChildren: () => import('./date-test/date-test.module').then( m => m.DateTestPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'new-notifications',
    loadChildren: () => import('./new-notifications/new-notifications.module').then( m => m.NewNotificationsPageModule)
  },
  {
    path: 'edit-notifications',
    loadChildren: () => import('./edit-notifications/edit-notifications.module').then( m => m.EditNotificationsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'folder/settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
