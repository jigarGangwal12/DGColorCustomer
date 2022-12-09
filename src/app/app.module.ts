import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDGColorReportComponent } from './secure/manufacturing/customer-dgcolor-report/customer-dgcolor-report.component';
import { HttpClientModule } from '@angular/common/http';
import { DxAccordionModule, DxTemplateModule, DxPopupModule, DxSelectBoxModule, DxCheckBoxModule, DxLoadPanelModule } from 'devextreme-angular';
//import { LoginComponent } from './secure/manufacturing/customer-dgcolor-report/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDGColorReportComponent,
    //LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxAccordionModule,
    DxTemplateModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxLoadPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
