import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {MessageService} from "primeng/api";
import {BookService} from "../../../service/book.service";
import {Constants} from "../../../models/constants";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css'],
  providers: [MessageService]
})
export class UserBookComponent implements OnInit {
  public books: Book[] = [];
  public message: Constants = Constants.RETURN;


  constructor(private bookService: BookService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getMyBooks();
  }


  getMyBooks(){
    this.bookService.getUserBooks('cosmin@yahoo.com').subscribe({
      next: value => {
        this.books = value;
        console.log(this.books);
      }
    })
  }

  returnBook(bookId: number){
    console.log(bookId);
    this.bookService.removeBookFromUser('cosmin@yahoo.com', bookId).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Book returned with success'});
      },
      error: err => {
        this.messageService.add({severity:'error', summary: 'Something went wrong'});
      }
    })
  }

}
