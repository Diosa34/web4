import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Token} from "../type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [HttpService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
      username: new FormControl(112, Validators.required),
      password: new FormControl(12345678, Validators.required),
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
        sessionStorage.setItem('loginToken', res.token);
        this._router.navigate(['/'])
      }
    )
  }
}
