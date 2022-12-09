import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerDGColorReportComponent } from './secure/manufacturing/customer-dgcolor-report/customer-dgcolor-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'login',pathMatch:  'full'},
  { path: 'login', component: LoginComponent,pathMatch: 'full'},
  { path: ':caseId', component: CustomerDGColorReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
