import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../type";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [HttpService],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public signUpForm = new FormGroup({
    // name: new FormControl(1, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.minLength(8)
      ])),
    passwordRepeat: new FormControl(null, Validators.compose([
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
    this.httpService.postData<User>( "/backend/api/auth/register", {
      username: this.signUpForm.getRawValue().username,
      password: this.signUpForm.getRawValue().password
    }).subscribe(
      (res: User) => {
      console.log(res)
      }
    )
  }
}
