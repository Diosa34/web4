import { Component } from '@angular/core';
import {HttpService} from "../http-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [HttpService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    }
  )

  constructor(private httpService: HttpService) {}

  usernameControl = () => this.loginForm.controls.username;
  passwordControl = () => this.loginForm.controls.password;

  sendForm() {
    this.httpService.postData<User>( "/backend/api/auth/login", {
      username: this.loginForm.getRawValue().username,
      password: this.loginForm.getRawValue().password
    }).subscribe(
      (res: User) => {
        // @ts-ignore
        if (res.status === 200) {
          // @ts-ignore
          sessionStorage.setItem('loginToken', res.token);
        }
      }
    )
  }
}
