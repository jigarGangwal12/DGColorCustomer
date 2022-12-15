
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from 'src/app/api-services.service'
import { API_CONSTANTS } from 'src/app/api-constants'

@Component({
  selector: 'app-customer-dgcolor-report',
  templateUrl: './customer-dgcolor-report.component.html',
  styleUrls: ['./customer-dgcolor-report.component.css']
})
export class CustomerDGColorReportComponent implements OnInit {
  API_CONSTANTS = API_CONSTANTS;
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
  selectedCaseId: any = '';
  caseIdData: any;
  Metameric1: any;
  Metameric2: any;
  Metameric3: any;
  Metameric4: any;
  loadingVisible = false;

  PredictionaData: boolean = false;
  showShadeMatchingData: boolean = false;
  
  showOption1ShadeMatchingData: boolean = false;
  showOption2ShadeMatchingData: boolean = false;
  showOption3ShadeMatchingData: boolean = false;
  showOption4ShadeMatchingData: boolean = false;

  shadeMatchingAllData: any;
  shadeMatchingData: any;
  shadeMatchingOptionData1: any;
  shadeMatchingOptionData2: any;
  shadeMatchingOptionData3: any;
  shadeMatchingOptionData4: any;

  rgbShadeMatching1: any;
  rgbShadeMatching2: any;
  rgbShadeMatching3: any;
  rgbShadeMatching4: any;

  constructor(private apiSevices: ApiServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    this.route.params.subscribe(params => { this.queryString = atob(params['caseId']); });
    this.selectedStatus = this.statusList[0].name;
    this.getCustomerDGColorReport();
  }

  getCustomerDGColorReport() {
    debugger
    this.loadingVisible = true;
    // const parmas = {
    //   caseId: this.isAll ? this.selectedCaseId ? this.selectedCaseId : '' : this.queryString,
    //   consigneeCode: this.isAll ? this.consigneeCode : '',
    //   status: this.selectedStatus
    // };
    const parmas = {
      caseId: this.selectedCaseId == '' ? this.queryString : this.selectedCaseId,
      consigneeCode: '',
      status: this.selectedStatus
    };
    this.apiSevices.getAll(this.API_CONSTANTS.DgColorCustomerReport.CustomerReport.getCustomerDGColorReport, parmas).subscribe((data: any) => {
      this.customerDGColorReport = data.table;
      if(data && data.table.length > 0) {
        this.consigneeName = data.table[0].consigneeName;
        this.consigneeCode = data.table[0].consigneeCode;
        this.caseIdData = "";
        this.selectedCaseId = "";
        // this.isAll ? this.caseIdData = data.table.filter((v: any, i: any) => data.table.findIndex((item: any) => item.caseId == v.caseId) === i) : "";
        this.caseIdData = data.table.filter((v: any, i: any) => data.table.findIndex((item: any) => item.caseId == v.caseId) === i);
      }
      this.loadingVisible = false;
    });
  }

  OnShow(data: any) {
    this.loadingVisible = true;
    this.apiSevices.getAll(this.API_CONSTANTS.DgColorCustomerReport.CustomerReport.getDatabyShadeId, { shadeId: data.shadeId }).subscribe((data: any) => {
      if (data.table.length > 0) {
        this.PredictionaData = true;
        this.shadeMatchingData = false;
        this.recipeAllData = data.table;
        const maxValueOftrail = Math.max(...data.table.map((o: any) => o.predictionOption), 0);
        this.receipeData = data.table.filter((par: any) => par.predictionOption == 1);
        if (maxValueOftrail >= 1) {
          this.showOption1RecipeData = true;
          this.receipeOptionData1 = data.table.filter((par: any) => par.predictionOption == 1);
          this.rgbCodeOption1 = this.receipeOptionData1[0].rgbCode;
          this.Metameric1 = this.receipeOptionData1[0].primaryMetameric + "/" + this.receipeOptionData1[0].secondaryMetameric + "/" + this.receipeOptionData1[0].tertiaryMetameric;
        }
        else
          this.showOption1RecipeData = false;

        if (maxValueOftrail >= 2) {
          this.showOption2RecipeData = true;
          this.receipeOptionData2 = data.table.filter((par: any) => par.predictionOption == 2);
          this.rgbCodeOption2 = this.receipeOptionData2[0].rgbCode;
          this.Metameric2 = this.receipeOptionData2[0].primaryMetameric + "/" + this.receipeOptionData2[0].secondaryMetameric + "/" + this.receipeOptionData2[0].tertiaryMetameric;
        }
        else
          this.showOption2RecipeData = false;

        if (maxValueOftrail >= 3) {
          this.showOption3RecipeData = true;
          this.receipeOptionData3 = data.table.filter((par: any) => par.predictionOption == 3);
          this.rgbCodeOption3 = this.receipeOptionData3[0].rgbCode;
          this.Metameric3 = this.receipeOptionData3[0].primaryMetameric + "/" + this.receipeOptionData3[0].secondaryMetameric + "/" + this.receipeOptionData3[0].tertiaryMetameric;
        }
        else
          this.showOption3RecipeData = false;

        if (maxValueOftrail >= 4) {
          this.showOption4RecipeData = true;
          this.receipeOptionData4 = data.table.filter((par: any) => par.predictionOption == 4);
          this.rgbCodeOption4 = this.receipeOptionData4[0].rgbCode;
          this.Metameric4 = this.receipeOptionData4[0].primaryMetameric + "/" + this.receipeOptionData4[0].secondaryMetameric + "/" + this.receipeOptionData4[0].tertiaryMetameric;
        }
        else
          this.showOption4RecipeData = false;
      }
      else {
        this.PredictionaData = false;
      }
      this.labPredictionParameter = data.table1;

      if (data.table3.length > 0) {
        this.showShadeMatchingData = true;
        this.PredictionaData = false;
        this.shadeMatchingAllData = data.table3;
        const maxValueOftrail = Math.max(...data.table3.map((o: any) => o.trail), 0);
        this.shadeMatchingData = data.table3.filter((par: any) => par.trail == 1);
        if (maxValueOftrail >= 1) {
          this.showOption1ShadeMatchingData = true;
          this.shadeMatchingOptionData1 = data.table3.filter((par: any) => par.trail == 1);
          this.rgbShadeMatching1 = this.shadeMatchingOptionData1[0].rgbHexaCode;
        }
        else
          this.showOption1ShadeMatchingData = false;

        if (maxValueOftrail >= 2) {
          this.showOption2ShadeMatchingData = true;
          this.shadeMatchingOptionData2 = data.table3.filter((par: any) => par.trail == 2);
          this.rgbShadeMatching2 = this.shadeMatchingOptionData2[0].rgbHexaCode;
        }
        else
          this.showOption2ShadeMatchingData = false;

        if (maxValueOftrail >= 3) {
          this.showOption3ShadeMatchingData = true;
          this.shadeMatchingOptionData3 = data.table3.filter((par: any) => par.trail == 3);
          this.rgbShadeMatching3 = this.shadeMatchingOptionData3[0].rgbHexaCode;
        }
        else
          this.showOption3ShadeMatchingData = false;

        if (maxValueOftrail >= 4) {
          this.showOption4ShadeMatchingData = true;
          this.shadeMatchingOptionData4 = data.table3.filter((par: any) => par.trail == 4);
          this.rgbShadeMatching4 = this.shadeMatchingOptionData4[0].rgbHexaCode;
        }
        else
          this.showOption4ShadeMatchingData = false;
      }
      else {
        this.showShadeMatchingData = false;
      }
      this.loadingVisible = false;
    });
  }

  onStatusChanged(event: any) {
    this.selectedStatus = event.value ? event.value : 'All';
    this.getCustomerDGColorReport();
  }

  onCaseIdChanged(event: any) {
    this.selectedCaseId = event.value ? event.value : '';
    this.getCustomerDGColorReport();
  }

  onClickAll() {
    this.isAll = !this.isAll ? true : false
    this.getCustomerDGColorReport();
  }

  PopoUpOpen(data: any) {
    this.PopupVisible = true;
    this.shadeId = data.shadeId;
    this.loadingVisible = true;
    this.apiSevices.getAll(this.API_CONSTANTS.DgColorCustomerReport.CustomerReport.getDatabyShadeId, { shadeId: data.shadeId }).subscribe((res: any) => {
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

  PopupClose() { this.PopupVisible = false; }
}