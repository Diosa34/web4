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
    console.log(this.loginForm);
  }
}
