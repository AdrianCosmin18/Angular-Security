import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserService) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    let user: User = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
      phone: '',
      name: ''
    };

    this.service.login(user).subscribe({
      next: value => {
        alert("Success login");

        this.service.saveToken(value.body!.token);

        console.log("aici");
        this.service.loadAuthenticationDetails({email: value.body!.email, token: value.body!.token});
        this.router.navigate(['/home']);
      },
      error: err => {
        alert("Something went wrong");
      }
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
