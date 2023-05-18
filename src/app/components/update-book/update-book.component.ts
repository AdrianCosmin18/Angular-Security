import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthService} from "../../service/auth.service";
import {BookService} from "../../service/book.service";
import {Book} from "../../models/book";
import * as url from "url";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
  providers: [MessageService]
})
export class UpdateBookComponent implements OnInit {
  public bookId: number = -1;
  public bookForm!: FormGroup;
  public book!: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: AuthService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: url => {
        this.bookId = url["id"];
      }
    });
    this.initForm();
    this.getBook();
  }

  initForm(){
    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      numberOfPages: ['', [Validators.required]]
    }, {
      updateOn: 'change'
    })
  }

  getBook(){
    this.bookService.getBookById(this.bookId).subscribe({
      next: book => {
        this.book = book;
        this.putBookInForm();
        console.log(this.book)
      }
    })
  }

  putBookInForm() {
    this.bookForm.setValue({
      name: this.book.name,
      author: this.book.author,
      numberOfPages: this.book.numberOfPages
    });
  }

  updateBook(){
    let modifiedBook = this.bookForm.value;
    console.log(modifiedBook);
    this.bookService.updateBook(this.bookId, modifiedBook).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Book updated !'});
        this.ngOnInit();
      }
    })
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.router.navigate(['home']);
      }
    })
  }
}
