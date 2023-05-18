import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthenticationResponse} from "../../models/authentication-response";
import {AuthenticationDetails} from "../../models/authentication-details";
import {Constants} from "../../models/constants";
import {AuthorityModel} from "../../models/authority.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    },{
      updateOn: 'change'
    })
  }

  registerUser(){
    let user: User = {
      name: this.registerForm.get("userName")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
      phone: this.registerForm.get("phone")?.value,
      role: ''
    }

    this.service.register(user).subscribe({
      next: value => {
        // const resp = response as AuthenticationResponse;
        alert("Success authentication, now you have to login");

        let arrAuth: Array<AuthorityModel> = value.body?.authorities as Array<AuthorityModel>;
        let role = '';
        if(arrAuth?.some(elem => elem.authority === Constants.ROLE_ADMIN)){
          role = Constants.ROLE_ADMIN;
          this.service.subjectIsAdmin.next(true);
        }else{
          role = Constants.ROLE_USER;
          this.service.subjectIsAdmin.next(false);
        }

        this.service.subAuth.next(<AuthenticationDetails>{email: value.body?.email, token: value.body?.token, role: role});
        this.service.saveToken(value.body!.token);
        this.service.saveEmail(value.body!.email);
        this.service.saveRole(role);
        this.router.navigate(['/home']);
      },
      error: err => {
        alert("Something went wrong");
      }
    })
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
