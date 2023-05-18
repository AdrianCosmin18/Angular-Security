import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private service: AuthService) { }

  //se plaseaza intre request si server si intercepteaza astfel
  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

    //daca e pe acest url atunci nu e nevoie sa bagam token-ul in request
    if(request.url.includes('http://localhost:8080/user/login')){
      return handler.handle(request);
    }

    if(request.url.includes('http://localhost:8080/user/register')){
      return handler.handle(request);
    }

    //altfel luamm tokenul
    this.service.loadToken();
    const token = this.service.getToken();
    const httpRequest = request.clone({ //clonam requestul si punem token-ul
      setHeaders:{Authorization: `Bearer ${token}`}
    });
    return handler.handle(httpRequest);//il trimitem mai departe catre server
  }
}
