import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/api-services.service'
import { API_CONSTANTS } from 'src/app/api-constants'
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  API_CONSTANTS = API_CONSTANTS;
  CaseId: any;
  btnText = "Login";

  constructor(private apiSevices: ApiServicesService, public router: Router) { }

  ngOnInit(): void {

    this.CaseId = 'MjIxMDEwMA==';

    if (localStorage.getItem('CustomerLoginId'))
      this.router.navigate(['DGColorReport/' + this.CaseId]);
  }

  validateUser(Username: string, Password: string) {
    this.btnText = 'Please Wait...'
    
    if (!Username && !Password) {
      notify({
        message: "Enter Username and Password", height: 45, width: 260, type: "error", displayTime: 3500,
        animation: { show: { type: 'fade', duration: 200, from: 0, to: 1 }, hide: { type: 'fade', duration: 40, to: 0 } }
      });
      this.btnText = 'Login'
      return;
    }
    
    if (!Username) {
      notify({
        message: "Enter Username", height: 45, width: 170, type: "error", displayTime: 3500,
        animation: { show: { type: 'fade', duration: 200, from: 0, to: 1 }, hide: { type: 'fade', duration: 40, to: 0 } }
      });
      this.btnText = 'Login'
      return;
    }
    
    if (!Password) {
      notify({
        message: "Enter Password", height: 45, width: 170, type: "error", displayTime: 3500,
        animation: { show: { type: 'fade', duration: 200, from: 0, to: 1 }, hide: { type: 'fade', duration: 40, to: 0 } }
      });
      this.btnText = 'Login'
      return;
    }
    
    const parmas = { Username: Username, Password: btoa(Password) };
    
    this.apiSevices.post(this.API_CONSTANTS.Digicolor_Customer_UserList.CustomerUserList.getCustomerUserDetailsByUsernameAndPassword, parmas).subscribe((data: any) => {
      if (data.table[0]) {
        localStorage.setItem('CustomerLoginId', data.table[0].id);
        localStorage.setItem('customerCode', data.table[0].customerCode);
        localStorage.setItem('agentCode', data.table[0].agentCode);
        this.router.navigate(['DGColorReport/' + this.CaseId]);
      }
      else {
        notify({
          message: "Username or password is incorrect", height: 45, width: 290, type: "error", displayTime: 3500,
          animation: { show: { type: 'fade', duration: 200, from: 0, to: 1 }, hide: { type: 'fade', duration: 40, to: 0 } }
        });
      }
      
      this.btnText = 'Login'
    });
  }
}