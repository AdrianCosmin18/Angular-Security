import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../service/book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Constants} from "../../models/constants";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  public books: Book[] = [];
  public message: Constants = Constants.ADD;
  private email: string = '';


  constructor(
    private bookService: BookService,
    private messageService: MessageService,
    private userService: AuthService) { }

  ngOnInit(): void {
    this.loadEmail();
    this.getAllBooks();
  }

  loadEmail(){
    this.userService.subAuth.subscribe((data=>{
      console.log(data);
      this.email = data.email;
      if(!this.email){
        // @ts-ignore
        this.email = localStorage.getItem("email");
      }
    }));
  }

  getAllBooks(){
    this.bookService.getAvailableBooks().subscribe({
      next: value => {
        this.books = value;
        console.log(this.books);
      },
      error: (err: HttpErrorResponse) =>{
        alert(err);
      }
    })
  }

  addBookToUser(bookId: number){
    console.log(bookId);
    this.bookService.addBookToUser(this.email, bookId).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Book added with success'});
        this.getAllBooks();
      },
      error: err => {
        this.messageService.add({severity:'error', summary: 'Something went wrong'});
      }
    })
  }

}
