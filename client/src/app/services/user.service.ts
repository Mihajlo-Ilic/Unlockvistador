import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterComponent } from '../register/register.component'
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userLink = "http://localhost:3000/users/";
  private unlockedRegions: Array<string> = [];
  private allUsers: User[];

  public currentUser: User;

  constructor(private http: HttpClient) {
    // http zahtev za dohvatanje user-a
    this.http.get<User[]>(this.userLink)
      .subscribe(res => {
        this.allUsers = res;
      });
  }



  public getUsers(): User[] {
    return this.allUsers;
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.userLink + id);
  }

  public getUserByUsername(username: String): Observable<User> {
    return this.http.get<User>(this.userLink + "filterByUsername?username=" + username);
  }

  public addUser(data) {
    return this.http.post(this.userLink + "register", data);
  }

  //dodavanje novog regiona = izmena kod user-a
  public addRegion(uid, region) {
    this.http.post(this.userLink + "region/" + uid, region);
    return this.http.post<any>(this.userLink + "region/" + uid, region);
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public putCurrentUser(user: User) {
    this.currentUser = user;
    //    window.alert(this.currentUser);
  }

  public updateUserById(id: String, data): Observable<User> {
    // console.log('Data: ', data);
    // console.log('putanja: ', this.userLink + id);
    return this.http.patch<User>(this.userLink + id, data).pipe();
  }

  public login(username: string, password: string) {
    const body = { username, password };

    return this.http.post<any>(this.userLink + 'login', body);
  }

}