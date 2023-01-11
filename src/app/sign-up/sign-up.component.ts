import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: any = {
    name: '',
    login: '',
    password: '',
    passwordRepeat: ''
  }

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

  printForm(){
    console.log(this.signUpForm);
  }
}
