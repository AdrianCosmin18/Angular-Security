import {HttpResponse} from "@angular/common/http";

export interface AuthenticationResponse extends HttpResponse<AuthenticationResponse>{

  userId: number;
  email: string;
  token: string;
}
