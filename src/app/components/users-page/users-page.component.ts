import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  providers: [MessageService]
})
export class UsersPageComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: value => {
        this.users = value;
      },
      error: err => {
        this.messageService.add({severity:'Error', summary:`${err}`});
      }
    })
  }
}
