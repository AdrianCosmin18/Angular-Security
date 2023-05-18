import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Book} from "../../models/book";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
  providers: [MessageService]
})
export class CreateBookComponent implements OnInit {
  public bookForm!: FormGroup;
  private email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private userService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadEmail();
    this.initForm();
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

  createNewBook(){
    let book: Book = this.bookForm.value;
    console.log(book);

    this.bookService.createBook(book).subscribe({
      next: value => {
        this.messageService.add({severity:'success', summary: 'Book created with success'});
        this.bookForm.reset();
      },
      error: err => {
        this.messageService.add({severity:'danger', summary: `${err}`});
      }
    })
  }

}
