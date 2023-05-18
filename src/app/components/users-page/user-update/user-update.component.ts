import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
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
    private userService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
