import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {Book} from "../models/book";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public baseBooksUrl = "http://localhost:8080/api/books";
  public baseUserUrl = "http://localhost:8080/user";

  constructor(private http: HttpClient) {}

  getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.baseBooksUrl)
      .pipe(catchError(this.handleError));
  }

  getAvailableBooks(): Observable<Book[]>{
    const url = `${this.baseBooksUrl}/available-books`;
    return this.http.get<Book[]>(url)
      .pipe(catchError(this.handleError));
  }

  addBookToUser(email: string, bookId: number): Observable<void>{
    const url = `${this.baseBooksUrl}/add-book-to-user/${email}?bookId=${bookId}`;
    return this.http.get<void>(url)
      .pipe(catchError(this.handleError));
  }

  removeBookFromUser(email: string, bookId: number): Observable<void>{
    const url = `${this.baseBooksUrl}/remove-book-from-user/${email}?bookId=${bookId}`;
    return this.http.get<void>(url)
      .pipe(catchError(this.handleError));
  }

  getUserBooks(email: string){
    const url = `${this.baseUserUrl}/get-user-books/${email}`;
    console.log(url);
    return this.http.get<Book[]>(url)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
