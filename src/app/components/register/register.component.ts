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
      userName: ['', Validators.required, Validators.minLength(4)],
      email: ['', Validators.required, Validators.email],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit(event: Event){
    let user: User = {
      name: this.registerForm.get("userName")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
      phone: this.registerForm.get("phone")?.value
    }

    this.service.register(user).subscribe({
      next: response => {
        // const resp = response as AuthenticationResponse;
        if(response.body?.email === user.email){
          alert("Success authentication, now you have to login");
          this.router.navigate(['/login']);
          this.service.saveToken(response.body.token);
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
