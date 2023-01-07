import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';


import { HeaderComponent} from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SvgAndTableComponent } from './svg-and-table/svg-and-table.component';
import { FormComponent } from './form/form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    SvgAndTableComponent,
    FormComponent,
    SignUpComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'sign-up', component: SignUpComponent},
      {path: 'login', component: LoginComponent},
    ]),
  ],
  providers: [],
  bootstrap: [HeaderComponent, LoginComponent]
})
export class AppModule { }
