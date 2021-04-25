import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit, OnDestroy {


  public currentUser: User;

  private paramMapSub: Subscription;

  constructor(public userService: UserService,
    public route: ActivatedRoute) {

    this.paramMapSub = this.route.paramMap.subscribe(params => {
      const pUsername: string = params.get('username');
//      window.alert(pUsername);
      this.userService.getUserByUsername(pUsername)
        .subscribe((user: User) => {
          if (user.username !== undefined) {
            this.currentUser = user;
            this.userService.putCurrentUser(this.currentUser);
  
          }
        });
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.paramMapSub !== null) {
      this.paramMapSub.unsubscribe();
    }
  }

}
