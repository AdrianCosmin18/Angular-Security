import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthService} from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserUpdateComponent implements OnInit {
  public userEmail: string = '';
  public userForm!: FormGroup;
  public user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: url => {
        this.userEmail = url["email"];
        console.log(this.userEmail);
      }
    });

    this.initForm();
    this.getUser();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['', Validators.required]
    },
      {
        updateOn: 'change'
      })
  }

  getUser(){
    this.userService.getUser(this.userEmail).subscribe({
      next: user => {
        this.user = user;
        console.log(this.user);
        this.putUserInForm();
      }
    })
  }

  putUserInForm(){
    this.userForm.setValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      role: this.user.role
    });
  }

  updateUser() {
    let userModified = this.userForm.value;
    console.log(userModified);
    this.userService.updateUser(this.userEmail, userModified).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'User updated !'});
        this.router.navigate(['users']);
      }
    })
  }

  deleteUser() {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this user ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(this.userEmail).subscribe({
          next: () => {
            this.router.navigate(['users']);
          },
          error: err => {
            alert("something went wrong");
          }
        });
      }
    });
  }

  makeUserAsAdmin() {
    this.confirmationService.confirm({
      message: `Are you sure that you want to make ${this.user.name} as admin ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.makeUserAsAdmin(this.userEmail).subscribe({
          next: () => {
            this.router.navigate(['users']);
          },
          error: err => {
            alert("something went wrong");
          }
        });
      }
    });
  }
}
