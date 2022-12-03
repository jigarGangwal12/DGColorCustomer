import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCustomerDGColorReport(caseId: any, consigneeCode: any, status: any) {
    return this.httpClient.get(this.apiUrl + "DigiColor/getCustomerDGColorReport?caseId=" + caseId + '&consigneeCode=' + consigneeCode + '&status=' + status);

  }

  getDatabyShadeId(shadeId: any) {
    return this.httpClient.get(this.apiUrl + "DigiColor/GerRecipeANDLabTesingParamter?shadeId=" + shadeId);
  }

  getDatabyCaseId(caseId: any) {
    return this.httpClient.get(this.apiUrl + "DigiColor/GetDataByCaseIdData?caseId=" + caseId);
  }


}
