import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RippleModule} from "primeng/ripple";
import { BookComponent } from './components/home/book/book.component';
import {TabMenuModule} from "primeng/tabmenu";
import {MegaMenuModule} from "primeng/megamenu";
import {ToastModule} from "primeng/toast";
import { UserBookComponent } from './components/home/user-book/user-book.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { StateComponent } from './components/state/state.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateBookComponent } from './components/create-book/create-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BookComponent,
    UserBookComponent,
    StateComponent,
    CreateBookComponent,
    UpdateBookComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        HttpClientModule,
        RippleModule,
        TabMenuModule,
        MegaMenuModule,
        ToastModule,
        BrowserAnimationsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
