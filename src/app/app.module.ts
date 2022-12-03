import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDGColorReportComponent } from './secure/manufacturing/customer-dgcolor-report/customer-dgcolor-report.component';
import { HttpClientModule } from '@angular/common/http';
import { DxAccordionModule, DxTemplateModule, DxSliderModule, DxPopupModule, DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDGColorReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxAccordionModule,
    DxTemplateModule,
    DxSliderModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxLoadPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
