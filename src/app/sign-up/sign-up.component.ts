import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Token, User} from "../type";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [HttpService],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public signUpForm = new FormGroup({
    // name: new FormControl(1, Validators.required),
    username: new FormControl(1, Validators.required),
    password: new FormControl(11111111, Validators.compose([
      Validators.required,
      Validators.minLength(8)
      ])),
    passwordRepeat: new FormControl(11111111, Validators.compose([
      Validators.required,
      Validators.minLength(8),
  ]))
  });


  constructor(
    private httpService: HttpService,
  ) {
  }

  usernameControl = () => this.signUpForm.controls.username;
  passwordControl = () => this.signUpForm.controls.password;
  passwordRepeatControl = () => this.signUpForm.controls.password;

  isPasswordRepeated() {
    return this.signUpForm.value.password == this.signUpForm.value.passwordRepeat;
  }

  sendForm() {
    this.httpService.postData<Token>( "/backend/api/auth/register", {
      username: this.signUpForm.getRawValue().username,
      password: this.signUpForm.getRawValue().password
    }).subscribe(
      (res: Token) => {
      console.log(res)
      }
    )
  }
}
