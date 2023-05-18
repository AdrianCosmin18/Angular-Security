import {Component, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: '.user-page-item',
  templateUrl: './user-page-item.component.html',
  styleUrls: ['./user-page-item.component.css']
})
export class UserPageItemComponent implements OnInit {
  @Input() user!: User;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  editUser() {
    this.router.navigate([`users/${String(this.user.email)}`]);
  }
}
