import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { HeaderComponent} from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SvgComponent } from './svg/svg.component';
import { FormComponent } from './form/form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import { TableComponent } from './table/table.component';
import {HttpClientModule} from "@angular/common/http";
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SvgComponent,
    FormComponent,
    SignUpComponent,
    TableComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
