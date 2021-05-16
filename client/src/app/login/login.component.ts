import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User[];
  public checkForm: FormGroup;
  public userByUsername: User;

  public numberOf: number = 0;

  public currentUsername: string;

  private activeSub: Subscription[] = [];

  private profileExist: boolean = false;

  hide = true;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private auth: AuthService) {

    this.user = userService.getUsers();
    this.checkForm = formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]*")]],
      password: ['', [Validators.required, Validators.pattern("[a-zA-Z]+[0-9]+")]]
    });
  }
  ngOnInit(): void {
  }

  public get username() {
    return this.checkForm.get('username');
  }
  public get password() {
    return this.checkForm.get('password');
  }


  public submitLogin(data): void {
    if (!this.checkForm.valid) {
      window.alert(" Nije ispravan unos! ");
      return;
    }
    const sub = this.userService.login(data.username, data.password).subscribe(e => {
      if (e.user) {
        if (e.user.username !== undefined) {
          this.auth.storeToken(e.accessToken);

          this.currentUsername = e.user.username;
          let usrObj = new User(e.user._id, e.user.name, e.user.lastname, e.user.username,
             e.user.email, e.user.image, e.user.password, e.user.unlockedRegions, e.user.admin, e.user.loggedIn, e.accessToken)
          this.userService.putCurrentUser(usrObj);
          
          this.router.navigate(['/main', data.username]);
          //window.alert(this.userService.currentUser.getUnlockedRegions())     
          return;
        }
      }
      else {
        window.alert("Proverite svoje podatke!\nTraženi korisnik ne postoji! ");
        this.checkForm.reset();
        return;
      }
    });
    this.activeSub.push(sub);
    return;
  }
  /*
    private findUser(username: string, password: string) {
      this.numberOf += 1;
      const sub = this.userService.login(username, password).subscribe(e => {
        console.log(e.user.username);
        if (e.user.username !== undefined) {
          this.auth.storeToken(e.token);

          this.currentUsername = e.user.username;
          this.userService.putCurrentUser(e.user);
          this.profileExist = true;

        }
      });
      this.activeSub.push(sub);
    }
  */
  ngOnDestroy() {
    this.activeSub.forEach((sub) => sub.unsubscribe());
  }
}
