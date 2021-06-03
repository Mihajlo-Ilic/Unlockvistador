import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public user: User[];
  public checkForm: FormGroup;

  private userSub: Subscription[];

  selectedFile: File = null;


  hide = true;
  hide1 = true;


  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) {
    this.userSub = [];
    this.checkForm = formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Z][a-z]+')]],
      lastname: ['', [Validators.required, Validators.pattern('([A-Z][a-z]+)+')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('[_a-zA-Z0-9]+')]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z]+[0-9]+')]],
      password2: ['', [Validators.required, Validators.pattern('[a-zA-Z]+[0-9]+')]]
    })
  }

  ngOnInit(): void {
  }

  public get email() {
    return this.checkForm.get('email');
  }

  public get name() {
    return this.checkForm.get('name');
  }
  public get lastname() {
    return this.checkForm.get('lastname');
  }

  public get password() {
    return this.checkForm.get('password');
  }

  public get password2() {
    return this.checkForm.get('password2');
  }

  public get username() {
    return this.checkForm.get('username');
  }

  public submitForm(data): void {
    console.log(data);
    if (!this.checkForm.valid) {
      window.alert("Not valid! ");
      return;
    }
    if (this.password.value !== this.password2.value) {
      window.alert("Šifra se ne poklapa! Pokušajte ponovo! ");
      return;
    }

    const body = {
      "username": data.username,
      "password": data.password,
      "name": data.name,
      "lastname": data.lastname,
      "email": data.email,
      "image" : data.image
    }
    const uSub = this.userService.addUser(body).subscribe((user: User) => {
      this.userService.putCurrentUser(user);
      this.userSub.push(uSub);

      this.checkForm.reset();
      this.router.navigate(['/succReg', data.username]);

    });
    
  }

  //ubacivanje slike u bazu :

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    //ovu putanju promeniti kada se poveze sa bazom!
    this.http.post('./assets/img/', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }


  ngOnDestroy() {
    this.userSub.forEach((sub) => sub.unsubscribe());
  }

}
