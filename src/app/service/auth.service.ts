import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, Subject, throwError,tap} from "rxjs";
import {AuthenticationResponse} from "../models/authentication-response";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {AuthenticationDetails} from "../models/authentication-details";
import {Constants} from "../models/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = "http://localhost:8080/user/register";
  private loginUrl = "http://localhost:8080/user/login";

  public subAuth = new BehaviorSubject<AuthenticationDetails>({email:'', token: '', role: ''});
  public subjectIsAdmin = new BehaviorSubject<boolean>(false);

  private token: string | null | undefined;
  private email: string | null | undefined;
  private role: string | null | undefined;
  constructor(private http: HttpClient) {



  }

  register(user: User): Observable<HttpResponse<AuthenticationResponse>>{
    return this.http.post<AuthenticationResponse>(this.registerUrl, user, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  login(user: User): Observable<HttpResponse<AuthenticationResponse>>{
    return this.http.post<AuthenticationResponse>(this.loginUrl, user, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  saveEmail(email: string): void{
    localStorage.setItem("email", email);
  }

  saveRole(role: string): void{
    localStorage.setItem("role", role);
  }

  loadRole(): void{
    this.role = localStorage.getItem("role");
  }

  getRole(){
    return this.role;
  }

  loadAuthDetails(email: string, token: string, role: string): void{
    this.subAuth.next({email: email, token: token, role: role});
  }

  loadEmail(): void{
    this.email = localStorage.getItem("email");
  }

  getEmail(){
    return this.email;
  }

  saveToken(token: string){
    localStorage.setItem("jwtToken", token);
  }

  loadToken(): void{
    this.token = localStorage.getItem("jwtToken");
  }

  getToken(){
    return this.token;
  }

  logOut(): void{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
