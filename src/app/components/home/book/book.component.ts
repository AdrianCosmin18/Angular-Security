import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../../models/book";
import {Constants} from "../../../models/constants";
import {UserService} from "../../../service/user.service";

@Component({
  selector: '.book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book = {id: -1, name: "", author: "", numberOfPages: -1};
  @Input() type!: Constants;
  @Output() addBookById = new EventEmitter<number>();
  @Output() returnBookById = new EventEmitter<number>();

  public role: string = '';
  public tooltipMessage: string = '';
  public cursor: string = 'none';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadRole();
    if(this.role === Constants.ROLE_ADMIN){
      this.tooltipMessage = 'Edit book';
      this.cursor = 'pointer'
    }
  }

  addBookToUser(){
    this.addBookById.emit(this.book.id);
  }

  returnBookFromUser(){
    this.returnBookById.emit(this.book.id);
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

  putUrl(): string{
    return String(<number>this.book.id);
  }
}
