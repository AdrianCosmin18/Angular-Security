import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit(event: Event){

  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
