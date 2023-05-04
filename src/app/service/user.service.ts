import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, Subject, throwError} from "rxjs";
import {AuthenticationResponse} from "../models/authentication-response";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = "http://localhost:8080/user/register";
  private loginUrl = "http://localhost:8080/user/login";

  private token: string | null | undefined;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<HttpResponse<AuthenticationResponse>>{
    return this.http.post<AuthenticationResponse>(this.registerUrl, user, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  loadToken(): void{

    this.token = localStorage.getItem("jwtToken");
  }

  saveToken(token: string){
    localStorage.setItem("jwtToken", token);
  }

  getToken(){
    return this.token;
  }

  logOut(): void{
    localStorage.removeItem("jwtToken");
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
