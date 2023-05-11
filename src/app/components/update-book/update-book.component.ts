import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserService} from "../../service/user.service";
import {BookService} from "../../service/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  public bookId: number = -1;
  public bookForm!: FormGroup;
  public book!: Book;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: url => {
        this.bookId = url["id"];
      }
    })
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

      }
    })
  }

  updateBook() {

  }
}
