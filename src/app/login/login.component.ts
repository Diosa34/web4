import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Token} from "../type";
import {Router} from "@angular/router";

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

  constructor(private httpService: HttpService,
              private _router: Router) {
  }

  usernameControl = () => this.loginForm.controls.username;
  passwordControl = () => this.loginForm.controls.password;

  sendForm() {
    this.httpService.postData<Token>("/backend/api/auth/login", false, {
      username: this.loginForm.getRawValue().username,
      password: this.loginForm.getRawValue().password
    }).subscribe(
      (res: Token) => {
        // @ts-ignore
        if (res.status === 200) {
          console.log("Storage до добавления токена авторизации: " + sessionStorage)
          sessionStorage.setItem('loginToken', res.token);
          console.log("Storage после добавления токена авторизации: " + sessionStorage)
          this._router.navigate(['main-page'])
        }
      }
    )
  }
}
