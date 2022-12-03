
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from 'src/app/api-services.service'

@Component({
  selector: 'app-customer-dgcolor-report',
  templateUrl: './customer-dgcolor-report.component.html',
  styleUrls: ['./customer-dgcolor-report.component.css']
})
export class CustomerDGColorReportComponent implements OnInit {
  hideaccordian = true;
  dummydata: any;
  PopupVisible = false;
  customerDGColorReport: any = [];
  queryString: any;
  recipeAllData: any;
  labPredictionParameter: any;
  showOption1RecipeData: boolean = false;
  showOption2RecipeData: boolean = false;
  showOption3RecipeData: boolean = false;
  showOption4RecipeData: boolean = false;
  receipeData: any;
  receipeOptionData1: any;
  receipeOptionData2: any;
  receipeOptionData3: any;
  receipeOptionData4: any;
  rgbCodeOption1: any;
  rgbCodeOption2: any;
  rgbCodeOption3: any;
  rgbCodeOption4: any;
  statusList = [{ name: "All" }, { name: "Under Process" }, { name: "Prediction" }, { name: "Matching" }];
  selectedStatus: any;
  consigneeName: any;
  consigneeCode: any;
  shadeId: any;
  Substrate: any;
  Process: any;
  DyesRange: any;
  Dischargability: any;
  LightSourcePrimary: any;
  LightSourceSecondary: any;
  LightSourceTertiary: any;
  isAll = false;
  selectedCaseId: any;
  caseIdData: any;
  Metameric1: any;
  Metameric2: any;
  Metameric3: any;
  Metameric4: any;
  loadingVisible = false;

  constructor(private apiSevices: ApiServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.queryString = params['id']; });
    this.selectedStatus = this.statusList[0].name;
    this.getCustomerDGColorReport();
  }

  getCustomerDGColorReport() {
    this.loadingVisible = true;
    if (!this.isAll) {
      this.apiSevices.getCustomerDGColorReport(this.queryString, '', this.selectedStatus).subscribe((data: any) => {
        this.customerDGColorReport = data.table;
        this.consigneeName = data.table[0].consigneeName;
        this.consigneeCode = data.table[0].consigneeCode;
        this.caseIdData = "";
        this.selectedCaseId = "";
        this.loadingVisible = false;
      });
    }
    else {
      this.apiSevices.getCustomerDGColorReport(this.selectedCaseId ? this.selectedCaseId : '', this.consigneeCode, this.selectedStatus).subscribe((data: any) => {
        this.customerDGColorReport = data.table;
        this.caseIdData = data.table.filter((v: any, i: any) => data.table.findIndex((item: any) => item.caseId == v.caseId) === i);
        this.loadingVisible = false;
      });
    }
  }

  OnShow(data: any) {
    this.loadingVisible = true;
    this.apiSevices.getDatabyShadeId(data.shadeId).subscribe((data: any) => {
      if (data.table) {
        this.recipeAllData = data.table;
        const maxValueOftrail = Math.max(...data.table.map((o: any) => o.predictionOption), 0);
        this.receipeData = data.table.filter((par: any) => par.predictionOption == 1);
        if (maxValueOftrail >= 1) {
          this.showOption1RecipeData = true;
          this.receipeOptionData1 = data.table.filter((par: any) => par.predictionOption == 1);
          this.rgbCodeOption1 = this.receipeOptionData1[0].rgbCode;
          this.Metameric1 = this.receipeOptionData1[0].primaryMetameric + "/" + this.receipeOptionData1[0].secondaryMetameric + "/" + this.receipeOptionData1[0].tertiaryMetameric;
        } else {
          this.showOption1RecipeData = false;
        }

        if (maxValueOftrail >= 2) {
          this.showOption2RecipeData = true;
          this.receipeOptionData2 = data.table.filter((par: any) => par.predictionOption == 2);
          this.rgbCodeOption2 = this.receipeOptionData2[0].rgbCode;
          this.Metameric2 = this.receipeOptionData2[0].primaryMetameric + "/" + this.receipeOptionData2[0].secondaryMetameric + "/" + this.receipeOptionData2[0].tertiaryMetameric;
        } else {
          this.showOption2RecipeData = false;
        }

        if (maxValueOftrail >= 3) {
          this.showOption3RecipeData = true;
          this.receipeOptionData3 = data.table.filter((par: any) => par.predictionOption == 3);
          this.rgbCodeOption3 = this.receipeOptionData3[0].rgbCode;
          this.Metameric3 = this.receipeOptionData3[0].primaryMetameric + "/" + this.receipeOptionData3[0].secondaryMetameric + "/" + this.receipeOptionData3[0].tertiaryMetameric;
        } else {
          this.showOption3RecipeData = false;
        }

        if (maxValueOftrail >= 4) {
          this.showOption4RecipeData = true;
          this.receipeOptionData4 = data.table.filter((par: any) => par.predictionOption == 4);
          this.rgbCodeOption4 = this.receipeOptionData4[0].rgbCode;
          this.Metameric4 = this.receipeOptionData4[0].primaryMetameric + "/" + this.receipeOptionData4[0].secondaryMetameric + "/" + this.receipeOptionData4[0].tertiaryMetameric;
        } else {
          this.showOption4RecipeData = false;
        }
      }
      this.labPredictionParameter = data.table1;
      this.loadingVisible = false;
    });
  }

  onStatusChanged(event: any) {
    if (event.value)
      this.selectedStatus = event.value;
    else
      this.selectedStatus = 'All';

    this.getCustomerDGColorReport();
  }

  onCaseIdChanged(event: any) {
    if (event.value)
      this.selectedCaseId = btoa(event.value);
    else
      this.selectedCaseId = '';

    this.getCustomerDGColorReport();
  }

  onClickAll(event: any) {
    if (!this.isAll)
      this.isAll = true;
    else
      this.isAll = false;

    this.getCustomerDGColorReport();
  }

  PopoUpOpen(data: any) {
    this.PopupVisible = true;
    this.shadeId = data.shadeId;
    this.loadingVisible = true;
    this.apiSevices.getDatabyShadeId(data.shadeId).subscribe((res: any) => {
      this.Substrate = res.table1;
      this.Process = res.table1[0].process;
      this.DyesRange = res.table1[0].dyesRange;
      this.Dischargability = res.table1[0].dischargability;
      this.LightSourcePrimary = res.table1[0].lightSourcePrimary;
      this.LightSourceSecondary = res.table1[0].lightSourceSecondary;
      this.LightSourceTertiary = res.table1[0].lightSourceTertiary;
      this.loadingVisible = false;
    });
  }

  PopupClose(event: any) {
    this.PopupVisible = false;
  }
}