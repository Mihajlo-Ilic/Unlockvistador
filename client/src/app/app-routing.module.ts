import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	//localhost:4200
	{ path: '', component: HomeComponent },
	//localhost:4200/login
	{ path: 'login', component: LoginComponent },
	//localhost:4200/signin
	{ path: 'signin', component: RegisterComponent },
	//localhost:4200/succReg/:username
	{ path: 'succReg/:username', component: RegisterInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
