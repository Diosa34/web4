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

  printForm(){
    console.log(this.signUpForm);
  }
}
