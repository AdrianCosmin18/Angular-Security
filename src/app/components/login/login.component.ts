import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {AuthenticationDetails} from "../../models/authentication-details";
import {Constants} from "../../models/constants";
import {AuthorityModel} from "../../models/authority.model";

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
    private service: AuthService) { }


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
      name: '',
      role: ''
    };

    this.service.login(user).subscribe({
      next: value => {
        alert("Success login");

        let arrAuth: Array<AuthorityModel> = value.body?.authorities as Array<AuthorityModel>;
        let role = '';
        if(arrAuth?.some(elem => elem.authority === Constants.ROLE_ADMIN)){ // problema aici
          role = Constants.ROLE_ADMIN;
          this.service.subjectIsAdmin.next(true);
        }else{
          role = Constants.ROLE_USER;
          this.service.subjectIsAdmin.next(false);
        }

        this.service.subAuth.next(<AuthenticationDetails>{email: value.body?.email, token: value.body?.token, role: role});
        this.service.saveRole(role);
        this.service.saveEmail(value.body!.email);
        this.service.saveToken(value.body!.token);
        this.router.navigate(['/home']);
      },
      error: err => {
        alert(err);
      }
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
