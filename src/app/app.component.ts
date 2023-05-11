import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Constants} from "./models/constants";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client-security';
  public items!: MegaMenuItem[];
  private role: string = Constants.ROLE_USER;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.loadRole();

    this.items = [];

    this.userService.subjectIsAdmin.subscribe(
      value => {

        if(value){
          this.initItemAdmin();
        }else{
          this.initItemsUser();
        }
      }
    )
  }

  loadRole(){
    this.userService.subAuth.subscribe({
      next: value => {
        this.role = value.role;
        console.log(this.role);
        if(!this.role){
          // @ts-ignore
          this.role = localStorage.getItem("role");
        }
      }
    });
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  initItemAdmin(): void{
    this.items = [
      {
        label: 'Available books',
        icon: 'pi pi-fw pi-book',
        routerLink: 'home'
      },
      {
        label: 'My books',
        icon: 'pi pi-fw pi-user',
        routerLink: 'myBooks'
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-user',
        command: () => this.logOut()
      },
      {
        label: 'Create a new book',
        icon: 'pi pi-fw pi-book',
        routerLink: 'createBook'
      }
    ];
  }

  initItemsUser(): void{
    this.items = [
      {
        label: 'Available books',
        icon: 'pi pi-fw pi-book',
        routerLink: 'home'
      },
      {
        label: 'My books',
        icon: 'pi pi-fw pi-user',
        routerLink: 'myBooks'
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-user',
        command: () => this.logOut()
      }
    ];
  }


  logOut(): void{
    this.userService.logOut();
    this.router.navigate(['login']);
  }




}
