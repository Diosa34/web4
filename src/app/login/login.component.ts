import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = {
    login: '',
    password: '',
  }

  printForm(){
    console.log(this.loginForm);
  }
}
