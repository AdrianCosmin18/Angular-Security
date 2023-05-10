import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../../models/book";
import {Constants} from "../../../models/constants";

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

  public tooltipMessage: string = 'Edit book';

  constructor() { }

  ngOnInit(): void {

  }

  addBookToUser(){
    this.addBookById.emit(this.book.id);
  }

  returnBookFromUser(){
    this.returnBookById.emit(this.book.id);
  }

}
