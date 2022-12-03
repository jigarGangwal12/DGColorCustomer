import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDGColorReportComponent } from './secure/manufacturing/customer-dgcolor-report/customer-dgcolor-report.component';

const routes: Routes = [
  { path: ':caseId', component: CustomerDGColorReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
