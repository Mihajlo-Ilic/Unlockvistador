import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
  }

  public getToken(): string{
    // We are going to store the token upon logging in localstorage
    // + decoded version of it
    return localStorage.getItem('jwt');
  }

  public storeToken(jwt: string)
  {
    localStorage.jwt = jwt;
    localStorage.id = this.helper.decodeToken(jwt).id;
  }

  public IsAuthenticated(): boolean{
    const token = this.getToken();
    return this.helper.isTokenExpired(token);
  }

  public logout() : void {
      localStorage.removeItem('jwt')
      localStorage.removeItem('id')
  }
}
