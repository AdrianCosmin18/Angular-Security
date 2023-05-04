import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../service/book.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MegaMenuItem, MessageService} from "primeng/api";
import {Constants} from "../../models/constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  public books: Book[] = [];
  public items!: MegaMenuItem[];
  public message: Constants = Constants.ADD;


  constructor(private bookService: BookService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.initItems();
  }

  initItems(){
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
    this.bookService.addBookToUser(bookId).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Book added with success'});
      },
      error: err => {
        this.messageService.add({severity:'error', summary: 'Something went wrong'});
      }
    })
  }

}
