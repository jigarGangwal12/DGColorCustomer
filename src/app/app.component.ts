import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DGColor';

  constructor(private router: Router) {
    if (!localStorage.getItem('CustomerLoginId'))
      this.router.navigate(['login']);
  }
}