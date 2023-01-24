import { Component } from '@angular/core';
import {HttpService} from "../http-service.service";
import {User} from "../type";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [ HttpService ],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: any = {
    name: '',
    login: '',
    password: '',
    passwordRepeat: ''
  }

  signUpUrl: string = 'http://127.0.0.1:8080/backend/api/auth/register';

  constructor(private httpService: HttpService) {}

  passwordEquals() {
    if (this.signUpForm.password != this.signUpForm.passwordRepeat) {
      // @ts-ignore
      document.getElementById("equals-warning").style.display = "inline-block"
    } else {
      // @ts-ignore
      document.getElementById("equals-warning").style.display = "none"
    }
  }

  checkForSubmit(name: boolean | null, login: boolean | null, pass1: boolean | null, pass2: boolean | null){
    if (name && login && pass1 && pass2) {
      // @ts-ignore
      document.getElementById("sign-up-btn").disabled = false;
    } else {
      // @ts-ignore
      document.getElementById("sign-up-btn").disabled = true;
    }
  }

  sendForm(){
    this.httpService.postDataDev(this.signUpUrl, "register",
      {"Content-Type": "application/json;charset=utf-8"}, {"username": this.signUpForm.login, "password": this.signUpForm.password});
  }
}
