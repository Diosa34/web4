import { Component } from '@angular/core';
import {HttpService} from "../http-service.service";

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

  logInUrl: string = 'http://127.0.0.1:8080/backend/api/auth/register';

  constructor(private httpService: HttpService) {}

  checkForSubmit(login: boolean | null, pass1: boolean | null){
    if (login && pass1) {
      // @ts-ignore
      document.getElementById("log-in-btn").disabled = false;
    } else {
      // @ts-ignore
      document.getElementById("sign-up-btn").disabled = true;
    }
  }

  printForm(){
    // this.httpService.postDataDev(this.logInUrl, "login", {'Content-Type': 'application/json'}, {"username": this.loginForm.login, "password": this.loginForm.password})
  }
}
