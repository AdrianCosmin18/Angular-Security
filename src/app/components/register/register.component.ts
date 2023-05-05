import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthenticationResponse} from "../../models/authentication-response";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

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
      phone: this.registerForm.get("phone")?.value
    }

    this.service.register(user).subscribe({
      next: value => {
        // const resp = response as AuthenticationResponse;
        if(value.body?.email === user.email){
          alert("Success authentication, now you have to login");
          this.router.navigate(['/home']);
          this.service.saveToken(value.body.token);

          console.log("aici");
          this.service.loadAuthenticationDetails({email: value.body!.email, token: value.body!.token});
        }
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
