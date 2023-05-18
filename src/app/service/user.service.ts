import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<Array<User>>{
    let url = `${this.path}/get-all-users`;
    return this.http.get<Array<User>>(url)
      .pipe(catchError(this.handleError));
  }

  getUser(email: string): Observable<User>{
    let url = `${this.path}/get-user-by-email/${email}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
  }

  deleteUser(email: string): Observable<void>{
    let url = `${this.path}/delete-user-by-email/${email}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  makeUserAsAdmin(email: string): Observable<void>{
    let url = `${this.path}/make-user-as-admin/${email}`;
    return this.http.put<void>(url, null)
      .pipe(catchError(this.handleError));
  }

  updateUser(email: string, user: User):Observable<void>{
    let url = `${this.path}/update-user/${email}`;
    return this.http.put<void>(url, user)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
