import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client-security';
  public items!: MegaMenuItem[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Available books',
        icon: 'pi pi-fw pi-book',
        url: 'home'
      },
      {
        label: 'My books',
        icon: 'pi pi-fw pi-user',
        url: 'myBooks'
      }
    ]
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }
}
