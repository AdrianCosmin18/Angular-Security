import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {MessageService} from "primeng/api";
import {BookService} from "../../../service/book.service";
import {Constants} from "../../../models/constants";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css'],
  providers: [MessageService]
})
export class UserBookComponent implements OnInit {
  public books: Book[] = [];
  public message: Constants = Constants.RETURN;
  private email: string = '';



  constructor(private bookService: BookService, private messageService: MessageService, private userService: AuthService) { }


  ngOnInit(): void {
    this.loadEmail();
    this.getMyBooks();
  }

  loadEmail(){
    this.userService.subAuth.subscribe({
      next: value => {
        this.email = value.email;
        console.log(this.email);
        if(!this.email){
          // @ts-ignore
          this.email = localStorage.getItem("email");
        }
      }
    });
  }


  getMyBooks(){
    this.bookService.getUserBooks(this.email).subscribe({
      next: value => {
        this.books = value;
        console.log(this.books);
      }
    })
  }

  returnBook(bookId: number){
    console.log(bookId);
    this.bookService.removeBookFromUser(this.email, bookId).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Book returned with success'});
        this.getMyBooks();
      },
      error: err => {
        this.messageService.add({severity:'error', summary: 'Something went wrong'});
      }
    })
  }

}
