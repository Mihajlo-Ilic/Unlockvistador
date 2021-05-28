import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {

  constructor() {};

  ngOnInit(): void {
  }

}
