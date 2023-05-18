import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {UserBookComponent} from "./components/home/user-book/user-book.component";
import {CreateBookComponent} from "./components/create-book/create-book.component";
import {UpdateBookComponent} from "./components/update-book/update-book.component";
import {UsersPageComponent} from "./components/users-page/users-page.component";
import {UserUpdateComponent} from "./components/users-page/user-update/user-update.component";

const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'myBooks', component: UserBookComponent},
  {path: 'createBook', component: CreateBookComponent},
  {path: 'home/:id', component: UpdateBookComponent},
  {path: 'users', component: UsersPageComponent},
  {path: 'users/:email', component: UserUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
